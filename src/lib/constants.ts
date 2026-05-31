export const SITE_NAME = "Olea Technologies";
export const SITE_TAGLINE = "Powering Sustainable Future";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oleatechnologies.com";
export const SITE_EMAIL = "hello@oleatechnologies.com";
export const SITE_PHONE = "+234 800 000 0000";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "cei",
    icon: "Zap",
    name: "Clean Energy Infrastructure",
    blurb: "Complete solar systems engineered for 25+ years of performance.",
    description:
      "Power that never quits. We design and deploy complete solar energy systems for residential, commercial, and industrial clients. Every installation is engineered to perform — not just today, but for the next 25 years.",
    image: "/images/services/cei.jpg",
  },
  {
    id: "ses",
    icon: "Cpu",
    name: "Smart Energy Systems",
    blurb: "Intelligent monitoring and automation for your energy ecosystem.",
    description:
      "Your building, thinking for itself. We integrate intelligent energy management systems that monitor, optimize, and automate your power consumption in real time.",
    image: "/images/services/ses.jpg",
  },
  {
    id: "ies",
    icon: "HardHat",
    name: "Industrial Energy Solutions",
    blurb: "High-capacity power infrastructure for factories and large facilities.",
    description:
      "Because downtime costs more than energy. For factories, warehouses, and large facilities — we deliver high-capacity power infrastructure that eliminates operational disruption.",
    image: "/images/services/ies.jpg",
  },
  {
    id: "con",
    icon: "ClipboardCheck",
    name: "Energy Consulting",
    blurb: "Expert assessment and system design before you spend a naira.",
    description:
      "Know before you spend. Our expert consultants assess your energy profile, identify inefficiencies, and design a solution that fits your goals and your budget.",
    image: "/images/services/consulting.jpg",
  },
  {
    id: "mnt",
    icon: "Wrench",
    name: "Maintenance & Support",
    blurb: "We don't disappear after installation. Your system is always covered.",
    description:
      "We don't disappear after installation. Your system is monitored, serviced, and supported long after handover. Our technical team is always one call away.",
    image: "/images/services/mnt.jpg",
  },
  {
    id: "aca",
    icon: "GraduationCap",
    name: "Energy Academy",
    blurb: "Training the next generation of African energy professionals.",
    description:
      "Powering the next generation. We train technicians, engineers, and young Africans to build, operate, and maintain the energy infrastructure of tomorrow.",
    image: "/images/services/aca.jpg",
  },
] as const;

export const STATS = [
  { icon: "Zap", value: "500+", label: "Installations" },
  { icon: "Sun", value: "2MW+", label: "Clean Energy" },
  { icon: "MapPin", value: "6", label: "States Served" },
  { icon: "Award", value: "98%", label: "Satisfaction" },
  { icon: "Globe", value: "10+", label: "Industries" },
] as const;

export const DIFFERENTIATORS = [
  { icon: "Building2", title: "Infrastructure Thinking", body: "We build systems, not shortcuts." },
  { icon: "Bot", title: "Smart Technology", body: "Every installation is intelligently connected." },
  { icon: "ShieldCheck", title: "ESG Aligned", body: "Committed to environmental and social governance." },
  { icon: "Users", title: "Human Capital", body: "We train and empower while we install." },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Before Olea, we were spending ₦450,000 a month on diesel. Now we spend almost nothing. That money goes back into our business. Best investment we've ever made.",
    name: "Emmanuel O.",
    role: "Factory Owner",
    location: "Lagos",
    initials: "EO",
    rating: 5,
  },
  {
    quote: "The installation was professional, the team was knowledgeable, and our system has worked flawlessly for 18 months. Not a single issue. Zero. I've already referred three neighbors.",
    name: "Mrs. Adaeze N.",
    role: "Homeowner",
    location: "Abuja",
    initials: "AN",
    rating: 5,
  },
  {
    quote: "They didn't just sell us solar. They helped us understand our energy needs and built exactly what we required. The monitoring dashboard is incredible — world-class service.",
    name: "Chukwudi M.",
    role: "School Director",
    location: "Enugu",
    initials: "CM",
    rating: 5,
  },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "solar_panels", label: "Solar Panels" },
  { value: "inverters", label: "Inverters" },
  { value: "batteries", label: "Batteries" },
  { value: "charge_controllers", label: "Charge Controllers" },
  { value: "accessories", label: "Accessories" },
  { value: "systems", label: "Complete Systems" },
] as const;

