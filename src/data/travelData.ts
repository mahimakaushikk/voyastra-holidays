import { Destination, StatItem, Testimonial } from "@/types";

/**
 * VOYASTRA HOLIDAYS - CENTRAL CONFIGURATION & CONTENT STORE
 * =========================================================
 * DEVELOPER NOTE:
 * Fields marked with "EDITABLE" below represent sample/demonstration business
 * data configured for preview. Replace these values with confirmed production
 * data upon client handover.
 */

export const CLIENT_INFO = {
  // EDITABLE: Official registered company name & brand tagline
  companyName: "Voyastra Holidays",
  tagline: "Duniya Dekho, Apne Andaaz Mein",

  // EDITABLE: Contact numbers & primary email address
  phone: "+91 98765 43210",
  phoneRaw: "919876543210",
  email: "hello@voyastra.in",

  // EDITABLE: Physical office address
  address: "4th Floor, Sector 62, Noida, Uttar Pradesh 201309",

  // EDITABLE: Official social media channels
  social: {
    instagram: "https://instagram.com/voyastra",
    facebook: "https://facebook.com/voyastra",
    youtube: "https://youtube.com/@voyastra",
  },

  // EDITABLE: Current promotional campaign details
  offer: {
    title: "Monsoon Sale: Flat 15% off on international packages",
    code: "MONSOON15",
    discountPercent: 15,
    tag: "Monsoon Special",
  },

  // EDITABLE: Key business milestones & verified performance metrics
  stats: [
    {
      id: "travellers",
      value: "25,000+",
      label: "Happy Travellers",
      sublabel: "Across India & Abroad",
      iconName: "Users",
    },
    {
      id: "destinations",
      value: "60+",
      label: "Global Destinations",
      sublabel: "Curated International & Domestic Routes",
      iconName: "Globe2",
    },
    {
      id: "experience",
      value: "12 Years",
      label: "Excellence in Travel",
      sublabel: "Trusted Boutique Advisory",
      iconName: "Award",
    },
    {
      id: "rating",
      value: "4.8★",
      label: "Customer Rating",
      sublabel: "Based on 8,400+ Verified Reviews",
      iconName: "Star",
    },
  ] as StatItem[],
};

