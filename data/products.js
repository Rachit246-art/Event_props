// AURÈLIA Event Props & Special FX Rental Catalog Data
const CATEGORIES_DATA = [
  { id: "all", name: "All Rentals" },
  { id: "decor-backdrops", name: "Decor & Backdrops" },
  { id: "photo-booth", name: "Photo Booths" },
  { id: "cold-pyro", name: "Special Effects" },
  { id: "props-signage", name: "Props & Signage" },
  { id: "food-beverage", name: "Food & Beverage Setup" },
  { id: "lounge-seating", name: "Lounge & Seating" },
  { id: "low-fog", name: "Smoke & Low Fog" },
  { id: "candlelight", name: "Candlelight & Tablescapes" }
];

const PRODUCTS_DATA = [
  {
    id: "prod-decor-backdrops",
    name: "Luxury Floral Arch & Stage Backdrop",
    category: "decor-backdrops",
    categoryLabel: "Decor & Backdrops",
    tagline: "Lush botanical circular & crescent arches with premium faux & fresh florals.",
    pricePerDay: 7500,
    priceUnit: "per setup / event",
    icon: `<svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM12 5.5A3.5 3.5 0 0 1 15.5 9h-7A3.5 3.5 0 0 1 12 5.5z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_02_01 PM.png"
  },
  {
    id: "prod-photo-booth",
    name: "Vintage Wooden & Ring Light Photo Booth",
    category: "photo-booth",
    categoryLabel: "Photo Booths",
    tagline: "Interactive touchscreen camera booth with instant custom photo prints.",
    pricePerDay: 8500,
    priceUnit: "full event package",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_04_33 PM.png"
  },
  {
    id: "prod-special-effects",
    name: "Indoor Safe Cold Pyro Sparkular Machines",
    category: "cold-pyro",
    categoryLabel: "Special Effects",
    tagline: "Smokeless, touch-safe indoor cold spark fountains (1.5m - 5m adjustable).",
    pricePerDay: 3500,
    priceUnit: "per machine / event",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2l2.4 5.6L20 9.2l-4.4 4 1.2 6-4.8-3-4.8 3 1.2-6-4.4-4 5.6-1.6z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_06_29 PM.png"
  },
  {
    id: "prod-props-signage",
    name: "Edison Vintage Light Bulb Marquee Letters & Signs",
    category: "props-signage",
    categoryLabel: "Props & Signage",
    tagline: "Warm dimmable illuminated marquee signs and custom statement lettering.",
    pricePerDay: 3000,
    priceUnit: "set / word",
    icon: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 10.38 9.5 9s1.12-2.5 2.5-2.5zM6 18c0-2 4-3.1 6-3.1s6 1.1 6 3.1H6z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_08_11 PM.png"
  },
  {
    id: "prod-food-beverage",
    name: "Artisanal Food & Beverage Live Counters",
    category: "food-beverage",
    categoryLabel: "Food & Beverage Setup",
    tagline: "Curated bamboo steamers, rustic warm displays & luxury buffet decor.",
    pricePerDay: 6000,
    priceUnit: "per counter setup",
    icon: `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_09_43 PM.png"
  },
  {
    id: "prod-lounge-seating",
    name: "VIP Velvet Lounge & Scalloped Curved Sofas",
    category: "lounge-seating",
    categoryLabel: "Lounge & Seating",
    tagline: "Plush cream velvet seating with gold trimmed tables and floral accents.",
    pricePerDay: 6500,
    priceUnit: "per seating cluster",
    icon: `<svg viewBox="0 0 24 24"><path d="M20 10V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5c0-1.1-.9-2-2-2zm-9 0H6V7h5v3zm7 0h-5V7h5v3z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_11_18 PM.png"
  },
  {
    id: "prod-canopy-lighting",
    name: "Grand Dining Canopy with Hanging Warm Bulbs",
    category: "decor-backdrops",
    categoryLabel: "Canopy & Lighting",
    tagline: "Atmospheric fairy tent canopy with suspended Edison filaments and chandeliers.",
    pricePerDay: 12000,
    priceUnit: "per canopy span",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_12_28 PM.png"
  },
  {
    id: "prod-botanical-arch",
    name: "Blush Pink & White Floral Ring Arch",
    category: "decor-backdrops",
    categoryLabel: "Floral & Arches",
    tagline: "Romantic flower ring backdrop accented with soft drape curtains.",
    pricePerDay: 8000,
    priceUnit: "per arch setup",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2l2.4 5.6L20 9.2l-4.4 4 1.2 6-4.8-3-4.8 3 1.2-6-4.4-4 5.6-1.6z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_14_26 PM.png"
  },
  {
    id: "prod-neon-floral-wall",
    name: "Custom Neon Sign & Foliage Wall ('Better Together')",
    category: "props-signage",
    categoryLabel: "Neon & Wall Props",
    tagline: "Vibrant custom neon script mounted on lush boxwood green & flower hedge.",
    pricePerDay: 5500,
    priceUnit: "per installation",
    icon: `<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_15_25 PM.png"
  },
  {
    id: "prod-candlelight-banquet",
    name: "Regal Banquet Tablescape & Candlelight Sets",
    category: "candlelight",
    categoryLabel: "Candlelight & Tables",
    tagline: "Tall glass hurricane cylinder vases, floating candles & taper centerpieces.",
    pricePerDay: 4000,
    priceUnit: "set for 10 guest tables",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.96 1.25 3.63 3 4.25V21h3V10.75c1.75-.62 3-2.29 3-4.25C16.5 4 14.5 2 12 2z"/></svg>`,
    image: "images/products/ChatGPT Image Sep 8, 2026, 03_16_52 PM.png"
  },
  {
    id: "prod-dry-ice-low-fog",
    name: "Heavy Dry-Ice Low Fog 'Cloud Walk' Machine",
    category: "low-fog",
    categoryLabel: "Smoke & Low Fog",
    tagline: "Thick floor-hugging celestial cloud layer that stays strictly below the knees.",
    pricePerDay: 5000,
    priceUnit: "per machine / event",
    icon: `<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-rgb-fog-geyser",
    name: "RGB LED Geyser Vertical Smoke Plume Jet",
    category: "low-fog",
    categoryLabel: "Smoke & Low Fog",
    tagline: "High-velocity vertical smoke blasts illuminated by 24 tri-color LEDs.",
    pricePerDay: 2800,
    priceUnit: "per jet unit / event",
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2v1h-4V4c0-1.1.9-2 2-2zm6 5H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/></svg>`,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  }
];
