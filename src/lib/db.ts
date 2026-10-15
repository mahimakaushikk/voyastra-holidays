import fs from "fs";
import path from "path";
import { Inquiry, InquiryInput, InquiryFilters, PaginatedInquiries, InquiryStats, InquiryStatus } from "./types";
import { firestore } from "./firebase";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Helper to sanitize undefined values before sending to Firestore
function sanitizeForFirestore(obj: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      clean[k] = v;
    }
  }
  return clean;
}

// Determine safe storage directory (local project /data or /tmp for serverless)
function getStorageFilePath(): string {
  const localDir = path.join(process.cwd(), "data");
  const localFile = path.join(localDir, "inquiries.json");

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    // Test write permission
    fs.accessSync(localDir, fs.constants.W_OK);
    return localFile;
  } catch {
    // Serverless fallback (/tmp is always writable on Vercel/AWS)
    const tmpFile = path.join("/tmp", "voyastra_inquiries.json");
    return tmpFile;
  }
}

// Initial realistic synthetic sample data for immediate testing
const INITIAL_SAMPLE_INQUIRIES: Inquiry[] = [
  {
    id: "inq_1729001001_bal01",
    reference: "VY-839201",
    name: "Dr. Alok Verma",
    phone: "+91 98112 34567",
    email: "alok.verma@aiims.edu",
    destination: "Bali",
    travelType: "Family Vacation",
    travelers: "4 Adults, 1 Child",
    travelMonth: "November 2026",
    dietary: "Pure Vegetarian / Jain Food",
    departureCity: "Delhi NCR",
    notes: "Requires private pool villa in Seminyak and vegetarian restaurants pre-booked.",
    source: "modal",
    status: "quoted",
    adminNotes: "Sent Luxury Ubud & Seminyak 6N/7D package (₹2,15,000 total). Follow-up scheduled for Friday.",
    assignedTo: "Mahima Kaushik",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "inq_1729001002_mal02",
    reference: "VY-742918",
    name: "Aakash & Simran Singhania",
    phone: "+91 98201 98765",
    email: "aakash.singhania@gmail.com",
    destination: "Maldives",
    travelType: "Romantic Honeymoon",
    travelers: "2 Adults",
    travelMonth: "December 2026",
    dietary: "No Preference / All-Inclusive",
    departureCity: "Mumbai",
    notes: "Overwater sunset villa with private plunge pool and floating breakfast request.",
    source: "modal",
    status: "new",
    adminNotes: "Hot lead. Maldives festive season slots filling rapidly.",
    assignedTo: "Unassigned",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "inq_1729001003_swi03",
    reference: "VY-629104",
    name: "Rajiv Mittal (Director)",
    phone: "+91 98710 54321",
    email: "rajiv@mittaltech.in",
    destination: "Switzerland",
    travelType: "Corporate Offsite / MICE",
    travelers: "25 Adults",
    travelMonth: "October 2026",
    dietary: "Pure Vegetarian / Jain Food",
    departureCity: "Bengaluru",
    notes: "Corporate leadership retreat in Lucerne & Interlaken. Need conference hall + Jungfraujoch excursion.",
    source: "section",
    status: "contacted",
    adminNotes: "Spoke with Executive Assistant. Sending customized B2B quotation with GST invoicing tomorrow morning.",
    assignedTo: "Senior Travel Desk",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "inq_1729001004_dub04",
    reference: "VY-510928",
    name: "Pooja Hegde",
    phone: "+91 97412 88990",
    email: "pooja.hegde@outlook.com",
    destination: "Dubai",
    travelType: "Family Vacation",
    travelers: "3 Adults, 2 Kids",
    travelMonth: "November 2026",
    dietary: "Vegetarian Preferred",
    departureCity: "Hyderabad",
    notes: "Burj Khalifa At The Top tickets, Desert Safari with private buggy, Atlantis Aquaventure.",
    source: "estimator",
    status: "converted",
    adminNotes: "Token advance received (₹50,000). Flight booking confirmed. Visa documents collected.",
    assignedTo: "Mahima Kaushik",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

// In-memory cache with disk mtime synchronization
let memoryStore: Inquiry[] | null = null;
let lastDiskMtime = 0;

function loadInquiries(): Inquiry[] {
  const filePath = getStorageFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (memoryStore && stats.mtimeMs <= lastDiskMtime) {
        return memoryStore;
      }
      const data = fs.readFileSync(filePath, "utf-8");
      memoryStore = JSON.parse(data);
      lastDiskMtime = stats.mtimeMs;
      return memoryStore || [];
    }
  } catch (err) {
    console.warn("[DB] Error loading inquiries from file, using fallback:", err);
  }

  if (memoryStore) {
    return memoryStore;
  }

  // Initialize with sample inquiries
  memoryStore = [...INITIAL_SAMPLE_INQUIRIES];
  saveInquiries(memoryStore);
  return memoryStore;
}

function saveInquiries(inquiries: Inquiry[]): void {
  memoryStore = inquiries;
  const filePath = getStorageFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), "utf-8");
    if (fs.existsSync(filePath)) {
      lastDiskMtime = fs.statSync(filePath).mtimeMs;
    }
  } catch (err) {
    console.warn("[DB] Note: Could not write inquiries to disk in this environment:", err);
  }
}

/**
 * Generate user-friendly 6-digit reference: VY-XXXXXX
 */
function generateReference(): string {
  const code = Math.floor(100000 + Math.random() * 900000);
  return `VY-${code}`;
}

/**
 * Create a new inquiry with validated input
 */
