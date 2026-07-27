export interface CaseStudy {
  id: string;
  category: string;
  client: string;
  location: string;
  title: string;
  challenge: string;
  solution: string;
  results: string;
  stats: { value: string; label: string }[];
  quote: string;
  image: string;
  blogSlug: string;
}

// Figures pulled directly from src/lib/blog-data.ts articles — nothing invented here.
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    category: "Industrial",
    client: "Textile Factory",
    location: "Mushin, Lagos",
    title: "From 12 hours of daily generator downtime to zero",
    challenge: "Three 20KVA diesel generators running 24/7, burning ₦2.1M in fuel every month. Peak load hit 45KW during production hours, with constant breakdowns and unplanned halts eating into output.",
    solution: "Three 10KVA three-phase hybrid inverters in parallel (50KVA peak capacity), 80 × 450W panels generating 36,000W, and an 82kWh lithium battery bank. The system supplements NEPA when available and carries the full load without interruption when it isn't.",
    results: "Diesel spend dropped from ₦2.1M to ₦680,000 a month. Zero unplanned production halts since commissioning.",
    stats: [
      { value: "68%", label: "Diesel Cost Cut" },
      { value: "50KVA", label: "Installed Capacity" },
      { value: "0", label: "Production Halts Since" },
    ],
    quote: "The goal wasn't just to replace diesel. It was to build an energy infrastructure that could grow with the factory for the next 25 years.",
    image: "/images/blog/factory-install.jpg",
    blogSlug: "inside-a-50kva-install-at-a-lagos-factory",
  },
  {
    id: "cs2",
    category: "Healthcare",
    client: "12-Clinic Network",
    location: "Ogun State",
    title: "Zero power interruptions during medical procedures, network-wide",
    challenge: "A healthcare NGO's 12 primary clinics ran diesel generators 8–14 hours daily, spending ₦3.8M/month combined. Six clinics had already experienced power failures during procedures or vaccine cold-chain breaks.",
    solution: "12 individually engineered systems, from a 3KVA setup for a small outpatient clinic to a 10KVA three-phase system supporting a maternity ward's ventilators and surgical lights. No copy-paste designs — every site was assessed and sized on its own load.",
    results: "Combined diesel spend fell to ₦440,000/month. All vaccine cold chains have stayed continuous, and two clinics extended hours to 9pm, seeing 40–60 more patients a day.",
    stats: [
      { value: "88%", label: "Diesel Cost Cut" },
      { value: "12", label: "Clinics Powered" },
      { value: "11 mo", label: "Average Payback" },
    ],
    quote: "No two clinics were identical, so no two systems were either.",
    image: "/images/about/team-work.jpg",
    blogSlug: "how-we-powered-a-clinic-network-ogun-state",
  },
  {
    id: "cs3",
    category: "Education",
    client: "Secondary School",
    location: "Owerri, Imo State",
    title: "\"We've been buying diesel for 14 years. It never gets cheaper.\"",
    challenge: "A school spent ₦580,000 a month fueling generators just to keep lights, fans, and a single computer lab running, with no guarantee of reliability during exams or classes.",
    solution: "A 10KVA hybrid inverter, 16 × 450W panels (7,200W array), and 2 × 200Ah lithium batteries, sized around the fact that school demand is almost entirely daytime, exactly when solar generates the most.",
    results: "The full diesel bill was eliminated. At ₦580,000/month in savings, the installation paid for itself in under a year.",
    stats: [
      { value: "7–10 mo", label: "Payback Period" },
      { value: "₦580K", label: "Monthly Diesel Eliminated" },
      { value: "8 hrs", label: "Daily Power Coverage" },
    ],
    quote: "The school doesn't need to store much energy. They just need the sun to power school hours. And Nigeria has more than enough sun.",
    image: "/images/gallery-2.jpg",
    blogSlug: "solar-for-schools-nigeria",
  },
];