export const DESTINATIONS: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Tropical Waterfalls, Ancient Temples & Private Pool Villas",
    startingPrice: 42999,
    originalPrice: 50999,
    durationDays: 6,
    durationNights: 5,
    image: "/images/destinations/bali.jpg",
    category: "international",
    tags: ["Tropical Island", "Private Pool Villa", "Cultural Heritage"],
    audience: ["honeymoon", "family"],
    rating: 4.9,
    reviewsCount: 1420,
    inclusions: [
      "Return Flights (ex-Delhi/Mumbai)",
      "4★ Private Pool Villa in Ubud & Kuta",
      "Daily Indian / Continental Breakfast",
      "Kintamani Volcano & Ubud Waterfalls Tour",
      "Watersports at Tanjung Benoa (Banana Boat & Jet Ski)",
      "Private AC Vehicle & English/Hindi Driver",
    ],
    highlights: [
      "Floating breakfast in your private infinity pool",
      "Sunset Kecak fire dance at Uluwatu Cliff Temple",
      "Dedicated Pure Veg & Jain meal arrangements available",
    ],
    lat: -8.4095,
    lng: 115.1889,
    flightHoursFromDelhi: "6h 45m",
    bestSeason: "May to October (Great all year)",
    hasMonsoonOffer: true,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Futuristic Wonders, Gold Souks & Red Dune Desert Safaris",
    startingPrice: 38499,
    originalPrice: 45499,
    durationDays: 5,
    durationNights: 4,
    image: "/images/destinations/dubai.jpg",
    category: "international",
    tags: ["Bestseller", "Luxury & Shopping", "Desert Safari"],
    audience: ["family", "corporate"],
    rating: 4.8,
    reviewsCount: 2180,
    inclusions: [
      "Return Flights Included",
      "4★ Luxury Hotel in Downtown / Bur Dubai",
      "Burj Khalifa 124th Floor Observation Deck",
      "Desert Safari with BBQ Dinner & Tanoura Show",
      "Dhow Marina Dinner Cruise with Live Entertainment",
      "Dubai Tourist Visa Assistance Included",
    ],
    highlights: [
      "Panoramic views from Burj Khalifa observation deck",
      "Dune bashing & camel ride in Arabian desert",
      "Exclusive shopping discounts at Dubai Mall & Gold Souk",
    ],
    lat: 25.2048,
    lng: 55.2708,
    flightHoursFromDelhi: "3h 40m",
    bestSeason: "October to April (All year indoor attractions)",
    hasMonsoonOffer: true,
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    tagline: "Overwater Villas, Turquoise Lagoons & Sunset Dolphin Cruises",
    startingPrice: 74999,
    originalPrice: 87999,
    durationDays: 4,
    durationNights: 3,
    image: "/images/destinations/maldives.jpg",
    category: "international",
    tags: ["Honeymoon Special", "Ultra Luxury", "All-Inclusive Dining"],
    audience: ["honeymoon"],
    rating: 4.95,
    reviewsCount: 980,
    inclusions: [
      "Speedboat / Seaplane Resort Transfers",
      "Luxury Water Villa with Direct Lagoon Access",
      "All-Inclusive Dining (Breakfast, Lunch & Dinner)",
      "Complimentary Snorkeling Equipment & Kayaking",
      "Honeymoon Inclusions: Candlelight Dinner & Cake",
      "Free Visa on Arrival for Indian Passport Holders",
    ],
    highlights: [
      "Step directly from your bedroom into crystal warm waters",
      "Sunset dolphin cruise with sparkling beverage",
      "Gourmet Indian vegetarian delicacies on island",
    ],
    lat: 3.2028,
    lng: 73.2207,
    flightHoursFromDelhi: "4h 15m (Direct)",
    bestSeason: "November to April (Sunny & calm)",
    hasMonsoonOffer: true,
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Europe",
    tagline: "Snow-Capped Alpine Summits, Glacier Express & Alpine Lakes",
    startingPrice: 119999,
    originalPrice: 139999,
    durationDays: 7,
    durationNights: 6,
    image: "/images/destinations/switzerland.jpg",
    category: "international",
    tags: ["Dream Holiday", "Alpine Landscapes", "Swiss Rail Pass"],
    audience: ["family", "honeymoon"],
    rating: 4.9,
    reviewsCount: 850,
    inclusions: [
      "Return Flights + Schengen Visa Assistance",
      "Consecutive 8-Day Swiss Travel Rail Pass (2nd Class)",
      "4★ Scenic Hotels in Zurich, Lucerne & Interlaken",
      "Mount Titlis Rotair Cable Car & Ice Flyer",
      "Lake Lucerne Steamboat Cruise",
      "Daily Continental Breakfast + Indian Dining Recommendations",
    ],
    highlights: [
      "Iconic Bollywood Yash Chopra film locations in Interlaken",
      "Standing on the glacier of Mount Titlis at 10,000 feet",
      "Scenic panoramic train rides through emerald alpine valleys",
    ],
    lat: 46.8182,
    lng: 8.2275,
    flightHoursFromDelhi: "8h 30m (Direct to Zurich)",
    bestSeason: "May to October (Scenic) & Dec-March (Snow)",
    hasMonsoonOffer: true,
  },
  {
    id: "thailand",
    name: "Thailand",
    country: "Thailand",
    tagline: "Vibrant Bangkok Streets, Coral Islands & Sacred Golden Temples",
    startingPrice: 29999,
    originalPrice: 35999,
    durationDays: 5,
    durationNights: 4,
    image: "/images/destinations/thailand.jpg",
    category: "international",
    tags: ["Coral Island", "Value Favorite", "Visa-Free for Indians"],
    audience: ["family", "corporate"],
    rating: 4.75,
    reviewsCount: 3100,
    inclusions: [
      "Return Flights Included",
      "2 Nights Bangkok 4★ Hotel + 2 Nights Pattaya Beach Resort",
      "Speedboat Excursion to Coral Island with Indian Lunch",
      "Bangkok City Tour: Golden Buddha & Marble Temple",
      "Chao Phraya Luxury Dinner Cruise",
      "All Airport & Inter-City Private Transfers",
    ],
    highlights: [
      "Parasailing and sea-walking in clear Pattaya waters",
      "Shopping at Pratunam & ICONSIAM with Indian street food options",
      "Hassle-free entry under current visa exemption for Indian citizens",
    ],
    lat: 13.7563,
    lng: 100.5018,
    flightHoursFromDelhi: "4h 10m",
    bestSeason: "November to April (Warm & dry)",
    hasMonsoonOffer: true,
  },
  {
    id: "kashmir",
    name: "Kashmir",
    country: "India",
    tagline: "Dal Lake Heritage Houseboats, Gulmarg Gondola & Alpine Meadows",
    startingPrice: 18999,
    originalPrice: 22999,
    durationDays: 5,
    durationNights: 4,
    image: "/images/destinations/kashmir.jpg",
    category: "domestic",
    tags: ["Incredible India", "Snow & Lakes", "Heritage Houseboat"],
    audience: ["family", "honeymoon"],
    rating: 4.9,
    reviewsCount: 1650,
    inclusions: [
      "1 Night Deluxe Dal Lake Houseboat + 3 Nights Srinagar Hotel",
      "Daily Breakfast & Authentic Kashmiri / North Indian Dinners",
      "1-Hour Sunset Shikara Ride on Dal Lake",
      "Gulmarg Excursion with Phase-1 Gondola Pass",
      "Pahalgam Betaab Valley & Aru Valley Sightseeing",
      "Private AC Vehicle with Local Experienced Chauffeur",
    ],
    highlights: [
      "Waking up on a handcrafted wooden houseboat on serene waters",
      "Gondola ascent to Apharwat Peak in Gulmarg",
      "Authentic Kashmiri Kahwa in traditional saffron gardens",
    ],
    lat: 34.0837,
    lng: 74.7973,
    flightHoursFromDelhi: "1h 30m (Direct Flight)",
    bestSeason: "March to August (Greenery) & Dec-Feb (Snow)",
    hasMonsoonOffer: false,
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    tagline: "Sun-Kissed Beaches, Portuguese Architecture & Sunset Cruises",
    startingPrice: 12999,
    originalPrice: 15999,
    durationDays: 4,
    durationNights: 3,
    image: "/images/destinations/goa.jpg",
    category: "domestic",
    tags: ["Quick Getaway", "Beach Resort", "Corporate Offsite"],
    audience: ["corporate", "family", "honeymoon"],
    rating: 4.7,
    reviewsCount: 2890,
    inclusions: [
      "4★ Beachfront Resort with Swimming Pool & Breakfast",
      "North Goa Beaches: Calangute, Baga & Fort Aguada",
      "South Goa Heritage Tour: Basilica of Bom Jesus & Old Goa",
      "Mandovi River Sunset Cruise with Goan Cultural Performance",
      "Airport / Railway Station Private Transfers",
      "Exclusive Corporate & Group Activity Support",
    ],
    highlights: [
      "Beachfront lounging at verified luxury properties",
      "Curated corporate offsites and team bonding retreats",
      "Sunset catamaran cruise along the Mandovi river",
    ],
    lat: 15.2993,
    lng: 74.124,
    flightHoursFromDelhi: "2h 30m (Direct Flight)",
    bestSeason: "October to April (Great year-round beach vibes)",
    hasMonsoonOffer: false,
  },
  {
    id: "kerala",
    name: "Kerala",
    country: "India",
    tagline: "God's Own Country, Misty Munnar Tea Hills & Backwater Houseboats",
    startingPrice: 16499,
    originalPrice: 19999,
    durationDays: 5,
    durationNights: 4,
    image: "/images/destinations/kerala.jpg",
    category: "domestic",
    tags: ["Nature & Wellness", "Houseboat Cruise", "Ayurvedic Living"],
    audience: ["family", "honeymoon"],
    rating: 4.85,
    reviewsCount: 1740,
    inclusions: [
      "2 Nights Munnar Hill Station Resort + 1 Night Thekkady",
      "1 Night Private Traditional Alleppey Backwater Houseboat",
      "All Houseboat Meals (Breakfast, Lunch, Evening Snacks & Dinner)",
      "Munnar Tea Museum & Eravikulam National Park",
      "Spice Plantation Walk & Kalaripayattu Martial Arts Show",
      "Private AC Car Transfers from Kochi Airport & back",
    ],
    highlights: [
      "Gliding through tranquil backwaters with a private onboard chef",
      "Misty tea plantations in the Western Ghats",
      "Authentic Ayurvedic wellness sessions arranged upon request",
    ],
    lat: 9.9312,
    lng: 76.2673,
    flightHoursFromDelhi: "3h 10m (Direct to Kochi)",
    bestSeason: "September to March (Pleasant) & Jun-Aug (Monsoon Ayurveda)",
    hasMonsoonOffer: false,
  },
];

