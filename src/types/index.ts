export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  startingPrice: number; // in INR
  originalPrice: number;
  durationDays: number;
  durationNights: number;
  image: string;
  category: 'international' | 'domestic';
  tags: string[];
  audience: ('family' | 'honeymoon' | 'corporate')[];
  rating: number;
  reviewsCount: number;
  inclusions: string[];
  highlights: string[];
  lat: number;
  lng: number;
  flightHoursFromDelhi: string;
  bestSeason: string;
  hasMonsoonOffer?: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  category: 'family' | 'honeymoon' | 'corporate';
  trip: string;
  rating: number;
  review: string;
  travelDate: string;
  avatar: string;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelType: string;
  travelMonth: string;
  travelersCount: number;
  customNotes?: string;
  couponCode?: string;
}
