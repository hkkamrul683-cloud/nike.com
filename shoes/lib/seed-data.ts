export interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface SeedProduct {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  details: string[];
  price: number;
  salePrice?: number;
  stock: number;
  categorySlug: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  sport: 'running' | 'basketball' | 'football' | 'training' | 'lifestyle';
  badge?: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  colors: string[];
  colorway: string;
  sizes: string[];
  images: string[];
  sku: string;
}

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    name: 'Shoes',
    slug: 'shoes',
    description: 'High-performance footwear engineered for speed, endurance, and street style.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'Engineered sportswear, breathable fabrics, and technical fleece apparel.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Jordan',
    slug: 'flight',
    description: 'Iconic basketball high-tops, hardwood heritage, and legendary flight silhouettes.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Duffel bags, performance socks, training caps, and high-flow sports bottles.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  // --- . SPORTIX AIR FORCE 1 '07 ---
  {
    name: "SPORTIX Air Force 1 '07",
    slug: 'sportix-air-force-1-07',
    subtitle: "Men's Everyday Shoes",
    description: "The radiance lives on in the SPORTIX Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold details and the perfect amount of flash to make you shine.",
    details: [
      'Stitched leather overlays on the upper add heritage style, durability and support',
      'Originally designed for performance hoops, SPORTIX Air cushioning adds lightweight, all-day comfort',
      'Low-cut silhouette adds a clean, streamlined look',
      'Padded collar feels soft and comfortable',
      'Perforations on the toe box for breathability'
    ],
    price: 115.00,
    stock: 75,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'lifestyle',
    badge: 'Best Seller',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Triple White', 'Black / White', 'Sail / Coconut Milk'],
    colorway: 'Triple White',
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-AF1-07-WHT',
  },

  // --- 2. AIR JORDAN 1 RETRO HIGH OG ---
  {
    name: 'Air Jordan 1 Retro High OG',
    slug: 'air-jordan-1-retro-high-og',
    subtitle: "Men's Basketball Heritage Shoes",
    description: "Familiar but always fresh, the iconic Air Jordan 1 is remastered for today's sneakerhead culture. Premium leather, comfortable cushioning and classic design details deliver hardwood heritage with modern swagger.",
    details: [
      'Genuine tumbled leather upper with contrasting Chicago overlays',
      'Encapsulated Air cushion in the heel for lightweight impact protection',
      'Solid rubber cupsole with deep pivot-circle flex grooves',
      'Wings logo stamped on collar and woven SPORTIX Air tongue label'
    ],
    price: 180.00,
    stock: 40,
    categorySlug: 'flight',
    gender: 'men',
    sport: 'basketball',
    badge: 'Member Exclusive',
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    colors: ['Chicago Red / Black / Sail', 'Shadow Grey / White', 'Royal Blue / Obsidian'],
    colorway: 'Chicago Red / Black / Sail',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD1-RET-CHI',
  },

  // --- . SPORTIX DUNK LOW RETRO ---
  {
    name: 'SPORTIX Dunk Low Retro',
    slug: 'sportix-dunk-low-retro',
    subtitle: "Men's Iconic Streetwear Shoes",
    description: "Created for the hardwood but taken to the streets, the '80s icon returns with crisp overlays and original team colors. With its iconic basketball design, it channels '80s vintage back onto the street.",
    details: [
      'Crisp leather upper ages to soft perfection and features durable overlays',
      'Foam midsole offers lightweight, responsive cushioning',
      'Padded, low-cut collar looks sleek and feels comfortable',
      'Rubber outsole with classic hoops pivot circle adds durability and heritage grip'
    ],
    price: 115.00,
    salePrice: 95.00,
    stock: 50,
    categorySlug: 'shoes',
    gender: 'unisex',
    sport: 'lifestyle',
    badge: 'Trending',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['White / Black (Panda)', 'Coast Blue / Sail', 'Grey Fog / White'],
    colorway: 'White / Black (Panda)',
    sizes: ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-DNK-LOW-PND',
  },

  // --- . SPORTIX AIR MAX 90 ---
  {
    name: 'SPORTIX Air Max 90',
    slug: 'sportix-air-max-90',
    subtitle: "Men's Road Classic Shoes",
    description: "Nothing as fly, nothing as proven. The SPORTIX Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents on the heel and eyestays. Max Air cushioning adds comfort to your journey.",
    details: [
      'Originally designed for performance running, Max Air unit in the heel adds unbelievable cushioning',
      'Low-top design combines with padded collar for a sleek look that feels soft and comfortable',
      'Stitched overlays and TPU accents add durability, comfort and the iconic 90s look',
      'Rubber Waffle outsole delivers traction and heritage style'
    ],
    price: 130.00,
    stock: 35,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'lifestyle',
    badge: 'Heritage',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Infrared / White / Black', 'Triple Black', 'Pure Platinum / Wolf Grey'],
    colorway: 'Infrared / White / Black',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-AM90-INF-01',
  },

  // --- . SPORTIX VAPORFLY 3 ---
  {
    name: 'SPORTIX Vaporfly 3',
    slug: 'sportix-vaporfly-3',
    subtitle: "Men's Road Racing Marathon Shoes",
    description: "Catch 'em if you can. Giving you race-day speed to conquer any distance, the SPORTIX Vaporfly 3 is made for the chasers, the racers and the elevated pacers who can't turn down the thrill of the pursuit.",
    details: [
      'Full-length carbon fiber Flyplate provides a stiff and propulsive feel',
      'SPORTIX ZoomX foam runs from heel to toe for maximum energy return',
      'Selected Flyknit yarns bring engineered zones of support through the forefoot',
      'Updated thin outsole rubber reduces weight without sacrificing durability'
    ],
    price: 260.00,
    salePrice: 210.00,
    stock: 25,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'running',
    badge: 'Marathon Elite',
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    colors: ['Volt / Fierce Pink / Black', 'Hyper Royal / White', 'Triple White'],
    colorway: 'Volt / Fierce Pink / Black',
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-VPF3-VLT-02',
  },

  // --- 6. AIR JORDAN 4 RETRO ---
  {
    name: 'Air Jordan 4 Retro',
    slug: 'air-jordan-4-retro',
    subtitle: "Men's Hardwood Classic Shoes",
    description: "One of the most beloved silhouettes in the sneaker kingdom. The Air Jordan 4 Retro delivers lightweight cushioning with sculpted midsole details and iconic mesh quarter panels for unmatched street presence.",
    details: [
      'Genuine full-grain leather, synthetic and fabric upper',
      'Visible Air-Sole unit in heel and encapsulated forefoot Air unit',
      'Molded plastic eyestays and heel pull tab',
      'Rubber outsole with modified herringbone traction pattern'
    ],
    price: 215.00,
    stock: 30,
    categorySlug: 'flight',
    gender: 'men',
    sport: 'basketball',
    badge: 'Exclusive Drop',
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    colors: ['Military Blue / Neutral Grey', 'Bred Reimagined', 'White Cement'],
    colorway: 'Military Blue / Neutral Grey',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD4-RET-BLU',
  },

  // --- . SPORTIX AIR ZOOM PEGASUS 41 ---
  {
    name: 'SPORTIX Air Zoom Pegasus 41',
    slug: 'sportix-air-zoom-pegasus-41',
    subtitle: "Men's Road Running Shoes",
    description: "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole.",
    details: [
      'Upgraded breathable engineered mesh upper keeps feet ventilated',
      'ReactX foam midsole surrounds forefoot and heel Air Zoom units',
      'Signature waffle-inspired rubber outsole for grip on pavement',
      'Plush collar, tongue and sockliner provide a secure and comfortable fit'
    ],
    price: 140.00,
    stock: 60,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'running',
    badge: 'Best Seller',
    isFeatured: false,
    isNew: true,
    isBestseller: true,
    colors: ['White / Black / Bright Crimson', 'Triple Black', 'Glacier Blue / Sail'],
    colorway: 'White / Black / Bright Crimson',
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-PEG-41-WHT',
  },

  // --- . SPORTIX METCON 9 ---
  {
    name: 'SPORTIX Metcon 9',
    slug: 'sportix-metcon-9',
    subtitle: "Men's Workout & Cross-Training Shoes",
    description: "Whatever your workout demands, the Metcon 9 delivers. Equipped with an enlarged Hyperlift plate and dual-density foam, it is sworn to by elite weightlifters and functional fitness athletes across the globe.",
    details: [
      'Enlarged Hyperlift plate in the heel provides unshakeable stability under heavy loads',
      'Lace lock system securely clips laces to the tongue so they never untie mid-set',
      'Full-wrap rubber rope guard protects during aggressive rope climbs',
      'Dual-density midsole cushioning cushions box jumps and sprints'
    ],
    price: 150.00,
    salePrice: 127.50,
    stock: 45,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'training',
    badge: 'Pro Athlete Choice',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Smoke Grey / White / Total Orange', 'Black / Gum Light Brown'],
    colorway: 'Smoke Grey / White / Total Orange',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-MTC-9-GRY',
  },

  // --- . SPORTIX MERCURIAL SUPERFLY 9 ELITE ---
  {
    name: 'SPORTIX Mercurial Superfly 9 Elite',
    slug: 'sportix-mercurial-superfly-9-elite',
    subtitle: "Men's Firm-Ground Football Cleats",
    description: "Instantly tilt the pitch in the bold design of the Superfly 9 Elite FG. SPORTIX added a football-specific 3/4 Zoom Air unit so you can dominate in the critical moments of a match.",
    details: [
      'Football-specific 3/4 Zoom Air unit seated directly in the soleplate for explosive propulsion',
      'Vaporposite+ upper combines grippy mesh with premium touch coating for lightning-fast control',
      'Tri-star stud configuration delivers omnidirectional grip for rapid acceleration and cuts',
      'Flyknit dynamic collar wraps the ankle in secure compression'
    ],
    price: 285.00,
    stock: 20,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'football',
    badge: 'Matchday Edition',
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    colors: ['Metallic Silver / Volt / Black', 'Lemon Chiffon / Bright Crimson'],
    colorway: 'Metallic Silver / Volt / Black',
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-MRC-SUP9-SLV',
  },

  // --- 10. AIR JORDAN 1 LOW ---
  {
    name: 'Air Jordan 1 Low',
    slug: 'air-jordan-1-low',
    subtitle: "Men's Low-Top Lifestyle Shoes",
    description: "Inspired by the 1985 original, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any fit, these kicks ensure you'll always be on point.",
    details: [
      'Encapsulated Air-Sole unit provides lightweight cushioning',
      'Genuine leather in the upper offers durability and a premium look',
      'Solid rubber outsole enhances traction on a variety of surfaces',
      'Stitched Wings logo on heel and Jumpman on tongue'
    ],
    price: 115.00,
    stock: 55,
    categorySlug: 'flight',
    gender: 'unisex',
    sport: 'lifestyle',
    badge: 'Popular',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Black / White / Gym Red', 'Triple White', 'Wolf Grey / Aluminum'],
    colorway: 'Black / White / Gym Red',
    sizes: ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD1-LOW-BRED',
  },

  // --- . SPORTIX VOMERO 5 ---
  {
    name: 'SPORTIX Vomero 5',
    slug: 'sportix-vomero-5',
    subtitle: "Men's Retro Y2K Running Shoes",
    description: "Carve a new lane for yourself in the Zoom Vomero 5—your go-to for complexity, depth and easy styling. The richly layered design includes textiles, synthetic suede and plastic accents that come together to make one of the coolest sneakers of the season.",
    details: [
      'Synthetic leather on the upper adds durability while mesh panels add breathability',
      'Zoom Air cushioning offers a quick-off-the-ground sensation',
      'Plastic cage on the side adds supportive structure',
      'Ventilation ports on the heel keep it airy and comfortable'
    ],
    price: 160.00,
    stock: 40,
    categorySlug: 'shoes',
    gender: 'men',
    sport: 'lifestyle',
    badge: 'Trending',
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    colors: ['Photon Dust / Metallic Silver', 'Oatmeal / Pale Ivory', 'Triple Black'],
    colorway: 'Photon Dust / Metallic Silver',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'],
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-VOM5-SLV-01',
  },

  // --- . SPORTIX TECH FLEECE WINDRUNNER HOODIE ---
  {
    name: 'SPORTIX Tech Fleece Windrunner',
    slug: 'sportix-tech-fleece-windrunner-hoodie',
    subtitle: "Men's Full-Zip Technical Hoodie",
    description: "Blending two of our most iconic looks, this full-zip hoodie draws design inspiration from our timeless Windrunner jacket as well as our signature Tech Fleece jacket. Smooth on both sides, this premium lightweight fleece delivers plenty of warmth without adding bulk.",
    details: [
      'Premium lightweight thermal fleece is smooth on both sides, delivering warmth without bulk',
      'Signature chevron design lines on the chest nod to the heritage 1978 Windrunner jacket',
      'Zippered sleeve pocket provides quick storage for keys, cards and phone',
      '4-panel articulated hood with high-collar wind coverage'
    ],
    price: 145.00,
    stock: 50,
    categorySlug: 'clothing',
    gender: 'men',
    sport: 'lifestyle',
    badge: 'Iconic Apparel',
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    colors: ['Heather Grey / Black', 'Triple Black', 'Obsidian Navy'],
    colorway: 'Heather Grey / Black',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-TF-WND-GRY',
  },

  // --- . SPORTIX TECH FLEECE JOGGERS ---
  {
    name: 'SPORTIX Tech Fleece Joggers',
    slug: 'sportix-tech-fleece-joggers',
    subtitle: "Men's Slim-Fit Fleece Pants",
    description: "Ready for cooler weather, our tailored Tech Fleece joggers feature a slimmer fit that's perfect for everyday wear. Roomy through the thighs, this tapered design narrows at the knee to give you a comfortable feel without losing the clean, tailored look.",
    details: [
      'Signature taped zippered pocket with interior organizer pocket keeps essentials secure',
      'Elastic waistband with external contrast drawcord allows for a custom fit',
      'Tall ribbed ankle cuffs showcase your favorite sneakers',
      'Lightweight thermal fleece construction'
    ],
    price: 125.00,
    stock: 60,
    categorySlug: 'clothing',
    gender: 'men',
    sport: 'lifestyle',
    badge: 'Best Seller',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Heather Grey', 'Black', 'Dark Marina Blue'],
    colorway: 'Heather Grey',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-TF-JOG-01',
  },

  // --- . SPORTIX CLUB FLEECE PULLOVER HOODIE ---
  {
    name: 'SPORTIX Club Fleece Pullover Hoodie',
    slug: 'sportix-club-fleece-pullover-hoodie',
    subtitle: "Brushed-Back Fleece Everyday Hoodie",
    description: "Universally loved for its coziness and consistency, Club Fleece is for everyone. Always soft and made with our standard fit, it's a staple that helps you do more.",
    details: [
      'Club Fleece is brushed on the interior for added warmth and plush softness',
      'Ribbed hem and cuffs keep warmth locked inside',
      'Front kangaroo pocket offers convenient hand warmth and storage',
      'Embroidered SPORTIX Futura logo on the chest'
    ],
    price: 65.00,
    salePrice: 52.00,
    stock: 80,
    categorySlug: 'clothing',
    gender: 'unisex',
    sport: 'lifestyle',
    badge: 'Classic',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Black / White', 'Dark Grey Heather', 'Club Gold', 'Gym Red'],
    colorway: 'Black / White',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-CLB-FLC-BLK',
  },

  // --- . SPORTIX DRI-FIT LEGEND FITNESS TEE ---
  {
    name: 'SPORTIX Dri-FIT Legend Fitness Tee',
    slug: 'sportix-dri-fit-legend-fitness-tee',
    subtitle: "Men's Performance Training Top",
    description: "Power through your toughest training sessions in the SPORTIX Dri-FIT Legend T-Shirt. Sweat-wicking technology helps keep you dry and comfortable from warmups to cool-downs.",
    details: [
      'SPORTIX Dri-FIT technology moves sweat away from your skin for quicker evaporation',
      'Lightweight athletic jersey fabric feels soft against your skin',
      'Standard fit for a relaxed, easy feel',
      'Odor-resistant finish helps fabric stay fresh throughout workouts'
    ],
    price: 35.00,
    stock: 90,
    categorySlug: 'clothing',
    gender: 'men',
    sport: 'training',
    badge: 'Training Essential',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Black', 'Obsidian', 'White', 'Carbon Heather'],
    colorway: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-DF-LEG-TEE',
  },

  // --- 16. JORDAN ESSENTIALS FLEECE HOODIE ---
  {
    name: 'Jordan Essentials Fleece Hoodie',
    slug: 'jordan-essentials-fleece-hoodie',
    subtitle: "Men's Heavyweight Fleece Pullover",
    description: "Pull on everyday comfort with the Jordan Essentials Fleece Pullover. Made from heavyweight French terry fabric that's brushed on the inside for softness, it features an embroidered Jumpman patch on the chest.",
    details: [
      'Heavyweight French terry fleece is brushed on the interior for cozy softness',
      'Spacious hood adjusts with a metal-tipped drawcord',
      'Front kangaroo pocket stores everyday items',
      'Stitched Jumpman patch and tonal Michael Jordan signature embroidery'
    ],
    price: 85.00,
    stock: 45,
    categorySlug: 'flight',
    gender: 'men',
    sport: 'basketball',
    badge: 'Flight Heritage',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Gym Red / Black', 'Black / White', 'Sail / Light Bone'],
    colorway: 'Gym Red / Black',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD-ESS-HD-RED',
  },

  // --- . SPORTIX ONE HIGH-WAISTED 7/8 LEGGINGS ---
  {
    name: 'SPORTIX One High-Waisted 7/8 Leggings',
    slug: 'sportix-one-high-waisted-leggings',
    subtitle: "Women's Squat-Proof Workout Leggings",
    description: "Ready for a workout or down to chill, the SPORTIX One Leggings are versatile enough for anything. The silky-soft fabric provides squat-proof coverage with all-day confidence.",
    details: [
      'Non-sheer fabric passes the squat test to keep you reliably covered',
      'Seamless sides and a contoured V-shape waistband give a smooth silhouette',
      '2 hidden pockets in the high-rise waistband keep your phone and cards close',
      'Dri-FIT technology helps you stay dry and comfortable'
    ],
    price: 65.00,
    stock: 70,
    categorySlug: 'clothing',
    gender: 'women',
    sport: 'training',
    badge: 'Best Seller',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Black / White Swoosh', 'Midnight Navy', 'Smoky Mauve'],
    colorway: 'Black / White Swoosh',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-ONE-LEG-BLK',
  },

  // --- . SPORTIX AIR MAX 270 (KIDS) ---
  {
    name: 'SPORTIX Air Max 270 (Kids)',
    slug: 'sportix-air-max-270-kids',
    subtitle: "Big Kids' Shoes",
    description: "Boasting SPORTIX's first lifestyle Air unit, the SPORTIX Air Max 270 delivers visible bounce under every step. Updated for modern comfort, it pays homage to the original 1991 Air Max 180.",
    details: [
      'Large Max Air 270 unit in the heel delivers responsive cushioning',
      'Stretchy inner sleeve creates a snug, sock-like fit',
      'Breathable mesh upper keeps little feet cool',
      'Dual-density foam sole cushions growing feet'
    ],
    price: 130.00,
    salePrice: 104.00,
    stock: 35,
    categorySlug: 'shoes',
    gender: 'kids',
    sport: 'lifestyle',
    badge: 'Kids Top Pick',
    isFeatured: true,
    isNew: true,
    isBestseller: true,
    colors: ['Black / University Red / White', 'Triple White', 'Photo Blue / Black'],
    colorway: 'Black / University Red / White',
    sizes: ['US 3.5Y', 'US 4Y', 'US 4.5Y', 'US 5Y', 'US 5.5Y', 'US 6Y', 'US 6.5Y', 'US 7Y'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-KID-270-RED',
  },

  // --- 19. AIR JORDAN 1 MID (KIDS) ---
  {
    name: 'Air Jordan 1 Mid (Kids)',
    slug: 'air-jordan-1-mid-kids',
    subtitle: "Big Kids' Basketball Shoes",
    description: "The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look. Its Air-Sole unit cushions play on the hardwood, while the padded collar gives a supportive feel.",
    details: [
      'Premium genuine leather and synthetic upper for durability and comfort',
      'Air-Sole unit in the heel delivers signature cushioning',
      'Solid rubber outsole provides traction on diverse surfaces',
      'Perforated toe box for active breathability'
    ],
    price: 110.00,
    stock: 40,
    categorySlug: 'flight',
    gender: 'kids',
    sport: 'basketball',
    badge: 'Flight Kids',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Black / Gym Red / White', 'Ice Blue / White', 'Shadow Grey'],
    colorway: 'Black / Gym Red / White',
    sizes: ['US 3.5Y', 'US 4Y', 'US 4.5Y', 'US 5Y', 'US 5.5Y', 'US 6Y', 'US 6.5Y', 'US 7Y'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD1-KID-MID',
  },

  // --- . SPORTIX BRASILIA TRAINING DUFFEL BAG (60L) ---
  {
    name: 'SPORTIX Brasilia Training Duffel Bag (60L)',
    slug: 'sportix-brasilia-training-duffel-bag-60l',
    subtitle: "Medium Training Gear Duffel Bag",
    description: "The spacious and durable SPORTIX Brasilia Duffel Bag keeps all your workout gear at hand. A side compartment stores shoes separately, while inner and outer pockets help you stay organized.",
    details: [
      'Zippered main compartment secures your training essentials',
      'Zippered inner pocket keeps dirty shoes and sweaty clothes separate',
      'Coated bottom helps shield your gear from bumps, scrapes and spills',
      'Outer pockets keep your must-haves within quick reach'
    ],
    price: 47.00,
    stock: 50,
    categorySlug: 'accessories',
    gender: 'unisex',
    sport: 'training',
    badge: 'Gear Essential',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['Black / White', 'Midnight Navy / Black', 'Iron Grey'],
    colorway: 'Black / White',
    sizes: ['Medium (60L)'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-BAG-BRA-60L',
  },

  // --- . SPORTIX EVERYDAY CUSHION CREW SOCKS (6 PAIRS) ---
  {
    name: 'SPORTIX Everyday Cushion Crew Socks (6 Pairs)',
    slug: 'sportix-everyday-cushion-crew-socks-6-pairs',
    subtitle: "Dri-FIT Training Crew Socks",
    description: "Power through your workout with the SPORTIX Everyday Cushion Crew Training Socks. Thick terry sole gives you extra comfort for foot drills and lifts, while ribbed arch band wraps your midfoot for a supportive feel.",
    details: [
      'Dri-FIT technology helps feet stay dry and comfortable',
      'Thick terry sole delivers impact absorption and cushioning',
      'Ribbed arch band offers a snug, supportive feel',
      'Crew silhouette covers your ankle and lower calf'
    ],
    price: 24.00,
    stock: 120,
    categorySlug: 'accessories',
    gender: 'unisex',
    sport: 'training',
    badge: 'Pack of 6',
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    colors: ['White / Black Swoosh', 'Black / White Swoosh'],
    colorway: 'White / Black Swoosh',
    sizes: ['M (US 6-8)', 'L (US 8-12)', 'XL (US 12-15)'],
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-SCK-EVR-6PK',
  },

  // --- . SPORTIX CLUB UNSTRUCTURED SWOOSH CAP ---
  {
    name: 'SPORTIX Club Unstructured Swoosh Cap',
    slug: 'sportix-club-unstructured-swoosh-cap',
    subtitle: "Classic Curved Bill Dad Hat",
    description: "A mid-depth cap with classic style for any occasion, this SPORTIX Club Cap comes in smooth cotton twill with a soft wash for comfort from day one.",
    details: [
      'Soft cotton twill fabric feels comfortable and smooth',
      'Mid-depth 6-panel design is easy to style with any outfit',
      'Tri-glide metal clamp closure with Swoosh design lets you adjust your fit with ease',
      'Embroidered eyelets allow optimal airflow'
    ],
    price: 28.00,
    stock: 75,
    categorySlug: 'accessories',
    gender: 'unisex',
    sport: 'lifestyle',
    badge: 'Popular',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    colors: ['Black / White Swoosh', 'White / Black Swoosh', 'Khaki / Brown'],
    colorway: 'Black / White Swoosh',
    sizes: ['One Size (Adjustable)'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-CAP-CLB-BLK',
  },

  // --- . SPORTIX HYPERCHARGE 32OZ CHUG BOTTLE ---
  {
    name: 'SPORTIX Hypercharge 32oz Chug Bottle',
    slug: 'sportix-hypercharge-32oz-chug-bottle',
    subtitle: "Graphic Stainless Steel Sports Bottle",
    description: "Stay hydrated through two-a-days and marathon training. The SPORTIX 32oz Hypercharge Chug Bottle features an innovative slider button for easy one-handed drinking with vacuum insulation.",
    details: [
      'Double-wall vacuum insulation keeps drinks ice-cold for 24+ hours',
      'Innovative slider button for convenient one-handed opening and closing',
      'Ergonomic soft-touch handle makes carrying effortless',
      'Impact-resistant kitchen-grade stainless steel construction'
    ],
    price: 38.00,
    salePrice: 30.00,
    stock: 80,
    categorySlug: 'accessories',
    gender: 'unisex',
    sport: 'training',
    badge: 'Hydration',
    isFeatured: false,
    isNew: true,
    isBestseller: true,
    colors: ['Matte Black', 'Stainless Silver', 'Volt Yellow'],
    colorway: 'Matte Black',
    sizes: ['32 oz (946 ml)'],
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'SPX-BTL-HYP-32',
  },

  // --- 24. JORDAN RISE STRUCTURED SNAPBACK CAP ---
  {
    name: 'Jordan Rise Structured Snapback Cap',
    slug: 'jordan-rise-structured-snapback-cap',
    subtitle: "High-Crown Basketball Cap",
    description: "Top off your look with Jordan heritage. This structured snapback features high-density embroidered Jumpman branding on a clean, modern silhouette.",
    details: [
      'High-crown design delivers a classic structured look',
      'Woven heavy twill fabric offers lightweight durability',
      'Adjustable snapback closure gives a personalized fit',
      'Thick dimensional 3D Jumpman front embroidery'
    ],
    price: 34.00,
    stock: 50,
    categorySlug: 'flight',
    gender: 'unisex',
    sport: 'basketball',
    badge: 'Flight Edition',
    isFeatured: false,
    isNew: false,
    isBestseller: false,
    colors: ['Black / Gym Red', 'Gym Red / White', 'Obsidian / White'],
    colorway: 'Black / Gym Red',
    sizes: ['One Size (Adjustable)'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
    ],
    sku: 'AIR-JD-CAP-RISE',
  },
];

export const SEED_COUPONS = [
  {
    code: 'APP15',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrder: 50,
    isActive: true,
  },
  {
    code: 'SPORTIX10',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrder: 50,
    isActive: true,
  },
  {
    code: 'SPORTIX20',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrder: 100,
    isActive: true,
  },
  {
    code: 'MEMBER25',
    discountType: 'FIXED',
    discountValue: 25,
    minOrder: 150,
    isActive: true,
  },
];