export const AUDIENCE_CURATIONS = [
  {
    id: "family",
    anchorId: "families",
    title: "Indian Families",
    subtitle: "Dada-Dadi to Bachhe – Multigenerational Comfort Guaranteed",
    icon: "HeartHandshake",
    badge: "Family Preferred",
    description:
      "We understand that Indian family vacations require special care. From 100% pure vegetarian and Jain meal coordination to spacious adjoining rooms, relaxed itineraries, and warm Hindi/English speaking tour assistance.",
    features: [
      "Guaranteed Pure Veg & Jain meal coordination at every destination",
      "Child-safe premium resorts with family suites and kid amenities",
      "Relaxed itinerary pacing – zero rushing for grandparents or children",
      "Dedicated comfortable AC coaches with courteous, patient chauffeurs",
    ],
    recommendedDestinations: ["Dubai", "Bali", "Switzerland", "Kerala", "Kashmir"],
  },
  {
    id: "honeymoon",
    anchorId: "honeymoon",
    title: "Honeymoon Couples",
    subtitle: "Private, Secluded & Unforgettable Romantic Escapes",
    icon: "Sparkles",
    badge: "Romance Redefined",
    description:
      "Celebrate your new beginning with secluded overwater villas, romantic candlelit beach dinners under starlit skies, complimentary flower bed decor, and sunset catamaran cruises curated exclusively for two.",
    features: [
      "Complimentary honeymoon perks: sparkling beverage, cake & bed decor",
      "Private pool villas and secluded beachfront sanctuaries",
      "Couples aromatherapy spa & sunset catamaran cruising",
      "Discreet personal concierge for surprise arrangements & photography",
    ],
    recommendedDestinations: ["Maldives", "Bali", "Switzerland", "Kashmir"],
  },
  {
    id: "corporate",
    anchorId: "corporate-mice",
    title: "Corporate Groups & MICE",
    subtitle: "Seamless Offsites, Annual Retreats & Gala Conferences",
    icon: "Briefcase",
    badge: "GST Billing Compliant",
    description:
      "Energize your team with flawlessly executed corporate offsites, reward trips, and leadership retreats. End-to-end management covering flight charters, conference setups, team building activities, and gala celebrations.",
    features: [
      "Single-point account manager for smooth 50 to 500+ pax logistics",
      "Complete AV equipment, conference halls & banquet setups",
      "Curated team bonding adventures, yacht parties & desert galas",
      "Instant GST invoice generation for seamless corporate tax filing",
    ],
    recommendedDestinations: ["Goa", "Dubai", "Thailand", "Bali"],
  },
];