export async function createInquiry(
  input: InquiryInput,
  meta?: { ipHash?: string; userAgent?: string }
): Promise<Inquiry> {
  const inquiries = loadInquiries();
  const now = new Date().toISOString();
  const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const reference = generateReference();

  const newInquiry: Inquiry = {
    id,
    reference,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    destination: input.destination.trim(),
    travelType: input.travelType?.trim() || "Family Vacation",
    travelers: input.travelers?.trim() || "2 Adults",
    travelMonth: input.travelMonth?.trim() || "October 2026",
    dietary: input.dietary?.trim() || undefined,
    departureCity: input.departureCity?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    source: input.source || "modal",
    status: "new",
    adminNotes: undefined,
    assignedTo: "Unassigned",
    ipHash: meta?.ipHash,
    userAgent: meta?.userAgent,
    createdAt: now,
    updatedAt: now,
  };

  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  // Sync to Firestore if operational
  try {
    const firestoreData = sanitizeForFirestore(newInquiry);
    await setDoc(doc(firestore, "inquiries", newInquiry.id), firestoreData);
  } catch (err: any) {
    if (err.code === "permission-denied") {
      console.warn("[Firestore] Sync note: Missing or insufficient permissions. Configure Firestore security rules to allow writes.");
    } else {
      console.warn("[Firestore] Sync note:", err.message);
    }
  }

  return newInquiry;
}

/**
 * Retrieve paginated and filtered inquiries
 */
export async function getInquiries(filters: InquiryFilters = {}): Promise<PaginatedInquiries> {
  // Sync from Firestore if available and permitted
  try {
    const snap = await getDocs(collection(firestore, "inquiries"));
    if (!snap.empty) {
      const remoteInquiries: Inquiry[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data() as Inquiry;
        if (d.id && d.reference) {
          remoteInquiries.push(d);
        }
      });
      if (remoteInquiries.length > 0) {
        saveInquiries(remoteInquiries);
      }
    }
  } catch {
    // Graceful fallback to disk/memory storage
  }

  const all = loadInquiries();

  // 1. Calculate stats across all records
  const stats: InquiryStats = {
    total: all.length,
    new: all.filter((i) => i.status === "new").length,
    contacted: all.filter((i) => i.status === "contacted").length,
    quoted: all.filter((i) => i.status === "quoted").length,
    converted: all.filter((i) => i.status === "converted").length,
    lost: all.filter((i) => i.status === "lost").length,
  };

  // 2. Filter records
  let filtered = [...all];

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((i) => i.status === filters.status);
  }

  if (filters.destination && filters.destination !== "all") {
    const destLower = filters.destination.toLowerCase();
    filtered = filtered.filter((i) => i.destination.toLowerCase().includes(destLower));
  }

  if (filters.travelType && filters.travelType !== "all") {
    const typeLower = filters.travelType.toLowerCase();
    filtered = filtered.filter((i) => i.travelType.toLowerCase().includes(typeLower));
  }

  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.phone.toLowerCase().includes(q) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        i.reference.toLowerCase().includes(q) ||
        i.destination.toLowerCase().includes(q) ||
        (i.departureCity && i.departureCity.toLowerCase().includes(q))
    );
  }

  // 3. Sorting
  const sortBy = filters.sortBy || "createdAt";
  const sortOrder = filters.sortOrder || "desc";

  filtered.sort((a, b) => {
    let aVal = a[sortBy] || "";
    let bVal = b[sortBy] || "";
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 4. Pagination
  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, Math.min(100, filters.limit || 10));
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    inquiries: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
    stats,
  };
}

/**
 * Retrieve a single inquiry by ID
 */
export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const all = loadInquiries();
  const inquiry = all.find((i) => i.id === id || i.reference === id);
  return inquiry || null;
}

/**
 * Update inquiry status, internal notes, or specialist assignment
 */
export async function updateInquiry(
  id: string,
  updates: {
    status?: InquiryStatus;
    adminNotes?: string;
    assignedTo?: string;
  }
): Promise<Inquiry | null> {
  const all = loadInquiries();
  const index = all.findIndex((i) => i.id === id || i.reference === id);
  if (index === -1) return null;

  const existing = all[index];
  const updated: Inquiry = {
    ...existing,
    ...(updates.status ? { status: updates.status } : {}),
    ...(updates.adminNotes !== undefined ? { adminNotes: updates.adminNotes } : {}),
    ...(updates.assignedTo !== undefined ? { assignedTo: updates.assignedTo } : {}),
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  saveInquiries(all);

  // Sync update to Firestore
  try {
    const firestoreUpdates = sanitizeForFirestore({
      ...(updates.status ? { status: updates.status } : {}),
      ...(updates.adminNotes !== undefined ? { adminNotes: updates.adminNotes } : {}),
      ...(updates.assignedTo !== undefined ? { assignedTo: updates.assignedTo } : {}),
      updatedAt: updated.updatedAt,
    });
    if (Object.keys(firestoreUpdates).length > 0) {
      await updateDoc(doc(firestore, "inquiries", updated.id), firestoreUpdates);
    }
  } catch {
    // Non-blocking fallback
  }

  return updated;
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<boolean> {
  const all = loadInquiries();
  const target = all.find((i) => i.id === id || i.reference === id);
  const filtered = all.filter((i) => i.id !== id && i.reference !== id);
  if (filtered.length === all.length) return false;

  saveInquiries(filtered);

  // Sync delete to Firestore
  if (target) {
    try {
      await deleteDoc(doc(firestore, "inquiries", target.id));
    } catch {
      // Non-blocking fallback
    }
  }

  return true;
}
