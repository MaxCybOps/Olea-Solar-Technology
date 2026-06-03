export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  body: Array<{ type: "p" | "h" | "quote"; text: string }>;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "what-size-solar-system-does-your-home-need",
    title: "What size solar system does your home actually need?",
    excerpt: "Most Nigerians are sold systems that are either too small (leaving them in the dark after 6pm) or ridiculously oversized. Here's how to get it exactly right.",
    category: "Energy Education",
    author: "Olea Engineering Team",
    date: "May 12, 2026",
    readTime: "6 min",
    featured: true,
    body: [
      { type: "p", text: "The number one mistake people make when going solar in Nigeria is guessing. They hear a neighbor bought a 5KVA inverter and copy. Or they ask a generator dealer who upsells them. The result is either a system that fails by evening, or one that costs three times what they needed." },
      { type: "h", text: "Start with your load, not the inverter size" },
      { type: "p", text: "Before you buy anything, you need a load assessment. Write down every appliance in your home: lights, fans, TVs, fridges, AC units, water pumps, phone chargers. Then find each item's wattage (usually printed on the label or in the manual)." },
      { type: "p", text: "A typical 3-bedroom Lagos home runs about 2,500–3,500W of simultaneous load. That means a 5KVA inverter (which delivers roughly 4,000W continuous) is the right fit — not the 3KVA that's commonly sold as 'enough.'" },
      { type: "quote", text: "Size the battery for how long you want to run, not for what sounds impressive in a sales pitch." },
      { type: "h", text: "How battery capacity translates to real hours" },
      { type: "p", text: "A 200Ah lithium battery at 51.2V stores about 10.24kWh of energy. At a load of 1,500W (a realistic overnight load — fridge, two fans, phone chargers, one TV), you get roughly 6–7 hours. Want 12 hours? You need two batteries." },
      { type: "p", text: "Lead-acid batteries complicate this because you can only safely use 50% of their capacity. A 200Ah lead-acid battery effectively gives you 100Ah of usable power. Lithium gives you 90–95%. That's why lithium wins for anyone who wants reliability." },
      { type: "h", text: "Solar panels: more is almost always better" },
      { type: "p", text: "Your panels need to do two jobs: power your load during the day AND recharge your batteries before nightfall. A common mistake is under-paneling — buying a great inverter and battery but only 2 panels, which means the battery never fully charges." },
      { type: "p", text: "For a 5KVA system with a 200Ah lithium battery, you want at least 6 × 450W panels (2,700W of solar). That gives you enough generation in 5 peak sun hours to cover daytime load and fully recharge overnight consumption." },
      { type: "quote", text: "Nigeria averages 5.5 peak sun hours per day. That's a massive advantage. Don't waste it with undersized panels." },
      { type: "h", text: "The honest cost breakdown (2026)" },
      { type: "p", text: "A properly sized 3-bedroom home system — 5KVA hybrid inverter, 6 × 450W panels, 1 × 200Ah lithium battery, mounting, wiring, and professional installation — runs between ₦1.4M and ₦1.8M. That sounds like a lot until you compare it to ₦80,000/month in diesel plus generator maintenance." },
      { type: "p", text: "At ₦80,000/month, that's ₦960,000/year on diesel alone. Your solar system pays for itself in 18–22 months. After that, your energy is free for the next 20+ years." },
    ],
  },
  {
    id: "b2",
    slug: "inside-a-50kva-install-at-a-lagos-factory",
    title: "Inside a 50KVA install at a Lagos factory",
    excerpt: "How we took a textile factory in Mushin from 12 hours of daily generator downtime to zero — and cut their energy costs by 68% in the first month.",
    category: "Installation Stories",
    author: "Olea Engineering Team",
    date: "Apr 28, 2026",
    readTime: "8 min",
    featured: false,
    body: [
      { type: "p", text: "In January 2026, we got a call from the operations manager of a mid-sized textile factory in Mushin, Lagos. They were running three 20KVA diesel generators 24/7, burning through ₦2.1M in fuel every month. Maintenance costs, generator breakdowns, and production halts were costing them another ₦400,000/month in lost output." },
      { type: "h", text: "The assessment: understanding a factory's power profile" },
      { type: "p", text: "Industrial assessments are different from home assessments. You're not just counting appliances — you're analyzing three-phase loads, motor startup currents, power factor, harmonic distortion, and peak demand windows." },
      { type: "p", text: "This factory's peak load hit 45KW during the 8–12am production window when all looms were running simultaneously. Off-peak (nights and weekends) dropped to about 8KW for security lighting and cold storage." },
      { type: "quote", text: "The goal wasn't just to replace diesel. It was to build an energy infrastructure that could grow with the factory for the next 25 years." },
      { type: "h", text: "The system design: three-phase hybrid at scale" },
      { type: "p", text: "We installed three 10KVA three-phase hybrid inverters configured in parallel for a combined 30KW continuous output (50KVA peak capacity). Solar array: 80 × 450W panels across the factory roof, totalling 36,000W of generation. Battery bank: 8 × 200Ah lithium batteries in a dedicated battery room, providing 82kWh of storage." },
      { type: "p", text: "The system feeds directly into the factory's existing distribution board. The inverters handle grid presence detection — when NEPA (PHCN) power is available, it supplements. When it disappears (as it does 12–18 hours daily in that area), the system continues without interruption. Zero transfer time." },
      { type: "h", text: "Month 1 results" },
      { type: "p", text: "Diesel consumption dropped from ₦2.1M/month to ₦680,000/month — a 68% reduction. The remaining diesel spend covers two weekend afternoons when cloud cover and high load demand the generators for backup. The factory has had zero unplanned production halts since commissioning." },
      { type: "p", text: "Total system cost: ₦22.4M installed. Payback period at current fuel prices: 9.2 months. Expected system life: 25 years." },
    ],
  },
  {
    id: "b3",
    slug: "lithium-vs-lead-acid-2026-buyers-guide",
    title: "Lithium vs. lead-acid: a 2026 buyer's guide",
    excerpt: "Lead-acid is cheaper upfront. Lithium wins on every other metric. We break down the real numbers so you can make a decision you won't regret in two years.",
    category: "Tech & Innovation",
    author: "Olea Engineering Team",
    date: "Apr 14, 2026",
    readTime: "5 min",
    featured: false,
    body: [
      { type: "p", text: "In 2022, we were installing roughly 60% lead-acid, 40% lithium. In 2026, that ratio has almost reversed. The price gap between the two technologies has narrowed, and the performance difference has become impossible to ignore." },
      { type: "h", text: "The upfront cost gap is shrinking fast" },
      { type: "p", text: "A 200Ah lead-acid battery costs approximately ₦120,000–₦160,000. The equivalent lithium LiFePO4 battery costs ₦580,000–₦680,000. On paper, that's a 4× premium. But the comparison is misleading for two reasons." },
      { type: "p", text: "First, usable capacity: lead-acid is only safely dischargeable to 50%. Lithium goes to 90–95%. So a 200Ah lead-acid effectively gives you 100Ah of usable energy. You need two lead-acid batteries to match one lithium battery's real output. Now the cost ratio is 2× not 4×." },
      { type: "quote", text: "Lead-acid lasts 300–500 cycles. Lithium lasts 6,000+. At one cycle per day, that's 1.5 years vs. 16 years." },
      { type: "h", text: "Cycle life: the number that changes everything" },
      { type: "p", text: "At one full charge/discharge cycle per day (normal for a home solar system), a lead-acid battery needs replacement in 18–24 months. Lithium lasts 15–20 years — essentially the lifetime of your solar panels." },
      { type: "p", text: "Over 10 years, a lead-acid setup requires 4–5 battery replacements. At ₦240,000 per 200Ah pair, that's ₦960,000–₦1.2M in battery costs alone over a decade. One lithium battery at ₦620,000 covers the same period with money left over." },
      { type: "h", text: "Performance differences that matter day-to-day" },
      { type: "p", text: "Lithium charges faster — a 200Ah LiFePO4 reaches full charge in 2–3 hours from solar. Lead-acid takes 6–8 hours and slows dramatically in the final 20% (the absorption phase). In Nigerian conditions where peak sun is limited to 5–6 hours, faster charging means more usable energy every day." },
      { type: "p", text: "Lead-acid also loses capacity in heat. In Lagos or Abuja, where battery enclosures regularly reach 35–40°C, lead-acid batteries degrade 20–30% faster than their rated specs. Lithium is stable up to 60°C." },
      { type: "h", text: "Our recommendation" },
      { type: "p", text: "If you're on a very tight budget and replacing the battery every 2 years is acceptable, lead-acid is still an option. For everyone else — and especially for anyone building a system they expect to last — lithium LiFePO4 is the only sensible choice. It's what we install in every Olea system." },
    ],
  },
  {
    id: "b4",
    slug: "how-smart-energy-monitoring-works",
    title: "How smart energy monitoring works (and why you want it)",
    excerpt: "Knowing your system is running isn't enough. Real-time monitoring tells you exactly when to run heavy appliances, when clouds are reducing your generation, and when something needs attention.",
    category: "Tech & Innovation",
    author: "Olea Engineering Team",
    date: "Mar 30, 2026",
    readTime: "4 min",
    featured: false,
    body: [
      { type: "p", text: "Every Olea hybrid inverter comes with WiFi monitoring built in. Most of our clients set it up once and check it every morning like they check the weather. Once you can see your energy in real time, you start making smarter decisions automatically." },
      { type: "h", text: "What the monitoring dashboard shows you" },
      { type: "p", text: "The app shows five key metrics in real time: solar generation (kW currently being produced), load consumption (how much your home or business is currently using), battery state of charge (%), grid import/export, and a 30-day history of all four." },
      { type: "p", text: "That history is where the real insights live. You can see which days cloud cover hit your generation, which afternoons your load spiked (usually when someone turned on an AC), and how your battery holds overnight through the week." },
      { type: "quote", text: "Clients who use the monitoring app report 15–25% lower energy consumption within the first month, just from seeing the data." },
      { type: "h", text: "Smarter decisions you'll make automatically" },
      { type: "p", text: "Once you know your system generates peak power between 10am and 2pm, you'll naturally shift heavy loads — washing machine, electric water heater, charging power banks — to that window. You're using free solar power instead of drawing from the battery or grid." },
      { type: "p", text: "The app also sends alerts. If your generation drops unexpectedly (a panel is shaded or dusty), you get notified. If your battery doesn't reach full charge by afternoon, the system flags it so you can reduce evening load. These early warnings prevent costly surprises." },
    ],
  },
  {
    id: "b5",
    slug: "solar-energy-for-schools-nigeria",
    title: "Why schools in Nigeria are switching to solar — and what it costs",
    excerpt: "From primary schools in Owerri to universities in Abuja — clean energy is giving Nigerian schools stable power for computers, labs, and lights at a fraction of diesel costs.",
    category: "Energy Education",
    author: "Olea Engineering Team",
    date: "Mar 15, 2026",
    readTime: "5 min",
    featured: false,
    body: [
      { type: "p", text: "A secondary school principal in Owerri told us something that stuck: 'We've been buying diesel for 14 years. It never gets cheaper. It never becomes reliable. We just keep buying it.' She was spending ₦580,000/month fueling generators to power lights, fans, and the one computer lab they had." },
      { type: "h", text: "What a school solar system looks like" },
      { type: "p", text: "Schools have a profile that suits solar extremely well. Their peak usage — classrooms running during the day — coincides exactly with peak solar generation hours. Unlike homes, they don't need heavy overnight storage because most of the demand is daytime." },
      { type: "p", text: "A typical secondary school setup at Olea: 10KVA hybrid inverter, 16 × 450W panels (7,200W array), 2 × 200Ah lithium batteries. This powers all classrooms, the admin block, and a computer lab with reliable power 8 hours per day." },
      { type: "quote", text: "The school doesn't need to store much energy — they just need the sun to power school hours. And Nigeria has more than enough sun." },
      { type: "h", text: "Typical cost and payback for a school" },
      { type: "p", text: "An installation like the one above runs approximately ₦4.2M–₦5.8M fully installed, depending on site conditions and cable runs. At ₦580,000/month in diesel savings, payback is 7–10 months." },
      { type: "p", text: "Beyond the economics, schools gain something harder to price: reliability. Exams no longer depend on NEPA. Computer classes run on schedule. Science labs with sensitive equipment stop suffering from voltage fluctuations that destroy equipment." },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentId: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.id !== currentId).slice(0, limit);
}