// EDITABLE: Representative guest experiences (client to replace with verified testimonials)
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Rajesh & Sunita Sharma",
    location: "New Delhi",
    category: "family",
    trip: "Switzerland Grand Tour (6N/7D)",
    rating: 5,
    review:
      "Traveling to Switzerland with my 72-year-old mother and two kids felt daunting until Voyastra took charge. The Swiss pass was ready, vegetarian restaurants were pre-booked in Interlaken, and our 24/7 WhatsApp concierge was a lifesaver. Truly seamless.",
    travelDate: "May 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    name: "Aarav & Meera Kapoor",
    location: "Mumbai",
    category: "honeymoon",
    trip: "Maldives Overwater Sanctuary (3N/4D)",
    rating: 5,
    review:
      "Our Maldives honeymoon was straight out of a dream. Voyastra arranged a free villa upgrade with private pool and a magical sunset dolphin cruise. When our flight had a slight delay, their Noida team coordinated with the resort speedboat instantly.",
    travelDate: "June 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    name: "Vikram Singhania (VP Operations)",
    location: "Bengaluru",
    category: "corporate",
    trip: "Dubai Annual Leadership Offsite (4N/5D - 65 Pax)",
    rating: 5,
    review:
      "We took 65 employees to Dubai for our annual summit. From visa processing to desert camp gala dinner with live entertainment, everything ran like clockwork. Proper GST invoicing and 24/7 ground coordination made our HR life easy.",
    travelDate: "February 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

