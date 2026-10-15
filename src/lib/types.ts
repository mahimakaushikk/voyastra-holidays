export type InquiryStatus = "new" | "contacted" | "quoted" | "converted" | "lost";

export interface Inquiry {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelType: string;
  travelers: string;
  travelMonth: string;
  dietary?: string;
  departureCity?: string;
  notes?: string;
  source: "modal" | "section" | "estimator" | "hero";
  status: InquiryStatus;
  adminNotes?: string;
  assignedTo?: string;
  ipHash?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryInput {
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelType?: string;
  travelers?: string;
  travelMonth?: string;
  dietary?: string;
  departureCity?: string;
  notes?: string;
  source?: "modal" | "section" | "estimator" | "hero";
  hp_website?: string; // Honeypot field
}

export interface InquiryFilters {
  search?: string;
  status?: InquiryStatus | "all";
  destination?: string;
  travelType?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "status" | "destination";
  sortOrder?: "asc" | "desc";
}

export interface InquiryStats {
  total: number;
  new: number;
  contacted: number;
  quoted: number;
  converted: number;
  lost: number;
}

export interface PaginatedInquiries {
  inquiries: Inquiry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  stats: InquiryStats;
}