export const FAQS = [
  {
    category: "General",
    items: [
      { q: "What is Olea Technologies?", a: "Olea Technologies is a premium African clean-energy company that designs, deploys, and maintains solar energy systems for homes, businesses, and industrial facilities across Nigeria." },
      { q: "What areas do you currently serve?", a: "We currently serve clients across Lagos, Abuja, Port Harcourt, Enugu, Kano, and surrounding areas. Contact us to check availability in your location." },
      { q: "Do you offer financing or payment plans?", a: "Yes. We offer structured payment plans for qualifying projects. Contact our team to discuss options based on your project size and needs." },
      { q: "How long have you been in business?", a: "Olea Technologies has been building clean energy infrastructure since 2022, with a growing portfolio of residential, commercial, and industrial installations." },
    ],
  },
  {
    category: "Products & Systems",
    items: [
      { q: "What's the difference between on-grid and off-grid systems?", a: "On-grid systems connect to the utility grid and can export excess power. Off-grid systems are fully independent with battery storage. Hybrid systems combine both for maximum reliability." },
      { q: "How do I know what size system I need?", a: "Our energy consultants assess your average consumption, peak load, and usage patterns to size the right system. Contact us for a free assessment." },
      { q: "How long do solar batteries last?", a: "Lithium (LiFePO4) batteries typically last 6,000+ cycles (15–20 years). Lead-acid batteries last 2–5 years. We recommend lithium for long-term value." },
      { q: "What brands of equipment do you use?", a: "We source Tier-1 equipment from globally certified manufacturers. Specific brands are recommended based on your project requirements and budget." },
    ],
  },
  {
    category: "Installation",
    items: [
      { q: "How long does installation take?", a: "Residential installations typically take 1–3 days. Commercial and industrial projects may take 1–2 weeks depending on scale." },
      { q: "Do I need to be present during installation?", a: "It's helpful but not always required. We coordinate with you in advance and provide a full handover briefing upon completion." },
      { q: "Will solar work for my type of building?", a: "Solar works on virtually any building with adequate roof space or land. Our team assesses your property during the free consultation." },
      { q: "What happens during rainy/cloudy seasons?", a: "Your battery storage keeps you powered during low-sun periods. Systems are designed with your local weather patterns in mind." },
    ],
  },
  {
    category: "Payments & Pricing",
    items: [
      { q: "How much does a 5KVA solar system cost?", a: "A 5KVA solar system typically ranges from ₦1,200,000 to ₦2,500,000 depending on battery capacity, panel brand, and installation complexity. Contact us for a precise quote." },
      { q: "What payment methods do you accept?", a: "We accept card payments, bank transfers, and USSD via Paystack. We also offer structured payment plans for larger installations." },
      { q: "Is there a warranty?", a: "Solar panels carry a 25-year performance warranty. Inverters come with 2–5 year warranties. We offer a 1-year installation warranty plus optional maintenance contracts." },
    ],
  },
  {
    category: "After-Sales",
    items: [
      { q: "What happens if something breaks?", a: "Contact our support team immediately. Most issues are resolved remotely via our monitoring system. On-site visits are scheduled within 24–48 hours for hardware issues." },
      { q: "How do I get technical support?", a: "Call our support line, send an email to support@oleatechnologies.com, or message us via the website. We respond within 2 business hours." },
      { q: "Do you offer maintenance contracts?", a: "Yes. We offer annual maintenance contracts that include regular inspections, cleaning, and priority support response. Ask our team for details." },
    ],
  },
];