export const WHY_VOYASTRA = [
  {
    icon: "Utensils",
    title: "100% Indian Palate Friendly",
    description:
      "Never worry about meals abroad. We arrange verified Indian vegetarian, Jain, and Halal dining options on all our international routes.",
  },
  {
    icon: "PhoneCall",
    title: "24/7 Active Trip Concierge",
    description:
      "You don't get routed to a robotic chatbot. A dedicated personal holiday manager is on WhatsApp and phone throughout your vacation.",
  },
  {
    icon: "FileCheck",
    title: "Hassle-Free Visa Guidance",
    description:
      "Our documentation desk boasts a 99.2% visa approval track record with doorstep document pickup and biometric appointment assistance.",
  },
  {
    icon: "BadgePercent",
    title: "Transparent Pricing Guarantee",
    description:
      "Zero hidden hotel taxes, no surprise resort surcharges, and no forced shopping stops. What you see is what you pay.",
  },
];

export const FAQS = [
  {
    q: "How does the booking process work with Voyastra Holidays?",
    a: "It's simple: 1) Fill the enquiry form or message us on WhatsApp at +91 98765 43210. 2) A dedicated holiday specialist customizes your itinerary within 2 hours. 3) Confirm with a small token amount, and we handle flights, visas, and luxury stays seamlessly.",
  },
  {
    q: "Can we customize dates, hotels, and activities?",
    a: "Absolutely! 100% of our packages are tailored to your preferences. Whether you want to add an extra night in an overwater villa or request Jain food throughout Europe, our team crafts it to your exact liking.",
  },
  {
    q: "What payment schedules and flexible policies do you offer?",
    a: "We offer milestone-based payment schedules with a low initial booking deposit. Transparent terms, zero hidden charges, and comprehensive travel insurance options ensure complete peace of mind for every journey.",
  },
  {
    q: "Are flights and visas included in the prices shown?",
    a: "Most international packages include round-trip flights and complete visa consultation. Since flight costs vary by departure city (Delhi, Mumbai, Bengaluru, etc.), our representative provides an exact all-inclusive quote.",
  },
];
