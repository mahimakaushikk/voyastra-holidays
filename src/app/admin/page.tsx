"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Download,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  X,
  FileText,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Inquiry, InquiryStatus, InquiryStats, PaginatedInquiries } from "@/lib/types";

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  new: {
    label: "New Lead",
    bg: "rgba(245, 158, 11, 0.15)",
    text: "#F59E0B",
    border: "rgba(245, 158, 11, 0.35)",
    icon: <Sparkles size={12} />,
  },
  contacted: {
    label: "Contacted",
    bg: "rgba(59, 130, 246, 0.15)",
    text: "#3B82F6",
    border: "rgba(59, 130, 246, 0.35)",
    icon: <Phone size={12} />,
  },
  quoted: {
    label: "Quote Sent",
    bg: "rgba(168, 85, 247, 0.15)",
    text: "#A855F7",
    border: "rgba(168, 85, 247, 0.35)",
    icon: <FileText size={12} />,
  },
  converted: {
    label: "Converted",
    bg: "rgba(34, 197, 94, 0.15)",
    text: "#22C55E",
    border: "rgba(34, 197, 94, 0.35)",
    icon: <CheckCircle2 size={12} />,
  },
  lost: {
    label: "Lost / Closed",
    bg: "rgba(148, 163, 184, 0.15)",
    text: "#94A3B8",
    border: "rgba(148, 163, 184, 0.35)",
    icon: <X size={12} />,
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Data State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    quoted: 0,
    converted: 0,
    lost: 0,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [destinationFilter, setDestinationFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Selected Inquiry Modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editAdminNotes, setEditAdminNotes] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");

  // 1. Check Authentication on Mount
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        router.push("/admin/login");
      }
    }
    verifyAuth();
  }, [router]);

  // 2. Fetch Inquiries
  const fetchInquiries = useCallback(
    async (showLoadingSpinner = true) => {
      if (showLoadingSpinner) setIsLoading(true);
      else setIsRefreshing(true);
      setErrorMessage("");

      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        if (statusFilter !== "all") params.append("status", statusFilter);
        if (destinationFilter !== "all") params.append("destination", destinationFilter);
        params.append("page", currentPage.toString());
        params.append("limit", "10");

        const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }

        const json = await res.json();
        if (res.ok && json.success) {
          const data: PaginatedInquiries = json.data;
          setInquiries(data.inquiries);
          setStats(data.stats);
          setPagination(data.pagination);
        } else {
          setErrorMessage(json.error || "Failed to load inquiries.");
        }
      } catch {
        setErrorMessage("Network error while communicating with backend.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [searchQuery, statusFilter, destinationFilter, currentPage, router]
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated, fetchInquiries]);

  // 3. Quick Status Change
  const handleStatusChange = async (inquiryId: string, newStatus: InquiryStatus) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Optimistically update local state
        setInquiries((prev) =>
          prev.map((item) => (item.id === inquiryId ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        fetchInquiries(false);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // 4. Save Detailed Notes & Assignment
  const handleSaveDetails = async () => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    setUpdateFeedback("");

    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminNotes: editAdminNotes,
          assignedTo: editAssignedTo,
          status: selectedInquiry.status,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setUpdateFeedback("Changes saved successfully!");
        setSelectedInquiry(json.data);
        setInquiries((prev) =>
          prev.map((item) => (item.id === selectedInquiry.id ? json.data : item))
        );
        setTimeout(() => setUpdateFeedback(""), 3000);
      } else {
        setUpdateFeedback(json.error || "Failed to save updates.");
      }
    } catch {
      setUpdateFeedback("Network error saving notes.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 5. Delete Inquiry
  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry record? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSelectedInquiry(null);
        fetchInquiries();
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  // 6. Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  // 7. CSV Export
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;

    const headers = [
      "Reference",
      "Customer Name",
      "Phone",
      "Email",
      "Destination",
      "Travel Style",
      "Month",
      "Travelers",
      "Departure City",
      "Dietary Preference",
      "Notes",
      "Status",
      "Assigned To",
      "Admin Notes",
      "Date Received",
    ];

    const rows = inquiries.map((i) => [
      `"${i.reference}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.destination}"`,
      `"${i.travelType}"`,
      `"${i.travelMonth}"`,
      `"${i.travelers}"`,
      `"${i.departureCity || ""}"`,
      `"${i.dietary || ""}"`,
      `"${(i.notes || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${i.assignedTo || ""}"`,
      `"${(i.adminNotes || "").replace(/"/g, '""')}"`,
      `"${new Date(i.createdAt).toLocaleString("en-IN")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `voyastra_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unique destinations for filter dropdown
  const uniqueDestinations = useMemo(() => {
    const list = Array.from(new Set(inquiries.map((i) => i.destination))).filter(Boolean);
    return ["Bali", "Dubai", "Maldives", "Switzerland", "Thailand", "Kashmir", "Goa", "Kerala", ...list];
  }, [inquiries]);

  // Loading Screen while verifying session
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A1C22",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "3px solid rgba(224, 122, 43, 0.2)",
              borderTopColor: "var(--color-accent)",
              animation: "voyastraSpin 0.7s linear infinite",
              margin: "0 auto 16px auto",
            }}
          />
          <span style={{ fontSize: "0.9rem", color: "#A3B5BE", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#09191E",
        color: "#F7F6F0",
        fontFamily: "var(--font-inter), sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 1. TOP NAVIGATION BAR */}
      <header
        style={{
          backgroundColor: "rgba(18, 49, 58, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
            gap: 16,
          }}
        >
          {/* Logo & Portal Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <Compass size={22} style={{ transform: "rotate(-15deg)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-playfair), serif",
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  Voyastra<span style={{ color: "var(--color-accent)", fontSize: "1rem" }}>✦</span>
                </div>
                <div style={{ fontSize: "0.62rem", color: "var(--color-accent)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Travel Desk
                </div>
              </div>
            </Link>

            <span
              style={{
                backgroundColor: "rgba(224, 122, 43, 0.16)",
                border: "1px solid rgba(224, 122, 43, 0.3)",
                color: "var(--color-accent)",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "none",
              }}
              className="md:inline-block"
            >
              Inquiry Manager
            </span>
          </div>

          {/* Right Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => fetchInquiries(false)}
              disabled={isRefreshing}
              className="btn btn-outline-white btn-sm"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                fontSize: "0.82rem",
                borderRadius: "var(--radius-sm)",
              }}
              title="Refresh Inquiries"
            >
              <RefreshCw size={14} className={isRefreshing ? "spin-animation" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="btn btn-outline-white btn-sm"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                fontSize: "0.82rem",
                borderRadius: "var(--radius-sm)",
              }}
              title="Export Current List to CSV"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              style={{
                color: "#A3B5BE",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                padding: "7px 12px",
              }}
              className="hidden lg:flex"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#FCA5A5",
                padding: "7px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="container" style={{ flex: "1 0 auto", padding: "28px 20px 60px 20px" }}>
        {/* KPI COUNTERS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {/* Card: Total */}
          <div
            onClick={() => setStatusFilter("all")}
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.75)",
              border: statusFilter === "all" ? "2px solid var(--color-accent)" : "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--radius-md)",
              padding: "18px 20px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#CBD5DA", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Total Inquiries
              </span>
              <Users size={18} style={{ color: "#CBD5DA" }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}>
              {stats.total}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 4 }}>All registered traveler requests</div>
          </div>

          {/* Card: New */}
          <div
            onClick={() => setStatusFilter("new")}
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.75)",
              border: statusFilter === "new" ? "2px solid #F59E0B" : "1px solid rgba(245, 158, 11, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "18px 20px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                New Leads
              </span>
              <Sparkles size={18} style={{ color: "#F59E0B" }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#F59E0B", fontFamily: "var(--font-playfair)" }}>
              {stats.new}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 4 }}>Awaiting first outreach</div>
          </div>

          {/* Card: Contacted */}
          <div
            onClick={() => setStatusFilter("contacted")}
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.75)",
              border: statusFilter === "contacted" ? "2px solid #3B82F6" : "1px solid rgba(59, 130, 246, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "18px 20px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3B82F6", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Contacted
              </span>
              <Phone size={18} style={{ color: "#3B82F6" }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#3B82F6", fontFamily: "var(--font-playfair)" }}>
              {stats.contacted}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 4 }}>Call/WhatsApp initiated</div>
          </div>

          {/* Card: Quoted */}
          <div
            onClick={() => setStatusFilter("quoted")}
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.75)",
              border: statusFilter === "quoted" ? "2px solid #A855F7" : "1px solid rgba(168, 85, 247, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "18px 20px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A855F7", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Quotes Sent
              </span>
              <FileText size={18} style={{ color: "#A855F7" }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#A855F7", fontFamily: "var(--font-playfair)" }}>
              {stats.quoted}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 4 }}>Itinerary & pricing shared</div>
          </div>

          {/* Card: Converted */}
          <div
            onClick={() => setStatusFilter("converted")}
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.75)",
              border: statusFilter === "converted" ? "2px solid #22C55E" : "1px solid rgba(34, 197, 94, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "18px 20px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#22C55E", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Bookings Converted
              </span>
              <CheckCircle2 size={18} style={{ color: "#22C55E" }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#22C55E", fontFamily: "var(--font-playfair)" }}>
              {stats.converted}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 4 }}>
              Conversion: {stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* 3. SEARCH & FILTERS BAR */}
        <div
          style={{
            backgroundColor: "rgba(18, 49, 58, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            marginBottom: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#A3B5BE" }} />
            <input
              type="text"
              placeholder="Search by customer name, phone, email, ref #, or destination..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                backgroundColor: "rgba(10, 28, 34, 0.8)",
                color: "#FFFFFF",
                fontSize: "0.88rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#A3B5BE",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {/* Destination Filter */}
            <select
              value={destinationFilter}
              onChange={(e) => {
                setDestinationFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                backgroundColor: "rgba(10, 28, 34, 0.8)",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Destinations</option>
              {uniqueDestinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                backgroundColor: "rgba(10, 28, 34, 0.8)",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Statuses ({stats.total})</option>
              <option value="new">New Leads ({stats.new})</option>
              <option value="contacted">Contacted ({stats.contacted})</option>
              <option value="quoted">Quotes Sent ({stats.quoted})</option>
              <option value="converted">Converted ({stats.converted})</option>
              <option value="lost">Lost / Closed ({stats.lost})</option>
            </select>
          </div>
        </div>

        {/* 4. INQUIRIES DATA LIST / TABLE */}
        {isLoading ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              backgroundColor: "rgba(18, 49, 58, 0.6)",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "2.5px solid rgba(224, 122, 43, 0.2)",
                borderTopColor: "var(--color-accent)",
                animation: "voyastraSpin 0.7s linear infinite",
                margin: "0 auto 12px auto",
              }}
            />
            <div style={{ color: "#A3B5BE", fontSize: "0.9rem" }}>Loading latest traveler inquiries...</div>
          </div>
        ) : errorMessage ? (
          <div
            style={{
              padding: "36px 20px",
              textAlign: "center",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <AlertTriangle size={32} style={{ color: "#EF4444", marginBottom: 10 }} />
            <h3 style={{ color: "#FFFFFF", margin: "0 0 6px 0" }}>Failed to Load Inquiries</h3>
            <p style={{ color: "#CBD5DA", fontSize: "0.9rem", margin: "0 0 16px 0" }}>{errorMessage}</p>
            <button onClick={() => fetchInquiries()} className="btn btn-accent btn-sm">
              Retry
            </button>
          </div>
        ) : inquiries.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              backgroundColor: "rgba(18, 49, 58, 0.6)",
              borderRadius: "var(--radius-md)",
              border: "1px dashed rgba(255, 255, 255, 0.16)",
            }}
          >
            <Users size={40} style={{ color: "#64748B", marginBottom: 12 }} />
            <h3 style={{ color: "#FFFFFF", margin: "0 0 6px 0" }}>No Inquiries Match Your Criteria</h3>
            <p style={{ color: "#A3B5BE", fontSize: "0.9rem", margin: "0 0 16px 0" }}>
              Try adjusting your search query, status tab, or destination filter.
            </p>
            {(searchQuery || statusFilter !== "all" || destinationFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDestinationFilter("all");
                }}
                className="btn btn-outline-white btn-sm"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(18, 49, 58, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                      backgroundColor: "rgba(10, 28, 34, 0.6)",
                      color: "#A3B5BE",
                      fontSize: "0.78rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <th style={{ padding: "14px 18px" }}>Reference &amp; Date</th>
                    <th style={{ padding: "14px 18px" }}>Traveler Details</th>
                    <th style={{ padding: "14px 18px" }}>Destination &amp; Style</th>
                    <th style={{ padding: "14px 18px" }}>Travel Month &amp; Pax</th>
                    <th style={{ padding: "14px 18px" }}>Status</th>
                    <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => {
                    const st = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new;
                    const dateFormatted = new Date(inq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    const timeFormatted = new Date(inq.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr
                        key={inq.id}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                          transition: "background-color 0.15s ease",
                        }}
                        className="hover-table-row"
                      >
                        {/* Reference & Date */}
                        <td style={{ padding: "16px 18px" }}>
                          <div
                            style={{
                              fontFamily: "monospace",
                              fontWeight: 700,
                              color: "var(--color-accent)",
                              fontSize: "0.95rem",
                            }}
                          >
                            {inq.reference}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 2 }}>
                            {dateFormatted} • {timeFormatted}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "#64748B", marginTop: 2 }}>
                            Via {inq.source.toUpperCase()}
                          </div>
                        </td>

                        {/* Traveler Details */}
                        <td style={{ padding: "16px 18px" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.95rem" }}>
                            {inq.name}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#CBD5DA", marginTop: 3 }}>
                            <Phone size={12} style={{ color: "var(--color-accent)" }} />
                            <a
                              href={`tel:${inq.phone}`}
                              style={{ color: "#CBD5DA", textDecoration: "none" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {inq.phone}
                            </a>
                          </div>
                          {inq.email && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#8E9DA6", marginTop: 2 }}>
                              <Mail size={12} />
                              <a
                                href={`mailto:${inq.email}`}
                                style={{ color: "#8E9DA6", textDecoration: "none" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {inq.email}
                              </a>
                            </div>
                          )}
                          {inq.departureCity && (
                            <div style={{ fontSize: "0.74rem", color: "#64748B", marginTop: 2 }}>
                              From: {inq.departureCity}
                            </div>
                          )}
                        </td>

                        {/* Destination & Style */}
                        <td style={{ padding: "16px 18px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <MapPin size={14} style={{ color: "var(--color-secondary)" }} />
                            <span style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.92rem" }}>
                              {inq.destination}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#CBD5DA", marginTop: 4 }}>
                            {inq.travelType}
                          </div>
                          {inq.dietary && (
                            <div
                              style={{
                                fontSize: "0.72rem",
                                color: "#86EFAC",
                                backgroundColor: "rgba(34, 197, 94, 0.1)",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                display: "inline-block",
                                marginTop: 4,
                              }}
                            >
                              {inq.dietary}
                            </div>
                          )}
                        </td>

                        {/* Travel Month & Pax */}
                        <td style={{ padding: "16px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#FFFFFF" }}>
                            <Calendar size={13} style={{ color: "var(--color-accent)" }} />
                            <span>{inq.travelMonth}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#A3B5BE", marginTop: 4 }}>
                            <Users size={13} />
                            <span>{inq.travelers}</span>
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td style={{ padding: "16px 18px" }}>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                            style={{
                              backgroundColor: st.bg,
                              color: st.text,
                              border: `1px solid ${st.border}`,
                              borderRadius: "var(--radius-full)",
                              padding: "5px 10px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              outline: "none",
                            }}
                          >
                            <option value="new">New Lead</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quote Sent</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost / Closed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "16px 18px", textAlign: "right" }}>
                          <button
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setEditAdminNotes(inq.adminNotes || "");
                              setEditAssignedTo(inq.assignedTo || "");
                            }}
                            className="btn btn-outline-white btn-sm"
                            style={{
                              padding: "6px 14px",
                              fontSize: "0.82rem",
                              borderRadius: "var(--radius-sm)",
                            }}
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(10, 28, 34, 0.4)",
                  fontSize: "0.85rem",
                  color: "#CBD5DA",
                }}
              >
                <div>
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} inquiries
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: currentPage <= 1 ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                      color: currentPage <= 1 ? "#64748B" : "#FFFFFF",
                      cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>
                  <span style={{ padding: "6px 10px", fontWeight: 600 }}>
                    {currentPage} / {pagination.totalPages}
                  </span>
                  <button
                    disabled={currentPage >= pagination.totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor:
                        currentPage >= pagination.totalPages ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                      color: currentPage >= pagination.totalPages ? "#64748B" : "#FFFFFF",
                      cursor: currentPage >= pagination.totalPages ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 5. SLIDE-OVER DETAIL & MANAGEMENT DRAWER */}
      {selectedInquiry && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedInquiry(null)}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "stretch",
            padding: 0,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 580,
              backgroundColor: "#10262E",
              borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "-10px 0 35px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                backgroundColor: "rgba(10, 28, 34, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "var(--color-accent)",
                    }}
                  >
                    {selectedInquiry.reference}
                  </span>
                  <span
                    style={{
                      backgroundColor: STATUS_CONFIG[selectedInquiry.status].bg,
                      color: STATUS_CONFIG[selectedInquiry.status].text,
                      border: `1px solid ${STATUS_CONFIG[selectedInquiry.status].border}`,
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    {STATUS_CONFIG[selectedInquiry.status].label}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#8E9DA6", marginTop: 4 }}>
                  Received: {new Date(selectedInquiry.createdAt).toLocaleString("en-IN")}
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Content Body */}
            <div style={{ padding: "24px", flex: "1 0 auto" }}>
              {/* Traveler Card */}
              <div
                style={{
                  backgroundColor: "rgba(18, 49, 58, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                <h4 style={{ color: "#CBD5DA", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px 0" }}>
                  Customer Information
                </h4>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>
                  {selectedInquiry.name}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={14} />
                    <span>{selectedInquiry.phone}</span>
                  </a>

                  {selectedInquiry.email && (
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#CBD5DA",
                        textDecoration: "none",
                        fontSize: "0.88rem",
                      }}
                    >
                      <Mail size={14} />
                      <span>{selectedInquiry.email}</span>
                    </a>
                  )}
                </div>

                {/* Instant WhatsApp Action Button */}
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Namaste ${selectedInquiry.name}! This is the Voyastra Holidays Travel Desk regarding your inquiry [Ref: ${selectedInquiry.reference}] for ${selectedInquiry.destination}. We have prepared a customized luxury itinerary for you. May we share the details?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "11px",
                    fontSize: "0.88rem",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Connect on WhatsApp (One-Click)</span>
                </a>
              </div>

              {/* Itinerary Requirements Card */}
              <div
                style={{
                  backgroundColor: "rgba(18, 49, 58, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                <h4 style={{ color: "#CBD5DA", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px 0" }}>
                  Holiday Specifications
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Destination</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>
                      {selectedInquiry.destination}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Travel Style</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginTop: 2 }}>
                      {selectedInquiry.travelType}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Month of Travel</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginTop: 2 }}>
                      {selectedInquiry.travelMonth}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Pax Count</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", marginTop: 2 }}>
                      {selectedInquiry.travelers}
                    </div>
                  </div>

                  {selectedInquiry.departureCity && (
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Departure City</div>
                      <div style={{ fontSize: "0.92rem", color: "#FFFFFF", marginTop: 2 }}>
                        {selectedInquiry.departureCity}
                      </div>
                    </div>
                  )}

                  {selectedInquiry.dietary && (
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase" }}>Meal Preference</div>
                      <div style={{ fontSize: "0.92rem", color: "#86EFAC", marginTop: 2 }}>
                        {selectedInquiry.dietary}
                      </div>
                    </div>
                  )}
                </div>

                {selectedInquiry.notes && (
                  <div style={{ marginTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 12 }}>
                    <div style={{ fontSize: "0.72rem", color: "#8E9DA6", textTransform: "uppercase", marginBottom: 4 }}>
                      Customer Notes / Estimator Context
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "#CBD5DA", backgroundColor: "rgba(10, 28, 34, 0.5)", padding: "10px 14px", borderRadius: "var(--radius-sm)", lineHeight: 1.5 }}>
                      {selectedInquiry.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Travel Desk Internal Management */}
              <div
                style={{
                  backgroundColor: "rgba(18, 49, 58, 0.8)",
                  border: "1px solid rgba(224, 122, 43, 0.35)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                <h4 style={{ color: "var(--color-accent)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px 0" }}>
                  Travel Desk Lead Operations
                </h4>

                {/* Status Selector */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#CBD5DA", marginBottom: 6 }}>
                    Lead Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: "rgba(10, 28, 34, 0.8)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    <option value="new">New Lead (Awaiting First Call)</option>
                    <option value="contacted">Contacted (WhatsApp/Call Done)</option>
                    <option value="quoted">Quote Sent (Itinerary Delivered)</option>
                    <option value="converted">Converted (Booking Token Received)</option>
                    <option value="lost">Lost / Closed</option>
                  </select>
                </div>

                {/* Assigned Specialist */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#CBD5DA", marginBottom: 6 }}>
                    Assigned Specialist
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mahima Kaushik, Senior Travel Desk"
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: "rgba(10, 28, 34, 0.8)",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Internal Admin Notes */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#CBD5DA", marginBottom: 6 }}>
                    Internal Desk Notes &amp; Follow-up Log
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Quoted ₹1,85,000 for 5N/6D with private speedboat transfers. Client requested Jain dinner confirmation..."
                    value={editAdminNotes}
                    onChange={(e) => setEditAdminNotes(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      backgroundColor: "rgba(10, 28, 34, 0.8)",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {updateFeedback && (
                  <div style={{ fontSize: "0.82rem", color: "#86EFAC", marginBottom: 12 }}>
                    {updateFeedback}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <button
                    onClick={handleSaveDetails}
                    disabled={isUpdating}
                    className="btn btn-accent btn-sm"
                    style={{ padding: "8px 20px" }}
                  >
                    {isUpdating ? "Saving..." : "Save Internal Notes"}
                  </button>

                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#FCA5A5",
                      borderRadius: "var(--radius-sm)",
                      padding: "6px 14px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Delete Record</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
