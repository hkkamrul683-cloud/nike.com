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
    "name": "Shoes",
    "slug": "shoes",
    "description": "High-performance footwear engineered for speed, endurance, and street style.",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Clothing",
    "slug": "clothing",
    "description": "Engineered sportswear, breathable fabrics, and technical fleece apparel.",
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Jordan",
    "slug": "flight",
    "description": "Iconic basketball high-tops, hardwood heritage, and legendary flight silhouettes.",
    "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Accessories",
    "slug": "accessories",
    "description": "Duffel bags, performance socks, training caps, and high-flow sports bottles.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  }
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    "name": "SPORTIX Air Force 1 '07",
    "slug": "sportix-air-force-1-07",
    "subtitle": "Men's Everyday Shoes",
    "description": "The radiance lives on in the SPORTIX Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold details and the perfect amount of flash to make you shine.",
    "details": [
      "Stitched leather overlays on the upper add heritage style, durability and support",
      "Originally designed for performance hoops, SPORTIX Air cushioning adds lightweight, all-day comfort",
      "Low-cut silhouette adds a clean, streamlined look",
      "Padded collar feels soft and comfortable",
      "Perforations on the toe box for breathability"
    ],
    "price": 115,
    "stock": 75,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Best Seller",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Triple White",
      "Black / White",
      "Sail / Coconut Milk"
    ],
    "colorway": "Triple White",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AF1-07-WHT"
  },
  {
    "name": "Air Jordan 1 Retro High OG",
    "slug": "air-jordan-1-retro-high-og",
    "subtitle": "Men's Basketball Heritage Shoes",
    "description": "Familiar but always fresh, the iconic Air Jordan 1 is remastered for today's sneakerhead culture. Premium leather, comfortable cushioning and classic design details deliver hardwood heritage with modern swagger.",
    "details": [
      "Genuine tumbled leather upper with contrasting Chicago overlays",
      "Encapsulated Air cushion in the heel for lightweight impact protection",
      "Solid rubber cupsole with deep pivot-circle flex grooves",
      "Wings logo stamped on collar and woven SPORTIX Air tongue label"
    ],
    "price": 180,
    "stock": 40,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Member Exclusive",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Chicago Red / Black / Sail",
      "Shadow Grey / White",
      "Royal Blue / Obsidian"
    ],
    "colorway": "Chicago Red / Black / Sail",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 11.5",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1-RET-CHI"
  },
  {
    "name": "SPORTIX Dunk Low Retro",
    "slug": "sportix-dunk-low-retro",
    "subtitle": "Men's Iconic Streetwear Shoes",
    "description": "Created for the hardwood but taken to the streets, the '80s icon returns with crisp overlays and original team colors. With its iconic basketball design, it channels '80s vintage back onto the street.",
    "details": [
      "Crisp leather upper ages to soft perfection and features durable overlays",
      "Foam midsole offers lightweight, responsive cushioning",
      "Padded, low-cut collar looks sleek and feels comfortable",
      "Rubber outsole with classic hoops pivot circle adds durability and heritage grip"
    ],
    "price": 115,
    "salePrice": 95,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Trending",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Black (Panda)",
      "Coast Blue / Sail",
      "Grey Fog / White"
    ],
    "colorway": "White / Black (Panda)",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DNK-LOW-PND"
  },
  {
    "name": "SPORTIX Air Max 90",
    "slug": "sportix-air-max-90",
    "subtitle": "Men's Road Classic Shoes",
    "description": "Nothing as fly, nothing as proven. The SPORTIX Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents on the heel and eyestays. Max Air cushioning adds comfort to your journey.",
    "details": [
      "Originally designed for performance running, Max Air unit in the heel adds unbelievable cushioning",
      "Low-top design combines with padded collar for a sleek look that feels soft and comfortable",
      "Stitched overlays and TPU accents add durability, comfort and the iconic 90s look",
      "Rubber Waffle outsole delivers traction and heritage style"
    ],
    "price": 130,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Heritage",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Infrared / White / Black",
      "Triple Black",
      "Pure Platinum / Wolf Grey"
    ],
    "colorway": "Infrared / White / Black",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AM90-INF-01"
  },
  {
    "name": "SPORTIX Vaporfly 3",
    "slug": "sportix-vaporfly-3",
    "subtitle": "Men's Road Racing Marathon Shoes",
    "description": "Catch 'em if you can. Giving you race-day speed to conquer any distance, the SPORTIX Vaporfly 3 is made for the chasers, the racers and the elevated pacers who can't turn down the thrill of the pursuit.",
    "details": [
      "Full-length carbon fiber Flyplate provides a stiff and propulsive feel",
      "SPORTIX ZoomX foam runs from heel to toe for maximum energy return",
      "Selected Flyknit yarns bring engineered zones of support through the forefoot",
      "Updated thin outsole rubber reduces weight without sacrificing durability"
    ],
    "price": 260,
    "salePrice": 210,
    "stock": 25,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Marathon Elite",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Volt / Fierce Pink / Black",
      "Hyper Royal / White",
      "Triple White"
    ],
    "colorway": "Volt / Fierce Pink / Black",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-VPF3-VLT-02"
  },
  {
    "name": "Air Jordan 4 Retro",
    "slug": "air-jordan-4-retro",
    "subtitle": "Men's Hardwood Classic Shoes",
    "description": "One of the most beloved silhouettes in the sneaker kingdom. The Air Jordan 4 Retro delivers lightweight cushioning with sculpted midsole details and iconic mesh quarter panels for unmatched street presence.",
    "details": [
      "Genuine full-grain leather, synthetic and fabric upper",
      "Visible Air-Sole unit in heel and encapsulated forefoot Air unit",
      "Molded plastic eyestays and heel pull tab",
      "Rubber outsole with modified herringbone traction pattern"
    ],
    "price": 215,
    "stock": 30,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Exclusive Drop",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Military Blue / Neutral Grey",
      "Bred Reimagined",
      "White Cement"
    ],
    "colorway": "Military Blue / Neutral Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD4-RET-BLU"
  },
  {
    "name": "SPORTIX Air Zoom Pegasus 41",
    "slug": "sportix-air-zoom-pegasus-41",
    "subtitle": "Men's Road Running Shoes",
    "description": "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole.",
    "details": [
      "Upgraded breathable engineered mesh upper keeps feet ventilated",
      "ReactX foam midsole surrounds forefoot and heel Air Zoom units",
      "Signature waffle-inspired rubber outsole for grip on pavement",
      "Plush collar, tongue and sockliner provide a secure and comfortable fit"
    ],
    "price": 140,
    "stock": 60,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Best Seller",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "White / Black / Bright Crimson",
      "Triple Black",
      "Glacier Blue / Sail"
    ],
    "colorway": "White / Black / Bright Crimson",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PEG-41-WHT"
  },
  {
    "name": "SPORTIX Metcon 9",
    "slug": "sportix-metcon-9",
    "subtitle": "Men's Workout & Cross-Training Shoes",
    "description": "Whatever your workout demands, the Metcon 9 delivers. Equipped with an enlarged Hyperlift plate and dual-density foam, it is sworn to by elite weightlifters and functional fitness athletes across the globe.",
    "details": [
      "Enlarged Hyperlift plate in the heel provides unshakeable stability under heavy loads",
      "Lace lock system securely clips laces to the tongue so they never untie mid-set",
      "Full-wrap rubber rope guard protects during aggressive rope climbs",
      "Dual-density midsole cushioning cushions box jumps and sprints"
    ],
    "price": 150,
    "salePrice": 127.5,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "training",
    "badge": "Pro Athlete Choice",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Smoke Grey / White / Total Orange",
      "Black / Gum Light Brown"
    ],
    "colorway": "Smoke Grey / White / Total Orange",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-MTC-9-GRY"
  },
  {
    "name": "SPORTIX Mercurial Superfly 9 Elite",
    "slug": "sportix-mercurial-superfly-9-elite",
    "subtitle": "Men's Firm-Ground Football Cleats",
    "description": "Instantly tilt the pitch in the bold design of the Superfly 9 Elite FG. SPORTIX added a football-specific 3/4 Zoom Air unit so you can dominate in the critical moments of a match.",
    "details": [
      "Football-specific 3/4 Zoom Air unit seated directly in the soleplate for explosive propulsion",
      "Vaporposite+ upper combines grippy mesh with premium touch coating for lightning-fast control",
      "Tri-star stud configuration delivers omnidirectional grip for rapid acceleration and cuts",
      "Flyknit dynamic collar wraps the ankle in secure compression"
    ],
    "price": 285,
    "stock": 20,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "Matchday Edition",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Metallic Silver / Volt / Black",
      "Lemon Chiffon / Bright Crimson"
    ],
    "colorway": "Metallic Silver / Volt / Black",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-MRC-SUP9-SLV"
  },
  {
    "name": "Air Jordan 1 Low",
    "slug": "air-jordan-1-low",
    "subtitle": "Men's Low-Top Lifestyle Shoes",
    "description": "Inspired by the 1985 original, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any fit, these kicks ensure you'll always be on point.",
    "details": [
      "Encapsulated Air-Sole unit provides lightweight cushioning",
      "Genuine leather in the upper offers durability and a premium look",
      "Solid rubber outsole enhances traction on a variety of surfaces",
      "Stitched Wings logo on heel and Jumpman on tongue"
    ],
    "price": 115,
    "stock": 55,
    "categorySlug": "flight",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Popular",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White / Gym Red",
      "Triple White",
      "Wolf Grey / Aluminum"
    ],
    "colorway": "Black / White / Gym Red",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1-LOW-BRED"
  },
  {
    "name": "SPORTIX Vomero 5",
    "slug": "sportix-vomero-5",
    "subtitle": "Men's Retro Y2K Running Shoes",
    "description": "Carve a new lane for yourself in the Zoom Vomero 5—your go-to for complexity, depth and easy styling. The richly layered design includes textiles, synthetic suede and plastic accents that come together to make one of the coolest sneakers of the season.",
    "details": [
      "Synthetic leather on the upper adds durability while mesh panels add breathability",
      "Zoom Air cushioning offers a quick-off-the-ground sensation",
      "Plastic cage on the side adds supportive structure",
      "Ventilation ports on the heel keep it airy and comfortable"
    ],
    "price": 160,
    "stock": 40,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Trending",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Photon Dust / Metallic Silver",
      "Oatmeal / Pale Ivory",
      "Triple Black"
    ],
    "colorway": "Photon Dust / Metallic Silver",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-VOM5-SLV-01"
  },
  {
    "name": "SPORTIX Tech Fleece Windrunner",
    "slug": "sportix-tech-fleece-windrunner-hoodie",
    "subtitle": "Men's Full-Zip Technical Hoodie",
    "description": "Blending two of our most iconic looks, this full-zip hoodie draws design inspiration from our timeless Windrunner jacket as well as our signature Tech Fleece jacket. Smooth on both sides, this premium lightweight fleece delivers plenty of warmth without adding bulk.",
    "details": [
      "Premium lightweight thermal fleece is smooth on both sides, delivering warmth without bulk",
      "Signature chevron design lines on the chest nod to the heritage 1978 Windrunner jacket",
      "Zippered sleeve pocket provides quick storage for keys, cards and phone",
      "4-panel articulated hood with high-collar wind coverage"
    ],
    "price": 145,
    "stock": 50,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Iconic Apparel",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Heather Grey / Black",
      "Triple Black",
      "Obsidian Navy"
    ],
    "colorway": "Heather Grey / Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TF-WND-GRY"
  },
  {
    "name": "SPORTIX Tech Fleece Joggers",
    "slug": "sportix-tech-fleece-joggers",
    "subtitle": "Men's Slim-Fit Fleece Pants",
    "description": "Ready for cooler weather, our tailored Tech Fleece joggers feature a slimmer fit that's perfect for everyday wear. Roomy through the thighs, this tapered design narrows at the knee to give you a comfortable feel without losing the clean, tailored look.",
    "details": [
      "Signature taped zippered pocket with interior organizer pocket keeps essentials secure",
      "Elastic waistband with external contrast drawcord allows for a custom fit",
      "Tall ribbed ankle cuffs showcase your favorite sneakers",
      "Lightweight thermal fleece construction"
    ],
    "price": 125,
    "stock": 60,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Best Seller",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Heather Grey",
      "Black",
      "Dark Marina Blue"
    ],
    "colorway": "Heather Grey",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TF-JOG-01"
  },
  {
    "name": "SPORTIX Club Fleece Pullover Hoodie",
    "slug": "sportix-club-fleece-pullover-hoodie",
    "subtitle": "Brushed-Back Fleece Everyday Hoodie",
    "description": "Universally loved for its coziness and consistency, Club Fleece is for everyone. Always soft and made with our standard fit, it's a staple that helps you do more.",
    "details": [
      "Club Fleece is brushed on the interior for added warmth and plush softness",
      "Ribbed hem and cuffs keep warmth locked inside",
      "Front kangaroo pocket offers convenient hand warmth and storage",
      "Embroidered SPORTIX Futura logo on the chest"
    ],
    "price": 65,
    "salePrice": 52,
    "stock": 80,
    "categorySlug": "clothing",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Classic",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "Dark Grey Heather",
      "Club Gold",
      "Gym Red"
    ],
    "colorway": "Black / White",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CLB-FLC-BLK"
  },
  {
    "name": "SPORTIX Dri-FIT Legend Fitness Tee",
    "slug": "sportix-dri-fit-legend-fitness-tee",
    "subtitle": "Men's Performance Training Top",
    "description": "Power through your toughest training sessions in the SPORTIX Dri-FIT Legend T-Shirt. Sweat-wicking technology helps keep you dry and comfortable from warmups to cool-downs.",
    "details": [
      "SPORTIX Dri-FIT technology moves sweat away from your skin for quicker evaporation",
      "Lightweight athletic jersey fabric feels soft against your skin",
      "Standard fit for a relaxed, easy feel",
      "Odor-resistant finish helps fabric stay fresh throughout workouts"
    ],
    "price": 35,
    "stock": 90,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "training",
    "badge": "Training Essential",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black",
      "Obsidian",
      "White",
      "Carbon Heather"
    ],
    "colorway": "Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DF-LEG-TEE"
  },
  {
    "name": "Jordan Essentials Fleece Hoodie",
    "slug": "jordan-essentials-fleece-hoodie",
    "subtitle": "Men's Heavyweight Fleece Pullover",
    "description": "Pull on everyday comfort with the Jordan Essentials Fleece Pullover. Made from heavyweight French terry fabric that's brushed on the inside for softness, it features an embroidered Jumpman patch on the chest.",
    "details": [
      "Heavyweight French terry fleece is brushed on the interior for cozy softness",
      "Spacious hood adjusts with a metal-tipped drawcord",
      "Front kangaroo pocket stores everyday items",
      "Stitched Jumpman patch and tonal Michael Jordan signature embroidery"
    ],
    "price": 85,
    "stock": 45,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Flight Heritage",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Gym Red / Black",
      "Black / White",
      "Sail / Light Bone"
    ],
    "colorway": "Gym Red / Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-ESS-HD-RED"
  },
  {
    "name": "SPORTIX One High-Waisted 7/8 Leggings",
    "slug": "sportix-one-high-waisted-leggings",
    "subtitle": "Women's Squat-Proof Workout Leggings",
    "description": "Ready for a workout or down to chill, the SPORTIX One Leggings are versatile enough for anything. The silky-soft fabric provides squat-proof coverage with all-day confidence.",
    "details": [
      "Non-sheer fabric passes the squat test to keep you reliably covered",
      "Seamless sides and a contoured V-shape waistband give a smooth silhouette",
      "2 hidden pockets in the high-rise waistband keep your phone and cards close",
      "Dri-FIT technology helps you stay dry and comfortable"
    ],
    "price": 65,
    "stock": 70,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Best Seller",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White Swoosh",
      "Midnight Navy",
      "Smoky Mauve"
    ],
    "colorway": "Black / White Swoosh",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ONE-LEG-BLK"
  },
  {
    "name": "SPORTIX Air Max 270 (Kids)",
    "slug": "sportix-air-max-270-kids",
    "subtitle": "Big Kids' Shoes",
    "description": "Boasting SPORTIX's first lifestyle Air unit, the SPORTIX Air Max 270 delivers visible bounce under every step. Updated for modern comfort, it pays homage to the original 1991 Air Max 180.",
    "details": [
      "Large Max Air 270 unit in the heel delivers responsive cushioning",
      "Stretchy inner sleeve creates a snug, sock-like fit",
      "Breathable mesh upper keeps little feet cool",
      "Dual-density foam sole cushions growing feet"
    ],
    "price": 130,
    "salePrice": 104,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "kids",
    "sport": "lifestyle",
    "badge": "Kids Top Pick",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / University Red / White",
      "Triple White",
      "Photo Blue / Black"
    ],
    "colorway": "Black / University Red / White",
    "sizes": [
      "US 3.5Y",
      "US 4Y",
      "US 4.5Y",
      "US 5Y",
      "US 5.5Y",
      "US 6Y",
      "US 6.5Y",
      "US 7Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KID-270-RED"
  },
  {
    "name": "Air Jordan 1 Mid (Kids)",
    "slug": "air-jordan-1-mid-kids",
    "subtitle": "Big Kids' Basketball Shoes",
    "description": "The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look. Its Air-Sole unit cushions play on the hardwood, while the padded collar gives a supportive feel.",
    "details": [
      "Premium genuine leather and synthetic upper for durability and comfort",
      "Air-Sole unit in the heel delivers signature cushioning",
      "Solid rubber outsole provides traction on diverse surfaces",
      "Perforated toe box for active breathability"
    ],
    "price": 110,
    "stock": 40,
    "categorySlug": "flight",
    "gender": "kids",
    "sport": "basketball",
    "badge": "Flight Kids",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Gym Red / White",
      "Ice Blue / White",
      "Shadow Grey"
    ],
    "colorway": "Black / Gym Red / White",
    "sizes": [
      "US 3.5Y",
      "US 4Y",
      "US 4.5Y",
      "US 5Y",
      "US 5.5Y",
      "US 6Y",
      "US 6.5Y",
      "US 7Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1-KID-MID"
  },
  {
    "name": "SPORTIX Brasilia Training Duffel Bag (60L)",
    "slug": "sportix-brasilia-training-duffel-bag-60l",
    "subtitle": "Medium Training Gear Duffel Bag",
    "description": "The spacious and durable SPORTIX Brasilia Duffel Bag keeps all your workout gear at hand. A side compartment stores shoes separately, while inner and outer pockets help you stay organized.",
    "details": [
      "Zippered main compartment secures your training essentials",
      "Zippered inner pocket keeps dirty shoes and sweaty clothes separate",
      "Coated bottom helps shield your gear from bumps, scrapes and spills",
      "Outer pockets keep your must-haves within quick reach"
    ],
    "price": 47,
    "stock": 50,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Gear Essential",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "Midnight Navy / Black",
      "Iron Grey"
    ],
    "colorway": "Black / White",
    "sizes": [
      "Medium (60L)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BAG-BRA-60L"
  },
  {
    "name": "SPORTIX Everyday Cushion Crew Socks (6 Pairs)",
    "slug": "sportix-everyday-cushion-crew-socks-6-pairs",
    "subtitle": "Dri-FIT Training Crew Socks",
    "description": "Power through your workout with the SPORTIX Everyday Cushion Crew Training Socks. Thick terry sole gives you extra comfort for foot drills and lifts, while ribbed arch band wraps your midfoot for a supportive feel.",
    "details": [
      "Dri-FIT technology helps feet stay dry and comfortable",
      "Thick terry sole delivers impact absorption and cushioning",
      "Ribbed arch band offers a snug, supportive feel",
      "Crew silhouette covers your ankle and lower calf"
    ],
    "price": 24,
    "stock": 120,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Pack of 6",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Black Swoosh",
      "Black / White Swoosh"
    ],
    "colorway": "White / Black Swoosh",
    "sizes": [
      "M (US 6-8)",
      "L (US 8-12)",
      "XL (US 12-15)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SCK-EVR-6PK"
  },
  {
    "name": "SPORTIX Club Unstructured Swoosh Cap",
    "slug": "sportix-club-unstructured-swoosh-cap",
    "subtitle": "Classic Curved Bill Dad Hat",
    "description": "A mid-depth cap with classic style for any occasion, this SPORTIX Club Cap comes in smooth cotton twill with a soft wash for comfort from day one.",
    "details": [
      "Soft cotton twill fabric feels comfortable and smooth",
      "Mid-depth 6-panel design is easy to style with any outfit",
      "Tri-glide metal clamp closure with Swoosh design lets you adjust your fit with ease",
      "Embroidered eyelets allow optimal airflow"
    ],
    "price": 28,
    "stock": 75,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Popular",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White Swoosh",
      "White / Black Swoosh",
      "Khaki / Brown"
    ],
    "colorway": "Black / White Swoosh",
    "sizes": [
      "One Size (Adjustable)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CAP-CLB-BLK"
  },
  {
    "name": "SPORTIX Hypercharge 32oz Chug Bottle",
    "slug": "sportix-hypercharge-32oz-chug-bottle",
    "subtitle": "Graphic Stainless Steel Sports Bottle",
    "description": "Stay hydrated through two-a-days and marathon training. The SPORTIX 32oz Hypercharge Chug Bottle features an innovative slider button for easy one-handed drinking with vacuum insulation.",
    "details": [
      "Double-wall vacuum insulation keeps drinks ice-cold for 24+ hours",
      "Innovative slider button for convenient one-handed opening and closing",
      "Ergonomic soft-touch handle makes carrying effortless",
      "Impact-resistant kitchen-grade stainless steel construction"
    ],
    "price": 38,
    "salePrice": 30,
    "stock": 80,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Hydration",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Matte Black",
      "Stainless Silver",
      "Volt Yellow"
    ],
    "colorway": "Matte Black",
    "sizes": [
      "32 oz (946 ml)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BTL-HYP-32"
  },
  {
    "name": "Jordan Rise Structured Snapback Cap",
    "slug": "jordan-rise-structured-snapback-cap",
    "subtitle": "High-Crown Basketball Cap",
    "description": "Top off your look with Jordan heritage. This structured snapback features high-density embroidered Jumpman branding on a clean, modern silhouette.",
    "details": [
      "High-crown design delivers a classic structured look",
      "Woven heavy twill fabric offers lightweight durability",
      "Adjustable snapback closure gives a personalized fit",
      "Thick dimensional 3D Jumpman front embroidery"
    ],
    "price": 34,
    "stock": 50,
    "categorySlug": "flight",
    "gender": "unisex",
    "sport": "basketball",
    "badge": "Flight Edition",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Black / Gym Red",
      "Gym Red / White",
      "Obsidian / White"
    ],
    "colorway": "Black / Gym Red",
    "sizes": [
      "One Size (Adjustable)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-CAP-RISE"
  },
  {
    "name": "SPORTIX Air Infinity Pro",
    "slug": "sportix-air-infinity-pro",
    "subtitle": "Men's Road Racing & Marathon Shoes",
    "description": "The pinnacle of road racing innovation. Designed with dual ZoomAir energy pods and full-length responsive carbon plate technology to propel every stride forward with unrivaled energy return.",
    "details": [
      "Dual ZoomAir pods under the forefoot deliver springy, pressurized rebound",
      "Full-length carbon composite plate stabilizes and provides propulsion",
      "AtomKnit ultra-breathable upper reduces weight and resists moisture",
      "Engineered waffle rubber outsole for targeted marathon traction"
    ],
    "price": 275,
    "salePrice": 220,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Best Seller",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Volt / Black / Phantom",
      "Triple Black",
      "Hyper Crimson / White"
    ],
    "colorway": "Volt / Black / Phantom",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AIR-INF-01"
  },
  {
    "name": "SPORTIX Flight Retro High",
    "slug": "sportix-flight-retro-high",
    "subtitle": "Men's Heritage Basketball Shoes",
    "description": "Honoring four decades of basketball supremacy. Premium full-grain leather, padded collar support, and the unmistakable Flight heel cushion build a timeless court icon.",
    "details": [
      "Genuine tumbled leather upper with contrasting overlays",
      "Encapsulated Air cushion in the heel for lightweight impact protection",
      "Solid rubber cupsole with deep pivot-circle flex grooves",
      "Perforated toe box for constant airflow during active play"
    ],
    "price": 185,
    "stock": 32,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Member Exclusive",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Chicago Red / Black / Sail",
      "Shadow Grey / White",
      "Royal Blue / Obsidian"
    ],
    "colorway": "Chicago Red / Black / Sail",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 11.5",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FLT-RET-02"
  },
  {
    "name": "SPORTIX Zoom Strike Elite",
    "slug": "sportix-zoom-strike-elite",
    "subtitle": "Men's Firm-Ground Football Cleats",
    "description": "Built for lethal speed and razor-sharp cuts. Vaporposite+ upper clings to your foot while an articulated chevron stud chassis digs deep into natural turf.",
    "details": [
      "Vaporposite+ grippy grid mesh maximizes ball control at high speeds",
      "Three-quarter length Zoom Air unit seated directly in the turf plate",
      "Tri-star studs provide multidirectional traction for explosive cuts",
      "Flyknit dynamic collar wraps the ankle with secure compression"
    ],
    "price": 260,
    "stock": 28,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "New Arrival",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Metallic Silver / Volt / Black",
      "Crimson Burst / Gold"
    ],
    "colorway": "Metallic Silver / Volt / Black",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ZOM-STR-03"
  },
  {
    "name": "SPORTIX Metatrack Cross 9",
    "slug": "sportix-metatrack-cross-9",
    "subtitle": "Men's High-Intensity Workout & Gym Shoes",
    "description": "The gold standard in strength conditioning and functional training. Larger Hyperlift heel plate guarantees total stability during squats, cleans, and sled pushes.",
    "details": [
      "Extended Hyperlift heel plate provides rigid stability under heavy loads",
      "Extended rubber wrap on the lateral side protects against rope climbs",
      "Firm foam heel with springy forefoot cushion for burpees and box jumps",
      "Textured haptic print over mesh shields high-wear zones"
    ],
    "price": 150,
    "salePrice": 129.99,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "training",
    "badge": "Popular",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Onyx Black / Smoke Grey",
      "Deep Forest / White"
    ],
    "colorway": "Onyx Black / Smoke Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-MET-CRS-04"
  },
  {
    "name": "SPORTIX Air Max Pulse 90",
    "slug": "sportix-air-max-pulse-90",
    "subtitle": "Men's Streetwear Lifestyle Sneaker",
    "description": "Nothing as fly, nothing as proven. The legendary silhouette updated with modern point-loaded Air chambers and stitched synthetic leather mudguards.",
    "details": [
      "Visible MaxAir heel unit delivers legendary comfort with bold attitude",
      "Stitched overlays and TPU accents retain authentic 90s street DNA",
      "Padded low-cut collar looks sleek and feels incredibly soft",
      "Rubber Waffle outsole delivers heritage styling with durable traction"
    ],
    "price": 140,
    "stock": 60,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Particle Grey / Black",
      "All White",
      "Triple Black"
    ],
    "colorway": "White / Particle Grey / Black",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AIR-PLS-05"
  },
  {
    "name": "SPORTIX Dunk Low Heritage",
    "slug": "sportix-dunk-low-heritage",
    "subtitle": "Unisex Street & Skate Sneaker",
    "description": "Created for the hardwood but adopted by subcultures worldwide. Crisply color-blocked leather panels and vintage proportions make it an essential everyday rotation piece.",
    "details": [
      "Crisp leather upper softens and gains vintage character with wear",
      "Foam midsole offers lightweight, responsive all-day cushioning",
      "Low-cut, padded collar looks sleek and feels comfortable",
      "Rubber circle pivot traction pattern delivers durable grip"
    ],
    "price": 115,
    "stock": 40,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Trending",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Panda Black & White",
      "Vintage Green / Sail",
      "Industrial Blue"
    ],
    "colorway": "Panda Black & White",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DNK-LOW-06"
  },
  {
    "name": "SPORTIX Invincible Cushion 3",
    "slug": "sportix-invincible-cushion-3",
    "subtitle": "Women's Maximum Cushion Road Running Shoes",
    "description": "Maximum shock absorption for long easy miles. Generous stack of high-rebound ZoomX foam keeps your legs fresh mile after mile with pillow-soft landings.",
    "details": [
      "Super-thick stack of ZoomX foam dampens harsh ground impacts",
      "Wider base geometry enhances stability on tired foot strikes",
      "Engineered Flyknit upper places breathability zones where feet heat up",
      "Rubber outsole tuned for road durability in wet or dry conditions"
    ],
    "price": 190,
    "salePrice": 159,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "running",
    "badge": "Staff Pick",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Soft Pink / Sail / Guava",
      "Triple White",
      "Lavender Frost"
    ],
    "colorway": "Soft Pink / Sail / Guava",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-INV-CSH-07"
  },
  {
    "name": "SPORTIX Flight Court Elevate",
    "slug": "sportix-flight-court-elevate",
    "subtitle": "Women's High-Top Basketball Shoes",
    "description": "Engineered specifically for explosive transitions on the hardwood. High-cut padded ankle brace and decoupled forefoot plate enable rapid crossover acceleration.",
    "details": [
      "Dynamic lockdown lacing wraps around the midfoot cage",
      "Decoupled forefoot plate enables natural foot flexion and fast cuts",
      "Dual-density midsole absorbs heavy rebound landings cleanly",
      "Herringbone traction pattern grips dusty indoor floors"
    ],
    "price": 165,
    "stock": 25,
    "categorySlug": "flight",
    "gender": "women",
    "sport": "basketball",
    "badge": "New",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Crimson / Pure White / Gold",
      "Obsidian / Lilac"
    ],
    "colorway": "Crimson / Pure White / Gold",
    "sizes": [
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10"
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FLT-CRT-08"
  },
  {
    "name": "SPORTIX Free Flex Barefoot 5.0",
    "slug": "sportix-free-flex-barefoot-50",
    "subtitle": "Women's Natural Movement Training Shoes",
    "description": "Laser-cut flex grooves in the sole mimic natural barefoot motion while an ultralight mesh upper provides socks-like glove fit for gym and pilates workouts.",
    "details": [
      "Laser-siped groove pattern delivers 360-degree natural foot flex",
      "Seamless bootie construction hugs the foot without hot spots",
      "Minimal 4mm heel-to-toe drop encourages midfoot landing posture",
      "Reinforced toe bumper for floor exercises and planks"
    ],
    "price": 110,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "training",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Plum Fog / Rose Gold",
      "Pure Black / White"
    ],
    "colorway": "Plum Fog / Rose Gold",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9"
    ],
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FRE-FLX-09"
  },
  {
    "name": "SPORTIX Tech Knit Windrunner Jacket",
    "slug": "sportix-tech-knit-windrunner-jacket",
    "subtitle": "Men's Full-Zip Technical Track Jacket",
    "description": "Lightweight weather-resistant woven shell combined with breathable vent flaps across the back. Iconic 26-degree chevron design pays homage to heritage track style.",
    "details": [
      "Water-repellent finish shields light rain and drizzle",
      "Back chevron vent increases breathability during high cardio",
      "Zippered hand pockets store phone, keys, and cards securely",
      "Scuba hood zips all the way up to the chin for wind protection"
    ],
    "price": 120,
    "stock": 50,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "Best Seller",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / Charcoal Grey",
      "Volt Glow / Black"
    ],
    "colorway": "Black / Charcoal Grey",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TCH-WND-11"
  },
  {
    "name": "SPORTIX Dri-FIT Pro Training Tee",
    "slug": "sportix-dri-fit-pro-training-tee",
    "subtitle": "Men's Short-Sleeve Athletic Training Top",
    "description": "High-performance micro-mesh construction pulls sweat away from skin for rapid evaporation. Raglan flatlock seams eliminate chafing during heavy bench presses.",
    "details": [
      "Dri-FIT moisture dispersion technology keeps you dry and light",
      "Underarm mesh gussets ensure unrestricted shoulder range of motion",
      "Flatlock ergonomic stitching prevents workout skin chafing",
      "Extended back hem offers confident coverage when bending and lifting"
    ],
    "price": 38,
    "stock": 120,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "training",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Matte Black",
      "Iron Grey",
      "Gym Red",
      "Hyper Royal"
    ],
    "colorway": "Matte Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DRI-TEE-12"
  },
  {
    "name": "SPORTIX Challenger 7\" Running Shorts",
    "slug": "sportix-challenger-7-running-shorts",
    "subtitle": "Men's 7\" Lined Athletic Running Shorts",
    "description": "Versatile performance shorts designed for runs, gym sessions, and yoga. Built-in moisture-wicking brief liner provides support without bunching.",
    "details": [
      "Lightweight 4-way stretch recycled poly fabric",
      "Internal liner brief feels soft and supportive",
      "Center-back snap pocket securely accommodates smartphones",
      "Reflective SPORTIX logo enhances low-light evening visibility"
    ],
    "price": 45,
    "stock": 90,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Onyx Black",
      "Slate Navy",
      "Army Olive"
    ],
    "colorway": "Onyx Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CHL-SRT-13"
  },
  {
    "name": "SPORTIX Flight Warmup Tearaway Pants",
    "slug": "sportix-flight-warmup-tearaway-pants",
    "subtitle": "Men's Heritage Basketball Pants",
    "description": "Throw it back to 90s pre-game tunnel walks. Full snap-button side seams allow instant tearaway before tip-off, cut from crisp windbreaker nylon.",
    "details": [
      "Side snap plackets from waist to ankle for rapid warm-up removal",
      "Water-resistant crisp crinkle nylon exterior with mesh lining",
      "Elastic waistband with internal drawcord secures the fit",
      "Embroidered Flight heritage script logo down the left calf"
    ],
    "price": 95,
    "salePrice": 79,
    "stock": 35,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Retro",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Red Accent",
      "Sail / Midnight Navy"
    ],
    "colorway": "Black / Red Accent",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FLT-TRW-14"
  },
  {
    "name": "SPORTIX AeroSwift High-Support Sports Bra",
    "slug": "sportix-aeroswift-high-support-sports-bra",
    "subtitle": "Women's Padded High-Impact Sports Bra",
    "description": "Designed for running, basketball, and HIIT workouts. Molded cups tame bounce while laser-perforated straps channel heat away from the upper back.",
    "details": [
      "Molded compression cups control vertical and horizontal bounce",
      "Wide racerback design frees shoulder blades for full rotation",
      "Smooth bottom chest band prevents chafing and rolling up",
      "Breathable mesh front window allows focused evaporative cooling"
    ],
    "price": 65,
    "stock": 65,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Best Seller",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Onyx Black",
      "Coral Blaze",
      "White Summit"
    ],
    "colorway": "Onyx Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AER-BRA-15"
  },
  {
    "name": "SPORTIX One High-Waisted 7/8 Leggings",
    "slug": "sportix-one-high-waisted-7-8-leggings",
    "subtitle": "Women's Squat-Proof Workout Tight Leggings",
    "description": "Buttery-soft, non-sheer compression fabric passed every gym squat test. High-rise waistband sculpts core support and features two concealed drop-in side pockets.",
    "details": [
      "Ultra-dense non-sheer knit passes full squat opacity tests",
      "Seamless sides offer smooth lines and frictionless movement",
      "Two large side thigh pockets comfortably hold any modern smartphone",
      "V-shaped back yoke flatters your natural athletic silhouette"
    ],
    "price": 85,
    "salePrice": 68,
    "stock": 75,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Member Pick",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Midnight Black",
      "Smoky Mauve",
      "Deep Teal"
    ],
    "colorway": "Midnight Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ONE-LEG-16"
  },
  {
    "name": "SPORTIX Oversized Essential Crewneck",
    "slug": "sportix-oversized-essential-crewneck",
    "subtitle": "Women's Relaxed Fit Fleece Sweatshirt",
    "description": "Cozy volume meets streetwear style. Dropped shoulders, extra room through the sleeves, and heavy brushed fleece turn this into an instant rest-day favorite.",
    "details": [
      "Roomy dropped-shoulder drape gives a relaxed, casual aesthetic",
      "Heavyweight 360gsm cotton-poly fleece feels lush and warm",
      "Elongated ribbing on cuffs and hem gives structured definition",
      "Tonal minimalist SPORTIX chest embroidery for understated luxury"
    ],
    "price": 75,
    "stock": 55,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "lifestyle",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Oatmeal Heather",
      "Vintage Sage",
      "Deep Black"
    ],
    "colorway": "Oatmeal Heather",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "images": [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-OVR-CRW-17"
  },
  {
    "name": "SPORTIX Junior Air Flex Runner",
    "slug": "sportix-junior-air-flex-runner",
    "subtitle": "Kids' Grade School Running Shoes",
    "description": "Built for recess, gym class, and everyday adventures. Durable reinforced toe tips resist scuffing while an easy-entry elastic heel collar slips on in seconds.",
    "details": [
      "Reinforced synthetic toe cap resists schoolyard scuffs and drag",
      "Flexible foam sole incorporates deep natural grooves",
      "Stretchy slip-on collar with pull tabs for easy independent dressing",
      "Breathable mesh keeps active young feet cool and dry all day"
    ],
    "price": 68,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "kids",
    "sport": "running",
    "badge": "Back to School",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Electric Volt / Royal Blue",
      "Triple Black",
      "Hyper Pink / White"
    ],
    "colorway": "Electric Volt / Royal Blue",
    "sizes": [
      "1Y",
      "2Y",
      "3Y",
      "4Y",
      "5Y",
      "6Y",
      "7Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KID-RUN-18"
  },
  {
    "name": "SPORTIX Flight Youth Edition",
    "slug": "sportix-flight-youth-edition",
    "subtitle": "Kids' Grade School Basketball High-Tops",
    "description": "Court confidence for young hoopers. Cushioned collar pads support rapid pivots while iconic Flight styling turns heads on and off the school basketball court.",
    "details": [
      "High-top padded collar hugs ankles securely during jump stops",
      "Tough non-marking rubber outsole protects indoor hardwood gyms",
      "Traditional lacing with lock-down midfoot eyelets",
      "Signature contrast Flight side wings and embossed heel branding"
    ],
    "price": 88,
    "salePrice": 72,
    "stock": 30,
    "categorySlug": "flight",
    "gender": "kids",
    "sport": "basketball",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Varsity Red / White / Black",
      "Cool Grey / Ice Blue"
    ],
    "colorway": "Varsity Red / White / Black",
    "sizes": [
      "2Y",
      "3Y",
      "4Y",
      "5Y",
      "6Y",
      "7Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KID-FLT-19"
  },
  {
    "name": "SPORTIX Pro Duffel Bag 60L",
    "slug": "sportix-pro-duffel-bag-60l",
    "subtitle": "Training Gym & Travel Duffel (60 Liters)",
    "description": "Built to haul everything. Features an exterior ventilated shoe compartment that keeps sweaty cleats separate from clean clothes, plus waterproof coated base panels.",
    "details": [
      "Separate zippered bottom shoe tunnel isolates dirty footwear",
      "Dense 600D water-repellent polyester protects gear from wet ground",
      "Padded removable shoulder strap adjusts comfortably across the chest",
      "Dual external mesh bottle sleeves and fleece-lined media pocket"
    ],
    "price": 55,
    "stock": 70,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Essential",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Stealth Black",
      "Charcoal Camo",
      "Navy Obsidian"
    ],
    "colorway": "Stealth Black",
    "sizes": [
      "One Size (60L)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DUF-60L-20"
  },
  {
    "name": "SPORTIX Elite Crew Cushion Socks (3-Pack)",
    "slug": "sportix-elite-crew-cushion-socks-3-pack",
    "subtitle": "High-Performance Ribbed Athletic Crew Socks",
    "description": "Targeted cushioning under the heel and ball of the foot mitigates court shock while arch compression bands keep socks firmly locked in place without slipping down.",
    "details": [
      "Arch band contours around the midfoot for a snug, secure fit",
      "Dri-FIT yarns pull perspiration away for dry, fresh comfort",
      "Zonal high-density padding softens repetitive landing impact",
      "Reinforced heel and toe increase lifespan through seasons of play"
    ],
    "price": 24,
    "stock": 150,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "basketball",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White (3-Pack)",
      "Black (3-Pack)",
      "Multi (White/Black/Grey)"
    ],
    "colorway": "White (3-Pack)",
    "sizes": [
      "S (4-6)",
      "M (6-8)",
      "L (8-12)",
      "XL (12-15)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SCK-ELT-21"
  },
  {
    "name": "SPORTIX AeroBill Featherlight Running Cap",
    "slug": "sportix-aerobill-featherlight-running-cap",
    "subtitle": "Breathable Laser-Vented Athletic Hat",
    "description": "Engineered for blinding midday sun. Featherlight recycled poly fabric combines with laser-perforated side vents and a dark underbill that minimizes glare.",
    "details": [
      "AeroBill technology combines sweat-wicking breathability with comfort",
      "Dark underbill blocks harsh sunlight glare from reflecting into eyes",
      "Laser perforations along crown panels accelerate evaporative cooling",
      "Rear hook-and-loop strap offers quick one-handed sizing adjustments"
    ],
    "price": 32,
    "stock": 80,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "running",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Onyx Black",
      "Pure White",
      "Volt Lime"
    ],
    "colorway": "Onyx Black",
    "sizes": [
      "One Size (Adjustable)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CAP-AER-22"
  },
  {
    "name": "SPORTIX HyperCharge Insulated Steel Bottle 32oz",
    "slug": "sportix-hypercharge-insulated-steel-bottle-32oz",
    "subtitle": "Double-Wall Vacuum Insulated Sports Bottle",
    "description": "Keeps drinks icy cold for 24+ hours of grueling training. Ergonomic quick-sip chug spout delivers high-volume hydration with a leak-proof twist lock.",
    "details": [
      "Double-wall vacuum insulation prevents condensation and locks in cold",
      "Durable 18/8 kitchen-grade pro stainless steel will not retain flavors",
      "Fast-flow wide chug spout enables rapid replenishment between drills",
      "Soft-touch silicone carry loop clips effortlessly to gym bags"
    ],
    "price": 38,
    "salePrice": 30,
    "stock": 100,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Popular",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Matte Black",
      "Stainless Silver",
      "Volt Yellow"
    ],
    "colorway": "Matte Black",
    "sizes": [
      "32 oz (946 ml)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BTL-HYP-23"
  },
  {
    "name": "SPORTIX Flight Heritage Snapback Cap",
    "slug": "sportix-flight-heritage-snapback-cap",
    "subtitle": "Classic 6-Panel Basketball Cap",
    "description": "High-crown structured snapback crafted from premium heavy wool-blend twill with dimensional raised 3D Flight crest embroidery.",
    "details": [
      "Structured 6-panel silhouette with flat bill visor",
      "High-density 3D Flight embroidery on front crown",
      "Adjustable snapback closure for customized fit",
      "Embroidered eyelets for breathability"
    ],
    "price": 36,
    "stock": 60,
    "categorySlug": "flight",
    "gender": "unisex",
    "sport": "basketball",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Black / Red Flight",
      "Gym Red / Black",
      "Vintage Grey"
    ],
    "colorway": "Black / Red Flight",
    "sizes": [
      "One Size (Adjustable)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FLT-CAP-24"
  },
  {
    "name": "SPORTIX Pegasus Trail 5",
    "slug": "sportix-pegasus-trail-5",
    "subtitle": "Men's Waterproof Trail Running Shoes",
    "description": "Spread your wings and conquer muddy tracks and rocky ascents. The SPORTIX Pegasus Trail 5 features ultra-responsive ReactX foam, GORE-TEX waterproof protection, and an all-terrain generative traction outsole.",
    "details": [
      "Waterproof GORE-TEX upper keeps feet dry without sacrificing breathability",
      "ReactX foam midsole delivers 13% more energy return compared to previous React technology",
      "All-terrain rubber outsole with generative lug pattern wraps up the toe for enhanced durability",
      "Gaiter collar stops dirt, debris, and gravel from entering the shoe",
      "Reflective accents for visibility in low-light dawn and dusk runs"
    ],
    "price": 150,
    "salePrice": 129.99,
    "stock": 55,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Trail Edition",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Khaki / Olive Flak / Safety Orange",
      "Triple Black",
      "Cool Grey / Laser Orange"
    ],
    "colorway": "Khaki / Olive Flak / Safety Orange",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PEG-TR5-KHK"
  },
  {
    "name": "SPORTIX Alphafly 3 Premium",
    "slug": "sportix-alphafly-3-premium",
    "subtitle": "Men's Elite Marathon Racing Shoes",
    "description": "Fine-tuned for marathon speed beyond what you thought possible. Dual Zoom Air pods, full-length carbon Flyplate, and continuous ZoomX foam propulsion make this the pinnacle of race-day engineering.",
    "details": [
      "Dual forefoot Zoom Air pods return unprecedented energy with every foot strike",
      "Full-length carbon-fiber Flyplate delivers stiff, forward-propelling momentum",
      "ZoomX foam from heel to toe ensures featherlight impact absorption over 26.2 miles",
      "Atomknit 3.0 upper offers ultra-breathable lockdown and minimized water absorption",
      "Integrated knit tongue with lofted padding relieves lace pressure on the midfoot"
    ],
    "price": 285,
    "stock": 22,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Marathon Elite",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Volt / Proto White / Laser Orange",
      "Total Orange / Black",
      "Triple White"
    ],
    "colorway": "Volt / Proto White / Laser Orange",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ALP3-VLT-01"
  },
  {
    "name": "SPORTIX Invincible Run 3 Flyknit",
    "slug": "sportix-invincible-run-3-flyknit",
    "subtitle": "Men's Max Cushion Everyday Running Shoes",
    "description": "Maximum cushioning to support every mile. The Invincible 3 gives you our highest level of comfort underfoot to help you stay on your feet today, tomorrow and beyond with ultra-responsive ZoomX foam.",
    "details": [
      "Massive stack of ZoomX foam provides the softest, springiest ride possible",
      "Evolved Flyknit upper places zones of breathability where your foot heats up most",
      "Wider midsole provides reassuring stability for long recovery miles",
      "Waffle outsole inspired by our track heritage delivers durable traction"
    ],
    "price": 190,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Max Cushion",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "White / Pure Platinum / Cyber Yellow",
      "Triple Black",
      "Thunder Blue / Volt"
    ],
    "colorway": "White / Pure Platinum / Cyber Yellow",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-INV3-WHT-99"
  },
  {
    "name": "SPORTIX Zoom Fly 5",
    "slug": "sportix-zoom-fly-5",
    "subtitle": "Men's Propulsive Road Racing Shoes",
    "description": "Bridge the gap between your weekend training run and race day in a durable design that can be deployed at the start line of your favorite race and in the days after your triumph.",
    "details": [
      "Full-length articulated carbon plate delivers a propulsive sensation and smooth transition",
      "Newly added ZoomX foam in the footbed takes an already trusted shoe to another performance level",
      "Both the forefoot and heel offer slightly wider bases for a stable platform",
      "Lightweight mesh upper offers a softer, more breathable feel that contours to your foot"
    ],
    "price": 170,
    "salePrice": 145,
    "stock": 38,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Fast Tempo",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Total Orange / Barely Green / Black",
      "Black / White",
      "Hyper Royal / Volt"
    ],
    "colorway": "Total Orange / Barely Green / Black",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ZF5-ORG-03"
  },
  {
    "name": "SPORTIX Structure 25",
    "slug": "sportix-structure-25",
    "subtitle": "Women's Supportive Road Running Shoes",
    "description": "Stability where you need it, cushion where you want it. The Structure 25 gives you stability for long miles, short training runs, and even an easy shakeout before the day is done.",
    "details": [
      "Cushlon 3.0 foam provides soft cushioning and support underfoot",
      "Molded heel cup locks your rearfoot in securely",
      "Engineered mesh upper features targeted zones of breathability and lockdown support",
      "Blown rubber outsole with flex grooves accommodates natural foot biomechanics"
    ],
    "price": 140,
    "stock": 40,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "running",
    "badge": "Stability",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Platinum Violet / White / Guava Ice",
      "Triple Black",
      "Pearl Pink"
    ],
    "colorway": "Platinum Violet / White / Guava Ice",
    "sizes": [
      "US 5.5",
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-STR25-W-PLT"
  },
  {
    "name": "SPORTIX Winflo 10",
    "slug": "sportix-winflo-10",
    "subtitle": "Men's Versatile Daily Running Shoes",
    "description": "A balanced ride to help kick-start your run. Whether you're a creature of habit logging your weekly mileage, a rookie hoping to turn intrigue into routine, or just joining a friend for a spontaneous run, the Winflo 10 is dialed in.",
    "details": [
      "Full-length SPORTIX Air cushioning gives you a soft, comfortable feel for your miles",
      "Engineered mesh upper is stronger and more flexible than regular mesh",
      "Overlays at the toe add an extra layer of durability",
      "Tongue is connected to the upper inner lining for a secure lockdown"
    ],
    "price": 105,
    "salePrice": 89,
    "stock": 60,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Best Value",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White / Anthracite",
      "Pure Platinum / Racer Blue"
    ],
    "colorway": "Black / White / Anthracite",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-WIN10-BLK-04"
  },
  {
    "name": "SPORTIX Revolution 7",
    "slug": "sportix-revolution-7",
    "subtitle": "Women's Comfortable Road Running Shoes",
    "description": "We loaded the Revolution 7 with the sort of soft cushioning and support that might change your running world. Stylish as ever, comfortable when the rubber meets the road, and performance-driven for your pace.",
    "details": [
      "Foam midsole delivers a soft, smooth ride with ample shock absorption",
      "Touch points at the heel and tongue create a natural feel as you take the shoes on and off",
      "Outsole sports a generative traction pattern combined with rubber lugs for dependable grip",
      "Made with at least 20% recycled material by weight"
    ],
    "price": 70,
    "stock": 70,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "running",
    "badge": "Essential",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Summit White / Metallic Silver / Pink Foam",
      "Triple Black",
      "Glacier Blue"
    ],
    "colorway": "Summit White / Metallic Silver / Pink Foam",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-REV7-W-WHT"
  },
  {
    "name": "SPORTIX Terra Kiger 9",
    "slug": "sportix-terra-kiger-9",
    "subtitle": "Men's Low-Profile Fast Trail Shoes",
    "description": "When the trail gets rocky and technical, go with the comfort and speed of the Terra Kiger 9. Equipped with full-length React foam and an updated engineered upper, this agile speedster keeps you moving over loose switchbacks.",
    "details": [
      "SPORTIX React technology is a lightweight, durable foam that delivers a responsive ride",
      "Multi-directional traction lugs in the heel have high-abrasion rubber for enhanced grip on descents",
      "Rock plate at the forefoot helps shield your foot on rough terrain",
      "Padded collar provides soft comfort and a streamlined athletic look"
    ],
    "price": 160,
    "stock": 34,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Off-Road",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Deep Royal Blue / Safety Orange / Volt",
      "Earth Brown / Cargo Khaki"
    ],
    "colorway": "Deep Royal Blue / Safety Orange / Volt",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KIG9-BLU-05"
  },
  {
    "name": "SPORTIX Downshifter 13",
    "slug": "sportix-downshifter-13",
    "subtitle": "Men's Road Running & Walking Shoes",
    "description": "Whether you're starting your fitness journey or an experienced runner eager to step up your pace, the Downshifter 13 is ready for the ride. With a revamped upper, comfortable cushioning, and durable construction, it finds that extra gear.",
    "details": [
      "Updated internal fit band offers lockdown around the midfoot for support and security",
      "Supple recycled foam underfoot provides an elevated, smooth ride",
      "Durable rubber outsole contains 13% SPORTIX Grind material",
      "Comfort tongue padding eliminates lace bite over long walks and runs"
    ],
    "price": 75,
    "salePrice": 62,
    "stock": 80,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "running",
    "badge": "Everyday",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White / Smoke Grey",
      "Midnight Navy / White",
      "Pure Platinum"
    ],
    "colorway": "Black / White / Smoke Grey",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DS13-BLK-06"
  },
  {
    "name": "SPORTIX Vomero 17",
    "slug": "sportix-vomero-17",
    "subtitle": "Women's Premium Plush Road Running Shoes",
    "description": "Springy and soft, the Vomero 17 serves up an energizing ride that brings delight to every single mile. Its dual-density foam setup pairs premium ZoomX with Cushlon 3.0 for unprecedented underfoot indulgence.",
    "details": [
      "Dual-foam construction stacks ultra-lightweight ZoomX atop responsive Cushlon 3.0",
      "Engineered mesh upper offers lightweight breathability and a plush step-in sensation",
      "Redesigned waffle-inspired outsole with decoupled flex grooves for seamless heel-to-toe transition",
      "Padded collar and pillowy tongue wrap the ankle in plush support"
    ],
    "price": 165,
    "stock": 42,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "running",
    "badge": "Super Plush",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Sail / Pale Ivory / Guava Ice",
      "Triple Black",
      "Light Bone / Coral Chalk"
    ],
    "colorway": "Sail / Pale Ivory / Guava Ice",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-VOM17-W-SAL"
  },
  {
    "name": "SPORTIX ZoomX Streakfly",
    "slug": "sportix-zoomx-streakfly",
    "subtitle": "Unisex 5K/10K Road Racing Shoes",
    "description": "Our lightest racing shoe, the SPORTIX ZoomX Streakfly is all about the speed you need to take on the competition in a 5K, 10K, or mile race. Low profile with sleek details, it feels like it disappears on your foot.",
    "details": [
      "Full-length ZoomX midsole provides ultimate lightweight responsiveness without excess weight",
      "Pebax midfoot shank provides rigidity for energy transfer through every stride",
      "Ultra-thin knit upper is light in weight but provides the support you need for aggressive road racing",
      "Generative traction pattern on the outsole focuses on where the foot hits the pavement"
    ],
    "price": 170,
    "stock": 25,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "running",
    "badge": "Lightweight Racer",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Laser Orange / Hyper Pink / Volt",
      "White / Flash Crimson"
    ],
    "colorway": "Laser Orange / Hyper Pink / Volt",
    "sizes": [
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-STRK-ORG-07"
  },
  {
    "name": "SPORTIX InfinityRN 4 Flyknit",
    "slug": "sportix-infinityrn-4-flyknit",
    "subtitle": "Women's Supportive Soft Running Shoes",
    "description": "With supportive cushioning built for a smooth run, the InfinityRN 4 helps you hit the ground running with ReactX foam that gives you 13% more energy return compared to React foam.",
    "details": [
      "ReactX foam reduces carbon footprint of the midsole by at least 43% compared to prior foam",
      "Water-repellent Flyknit liner helps keep toes dry when the weather turns misty",
      "Curved rocker outsole helps your foot rock smoothly through each phase of your stride",
      "Generous padding around the heel collar for a plush, locked-in sensation"
    ],
    "price": 160,
    "salePrice": 135,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "running",
    "badge": "ReactX Foam",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Violet Mist / Barely Volt / White",
      "Triple Black",
      "Platinum Tint"
    ],
    "colorway": "Violet Mist / Barely Volt / White",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-INF4-W-VIO"
  },
  {
    "name": "SPORTIX Flex Runner 2 (Kids)",
    "slug": "sportix-flex-runner-2-kids",
    "subtitle": "Kids' Slip-On Active Running Shoes",
    "description": "Who's ready to play? The SPORTIX Flex Runner 2 is made for the kid on the go who loves to run, jump, and play all day. With no laces, it means it's super quick to slip on and off.",
    "details": [
      "A stretchy bootie design makes it easy to slip little feet in with a snug, secure feel",
      "Midfoot strap, heel strap, and leather on the sides stabilize the fit",
      "Flexible foam sole is designed with grooves so every step feels natural",
      "Reinforced toe tip adds durability for toe draggers"
    ],
    "price": 48,
    "stock": 65,
    "categorySlug": "shoes",
    "gender": "kids",
    "sport": "running",
    "badge": "Easy On/Off",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Game Royal / University Red / White",
      "Black / White",
      "Pink Foam / White"
    ],
    "colorway": "Game Royal / University Red / White",
    "sizes": [
      "US 1Y",
      "US 1.5Y",
      "US 2Y",
      "US 2.5Y",
      "US 3Y",
      "US 3.5Y",
      "US 4Y",
      "US 5Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FLX2-K-ROY"
  },
  {
    "name": "SPORTIX G.T. Cut 3",
    "slug": "sportix-gt-cut-3",
    "subtitle": "Men's Low Basketball Shoes",
    "description": "Create separation on a dime. The G.T. Cut 3 is built for explosive cuts, sudden stops, and shiftiness on hardwood with our first-ever ZoomX foam implementation in a basketball sneaker.",
    "details": [
      "Full-length ZoomX foam adds spring without overloading the scale for rapid first steps",
      "Modified herringbone traction pattern gives stickiness for lateral slides and hard stops",
      "Flywire cables integrate with laces for locked-in containment through harsh crossovers",
      "Low-profile collar encourages free range of ankle motion"
    ],
    "price": 190,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "basketball",
    "badge": "Court Agility",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Summit White / Picante Red / Football Grey",
      "Triple Black",
      "Ashen Slate"
    ],
    "colorway": "Summit White / Picante Red / Football Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-GTC3-RED-08"
  },
  {
    "name": "SPORTIX LeBron XXI",
    "slug": "sportix-lebron-xxi",
    "subtitle": "Men's Championship Basketball Shoes",
    "description": "Engineered for king-sized power and unmatched agility. The LeBron XXI features a 360-degree zonal cabling system with bottom-loaded heel Zoom Air and top-loaded forefoot Zoom Turbo for maximum explosiveness.",
    "details": [
      "Top-loaded Zoom Turbo unit in forefoot combined with 13mm heel Zoom Air unit",
      "Lightweight dimensional mesh reinforced by a 360-degree zonal wiring containment system",
      "Carbon-fiber midfoot shank keeps you stabilized during powerful drives to the rim",
      "Luxe oyster-shell inspired embroidery and iridescent finish"
    ],
    "price": 200,
    "salePrice": 175,
    "stock": 30,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "basketball",
    "badge": "King Edition",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Tahitian Pearl / Black / Metallic Gold",
      "Queen Conch / Orange",
      "Aragonite"
    ],
    "colorway": "Tahitian Pearl / Black / Metallic Gold",
    "sizes": [
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 11.5",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-LB21-GLD-09"
  },
  {
    "name": "SPORTIX KD16",
    "slug": "sportix-kd16",
    "subtitle": "Men's Precision Scoring Basketball Shoes",
    "description": "KD is a hooper through and through. The KD16 combines lightweight SPORTIX Air cushioning with a bottom-loaded Zoom Air unit for high-speed scoring efficiency and effortless transitions.",
    "details": [
      "Lightweight SPORTIX Air cushioning in heel absorbs impact on every landing",
      "Forefoot Zoom Air provides pop when launching pull-up jumpers",
      "Midfoot TPU cage provides torsional rigidity and lateral containment",
      "Multi-gear tread pattern grips hardwood for razor-sharp pivots"
    ],
    "price": 160,
    "stock": 28,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "basketball",
    "badge": "Sniper Edition",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Aunt Pearl / Pink Oxford",
      "Triple Black",
      "Deep Royal Blue / Gold"
    ],
    "colorway": "Aunt Pearl / Pink Oxford",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KD16-PNK-10"
  },
  {
    "name": "SPORTIX Freak 5",
    "slug": "sportix-freak-5",
    "subtitle": "Men's Explosive Basketball Shoes",
    "description": "The engine inside Giannis roars with an unbelievable motor. His signature Freak 5 unleashes electrifying speed for hyper-fast steps and springy Euro-steps that silence the arena.",
    "details": [
      "Top-loaded Zoom Air unit in forefoot delivers energy return and responsiveness",
      "Internal containment system keeps your foot locked securely over the footbed",
      "Smear traction in the heel gives multi-directional grip for sudden deceleration",
      "Oversized inverted Swoosh design makes a loud aesthetic statement"
    ],
    "price": 140,
    "salePrice": 119,
    "stock": 40,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "basketball",
    "badge": "Euro Step",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Greek Coast / Stadium Green / University Gold",
      "Triple Black",
      "Fuchsia Dream"
    ],
    "colorway": "Greek Coast / Stadium Green / University Gold",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FRK5-GRN-11"
  },
  {
    "name": "SPORTIX Cosmic Unity 3",
    "slug": "sportix-cosmic-unity-3",
    "subtitle": "Unisex Sustainable Basketball Shoes",
    "description": "Better for your game, designed with the planet in mind. Built with at least 20% recycled material by weight, the Cosmic Unity 3 offers cloud-like cushioning and sticky traction for quick cuts.",
    "details": [
      "Flymesh midfoot containment wraps foot securely without excess weight",
      "Full-length drop-in foam midsole gives soft, responsive court feel",
      "Generative herringbone rubber outsole provides dependable multi-directional grip",
      "Embroidered accents and recycled yarn construction"
    ],
    "price": 170,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "basketball",
    "badge": "Sustainable Materials",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Natural / Total Orange / Summit White",
      "Ghost / Coral / Black"
    ],
    "colorway": "Natural / Total Orange / Summit White",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CSM3-NAT-12"
  },
  {
    "name": "SPORTIX Mercurial Vapor 15 Elite FG",
    "slug": "sportix-mercurial-vapor-15-elite-fg",
    "subtitle": "Men's Firm-Ground Soccer Cleats",
    "description": "Dominate the pitch in the Mercurial Vapor 15 Elite. We added a soccer-specific 3/4 Zoom Air unit in the plate to provide an extra level of springy underfoot feel that helps you create separation.",
    "details": [
      "Soccer-specific 3/4 Zoom Air unit sits directly in the plate for explosive acceleration",
      "Vaporposite+ upper combines grippy grid mesh with premium lining for ball control at high speeds",
      "Tri-star studs provide multi-directional traction with every step for sharp cutbacks",
      "Flyknit wraps the ankle in soft, stretchy fabric for a locked-in, sock-like feel"
    ],
    "price": 260,
    "stock": 25,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "Vapor Speed",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Metallic Copper / Black / White",
      "Bright Crimson / Volt",
      "White / Pink Blast"
    ],
    "colorway": "Metallic Copper / Black / White",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-VAP15-COP-13"
  },
  {
    "name": "SPORTIX Phantom GX 2 Elite FG",
    "slug": "sportix-phantom-gx-2-elite-fg",
    "subtitle": "Men's Precision Grip Soccer Cleats",
    "description": "Obsessed with touch? The Phantom GX 2 Elite puts revolutionary SPORTIX Gripknit material in key strike zones for elite ball control in both wet and dry weather.",
    "details": [
      "SPORTIX Gripknit sticky material provides optimal ball touch for passing, bending, and shooting",
      "Cyclone 360 traction pattern helps you make quick, uninhibited agility moves",
      "Asymmetric lacing offers a larger touch surface when dribbling and striking",
      "Flyknit collar gives snug comfort around the ankle bone"
    ],
    "price": 275,
    "stock": 20,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "Gripknit Touch",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / Deep Royal Blue / Metallic Silver",
      "Volt / Black"
    ],
    "colorway": "Black / Deep Royal Blue / Metallic Silver",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PGX2-BLU-14"
  },
  {
    "name": "SPORTIX Tiempo Legend 10 Elite FG",
    "slug": "sportix-tiempo-legend-10-elite-fg",
    "subtitle": "Men's Engineered Leather Football Boots",
    "description": "Even legends find ways to evolve. Engineered with FlyTouch Plus leather, the Tiempo 10 Elite is softer than natural leather and molds to your foot without overstretching.",
    "details": [
      "FlyTouch Plus engineered leather is incredibly soft and helps cleat mold to your foot",
      "Microdots on the upper amplify touch zones for shooting, dribbling and passing",
      "Conical studs in the heel give optimal traction and stability when braking",
      "All Conditions Control (ACC) technology adds a grippy texture in wet conditions"
    ],
    "price": 240,
    "salePrice": 210,
    "stock": 28,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "Touch Master",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Black / Bright Crimson",
      "Guava Ice / Black",
      "Triple Black"
    ],
    "colorway": "White / Black / Bright Crimson",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TMP10-WHT-15"
  },
  {
    "name": "SPORTIX Premier III FG",
    "slug": "sportix-premier-3-fg",
    "subtitle": "Men's Classic Leather Football Cleats",
    "description": "For the no-nonsense baller. The SPORTIX Premier III gets back to basics with a timeless silhouette wrapped in supple premium leather to keep you moving with confident touch.",
    "details": [
      "Supple premium kangaroo-feel leather on upper provides heightened touch",
      "Fold-over tongue features a cut line to let you choose between a traditional or modern look",
      "Conical studs provide the traction you need for high-speed pitch maneuvers",
      "Classic black-and-white colorway honoring timeless football tradition"
    ],
    "price": 110,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "football",
    "badge": "Heritage Touch",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "White / Royal Blue"
    ],
    "colorway": "Black / White",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PRM3-BLK-16"
  },
  {
    "name": "SPORTIX Streetgato Indoor",
    "slug": "sportix-streetgato-indoor",
    "subtitle": "Unisex Futsal & Street Football Shoes",
    "description": "Own the streets and indoor courts. The Streetgato blends performance details with casual streetwear flair so you are always ready to play pickup anywhere.",
    "details": [
      "Redesigned rubber outsole provides non-stop traction for small-sided street games",
      "Suede in the upper offers an everyday look whether you are playing on the pitch or hanging out",
      "Low-profile foam cushioning absorbs court shocks",
      "Reinforced toe bumper withstands toe-pokes on concrete and sport court"
    ],
    "price": 95,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "football",
    "badge": "Street Pitch",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Sail / Gum Light Brown / Black",
      "Triple Black",
      "Blue Void"
    ],
    "colorway": "Sail / Gum Light Brown / Black",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-STG-SAL-17"
  },
  {
    "name": "SPORTIX Free Metcon 5",
    "slug": "sportix-free-metcon-5",
    "subtitle": "Men's Cross-Training & Gym Shoes",
    "description": "When your workouts enter the trenches, the Free Metcon 5 can take you into the depths and help you dig deep to find that final ounce of strength for your PRs.",
    "details": [
      "SPORTIX Free technology in the forefoot creates flexibility for agility moves and burpees",
      "Wide heel creates a solid base for heavy barbell lifting",
      "Softer foam core cushions foot, while firmer outer layer delivers stability",
      "Breathable, lightweight upper has a comfortable, sock-like feel with a 7/8-length inner sleeve"
    ],
    "price": 120,
    "stock": 60,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "training",
    "badge": "Workout Staple",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / White / Smoke Grey",
      "Deep Royal Blue / White",
      "Anthracite / Volt"
    ],
    "colorway": "Black / White / Smoke Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-FM5-BLK-18"
  },
  {
    "name": "SPORTIX Romaleos 4",
    "slug": "sportix-romaleos-4",
    "subtitle": "Men's Elite Weightlifting Shoes",
    "description": "Designed for strength and stability on the lifting platform. The Romaleos 4 features a supportive midsole, an elevated heel, and wide adjustable straps to lock you down for your heaviest squats and snatches.",
    "details": [
      "Wide heel creates a stable base for heavy lifts, while rigid TPU heel lift supports power transfer from ground",
      "Dual adjustable midfoot straps lock foot down securely during maximum clean-and-jerks",
      "Durable rubber tread gives reliable platform grip",
      "Stiff TPU heel clip prevents heel slip during deep hip creases"
    ],
    "price": 200,
    "stock": 20,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "training",
    "badge": "Barbell Heavy",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "White / Black",
      "Triple Black",
      "Hyper Crimson / Pure Platinum"
    ],
    "colorway": "White / Black",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ROM4-WHT-19"
  },
  {
    "name": "SPORTIX SuperRep Go 3 Flyknit",
    "slug": "sportix-superrep-go-3-flyknit",
    "subtitle": "Unisex Group Fitness & Cardio Training Shoes",
    "description": "A radical design story rooted in sustainability and innovation. The SuperRep Go 3 Flyknit wraps your foot in recycled yarns and gives you responsive foam for high-intensity group cardio classes.",
    "details": [
      "Stretchy Flyknit upper is strategically zoned for containment during lateral movements",
      "Finely ground ReGrind foam in the midsole delivers lightweight impact absorption",
      "Flex grooves in the sole let your foot bend naturally for planks and mountain climbers",
      "Packable and lightweight design slides easily into your gym locker bag"
    ],
    "price": 100,
    "salePrice": 85,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "training",
    "badge": "Cardio HIIT",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Light Bone / Total Orange / Green Strike",
      "Triple Black",
      "Pure Platinum"
    ],
    "colorway": "Light Bone / Total Orange / Green Strike",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SRG3-BNE-20"
  },
  {
    "name": "SPORTIX In-Season TR 13",
    "slug": "sportix-in-season-tr-13",
    "subtitle": "Women's Smooth Transition Training Shoes",
    "description": "When time is of the essence but your workout can't wait, the In-Season TR 13 can take you anywhere from treadmill intervals to core training and HIIT circuits.",
    "details": [
      "Plush cushioning in the midsole makes for a smooth ride on the treadmill and seamless gym transitions",
      "Comfortable midfoot strap crosses over the laces to hug your foot for lateral moves",
      "Soft collar fabric feels snug and gentle on the ankle",
      "Durable rubber in high-wear zones helps maintain grip on studio floors"
    ],
    "price": 80,
    "stock": 55,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "training",
    "badge": "Comfort Cushion",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White / Metallic Gold",
      "Pearl Pink / White",
      "Platinum Violet"
    ],
    "colorway": "Black / White / Metallic Gold",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-IST13-W-BLK"
  },
  {
    "name": "Air Jordan 3 Retro 'White Cement Reimagined'",
    "slug": "air-jordan-3-retro-white-cement",
    "subtitle": "Men's Iconic Elephant Print Shoes",
    "description": "Commemorating 35 years of iconic design. The Air Jordan 3 Retro brings back the original 1988 silhouette with aged vintage accents, genuine leather upper, and classic elephant print overlays.",
    "details": [
      "Genuine tumbled leather upper with authentic elephant print accents on toe and heel",
      "Visible Air-Sole unit in the heel and encapsulated Air in forefoot",
      "Pre-yellowed vintage midsole detailing and classic Nike Air heel badge",
      "Padded collar and tongue provide ankle comfort and iconic hoops heritage"
    ],
    "price": 210,
    "stock": 24,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "OG Heritage",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Summit White / Fire Red / Cement Grey",
      "Black / Cement Grey"
    ],
    "colorway": "Summit White / Fire Red / Cement Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD3-RET-WHT"
  },
  {
    "name": "Air Jordan 5 Retro",
    "slug": "air-jordan-5-retro-black-metallic",
    "subtitle": "Men's Fighter Jet Hardwood Shoes",
    "description": "Inspired by WWII Mustang fighter planes. The Air Jordan 5 Retro features shark-tooth midsole accents, lace toggle lockdown, reflective 3M tongue, and translucent rubber outsole.",
    "details": [
      "Premium nubuck and synthetic leather upper for long-lasting comfort and durability",
      "Visible Air-Sole units in the heel and forefoot provide responsive cushioning",
      "Signature clear netting on side panels and tongue for breathability",
      "Reflective tongue shines bright under flash and arena spotlights"
    ],
    "price": 220,
    "stock": 26,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Reflective 3M",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Black / Metallic Silver / Fire Red",
      "White / Lucky Green"
    ],
    "colorway": "Black / Metallic Silver / Fire Red",
    "sizes": [
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD5-RET-BLK"
  },
  {
    "name": "Air Jordan 11 Retro 'Gratitude'",
    "slug": "air-jordan-11-retro-gratitude",
    "subtitle": "Men's Patent Leather Court Shoes",
    "description": "The crown jewel of sneaker history. The Air Jordan 11 Retro delivers timeless elegance with its high-cut shiny patent leather mudguard, carbon fiber spring plate, and translucent outsole.",
    "details": [
      "Lustrous patent leather mudguard wraps the shoe for structure and signature flair",
      "Full-length Air-Sole unit provides lightweight cushioning from end to end",
      "Carbon-fiber composite shank plate gives torsional rigidity and energy return",
      "Embroidered gold Jumpman logo on the lateral collar celebrates basketball majesty"
    ],
    "price": 230,
    "stock": 22,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Holiday Classic",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Metallic Gold / Black",
      "Bred / Varsity Red",
      "Cool Grey"
    ],
    "colorway": "White / Metallic Gold / Black",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD11-GRT-GLD"
  },
  {
    "name": "Air Jordan 6 Retro",
    "slug": "air-jordan-6-retro-infrared",
    "subtitle": "Men's Championship Silhouette",
    "description": "The silhouette MJ wore when claiming his first championship ring in 1991. The Air Jordan 6 Retro features dual hole pull tabs on the tongue, molded heel spoiler, and iconic Infrared pop.",
    "details": [
      "Durabuck and genuine leather upper provides structure and luxury finish",
      "Visible Air-Sole unit in the heel cushions heavy impact",
      "Molded rubber heel tab inspired by Michael Jordan’s German sports car",
      "Lace lock with embossed Jumpman logo ensures personalized containment"
    ],
    "price": 205,
    "stock": 30,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Championship OG",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Infrared / White",
      "Carmine / White"
    ],
    "colorway": "Black / Infrared / White",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD6-RET-INF"
  },
  {
    "name": "Air Jordan 1 Mid SE 'Craft'",
    "slug": "air-jordan-1-mid-se-craft",
    "subtitle": "Men's Inside-Out Suede Shoes",
    "description": "Fresh perspective on an iconic silhouette. The Air Jordan 1 Mid SE Craft turns the classic inside out with exposed foam edges, premium pigskin suedes, and unexpected canvas paneling.",
    "details": [
      "Suede, leather and canvas construction delivers an elevated textural contrast",
      "Encapsulated Air-Sole cushioning in heel for dependable everyday comfort",
      "Padded mid-cut collar supports ankle without feeling restrictive",
      "Solid rubber cupsole with pivot circle traction"
    ],
    "price": 135,
    "stock": 45,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Craft Edition",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Taupe Haze / Sail / Celestial Gold",
      "Obsidian / French Blue"
    ],
    "colorway": "Taupe Haze / Sail / Celestial Gold",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1M-CRF-TAU"
  },
  {
    "name": "Air Jordan 1 Low OG 'Mocha'",
    "slug": "air-jordan-1-low-og-mocha",
    "subtitle": "Unisex Streetwear Classic Shoes",
    "description": "Understated fire for the low-top connoisseur. Rich Dark Mocha durabuck overlays meet clean Sail leather underlays and a crisp black Swoosh in this highly sought-after street silhouette.",
    "details": [
      "Smooth premium leather combined with rich nubuck overlays",
      "Encapsulated Air cushion in the heel for lightweight impact absorption",
      "Wings logo finely embroidered on the heel tab",
      "Perforations on the toe box for steady ventilation"
    ],
    "price": 140,
    "stock": 35,
    "categorySlug": "flight",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Trending Heat",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Dark Mocha / Black / Sail",
      "Starfish / White",
      "Shadow / Medium Grey"
    ],
    "colorway": "Dark Mocha / Black / Sail",
    "sizes": [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1L-MCH-21"
  },
  {
    "name": "Jordan Spizike Low",
    "slug": "jordan-spizike-low",
    "subtitle": "Men's Spike Lee Heritage Shoes",
    "description": "The Spizike takes elements of 5 classic Jordans, blends them, and writes an homage to Spike Lee and the Hollywood commercial era. Elephant print, netting, and lace locks unite.",
    "details": [
      "Real and synthetic leather upper adds durability and structure",
      "SPORTIX Air technology absorbs impact for cushioning with every step",
      "Solid rubber outsole provides durable traction on city sidewalks",
      "Spike and 40 Acres portrait logos stamped on the heel badges"
    ],
    "price": 160,
    "stock": 40,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Spike Hybrid",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Bred / Black / Gym Red / Cement Grey",
      "White / Obsidian"
    ],
    "colorway": "Bred / Black / Gym Red / Cement Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-SPZ-BRD"
  },
  {
    "name": "Jordan Luka 2",
    "slug": "jordan-luka-2",
    "subtitle": "Men's Step-Back Basketball Shoes",
    "description": "You've got the skills, now lace up the shoes that elevate them. The Luka 2 is designed to support your step-backs, side-steps, and quick-stop action with full-foot Formula 23 cushioning.",
    "details": [
      "Formula 23 foam midsole with Cushlon 3.0 wedge for step-back responsiveness",
      "Sturdy cage wraps around the entire upper for 360-degree connected support",
      "Thick molded insole helps your foot stay anchored during abrupt deceleration",
      "Engineered multi-directional traction pattern handles dusty indoor courts"
    ],
    "price": 130,
    "stock": 35,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Signature Star",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Trick Shot / Polar Blue / Star Blue",
      "Nebula / Bright Crimson",
      "Matte Black"
    ],
    "colorway": "Trick Shot / Polar Blue / Star Blue",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-LUK2-BLU"
  },
  {
    "name": "Jordan Tatum 2",
    "slug": "jordan-tatum-2",
    "subtitle": "Men's Ultralight Court Shoes",
    "description": "Jayson Tatum's game is smooth, effortless, and lethal. The Tatum 2 is built with a lightweight frame, foam pods that conform to your foot, and full-length Air Strobel cushioning for playoff buckets.",
    "details": [
      "Full-length SPORTIX Air Strobel unit provides ultra-responsive court feel",
      "Molded foam and textile pods protect against heavy collisions without dead weight",
      "Outsole rubber is kept only where needed to minimize overall shoe mass",
      "JT signature monogram stitched into the padded tongue"
    ],
    "price": 125,
    "stock": 38,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "Playoff Agility",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Vortex / Mint Foam / Electric Green",
      "Momma's Boy / White",
      "Triple Black"
    ],
    "colorway": "Vortex / Mint Foam / Electric Green",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-TAT2-MNT"
  },
  {
    "name": "Jordan Flight Fleece Overhead Hoodie",
    "slug": "jordan-flight-fleece-overhead-hoodie",
    "subtitle": "Men's Heavyweight Washed Pullover",
    "description": "Luxe casual comfort. This premium Flight hoodie is crafted from dense 400g brushed fleece with an allover enzyme wash that creates an authentic broken-in vintage patina.",
    "details": [
      "Heavyweight 400g cotton fleece is smooth on the outside and plush on the inside",
      "Enzyme wash treatment provides a faded, lived-in heritage look",
      "Double-layered hood with metallic aglet drawstrings for custom coverage",
      "Tonal woven Flight patch stitched cleanly on the center chest"
    ],
    "price": 90,
    "stock": 45,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Flight Apparel",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Washed Black / Dark Smoke Grey",
      "Desert Khaki / Sand",
      "Gym Red"
    ],
    "colorway": "Washed Black / Dark Smoke Grey",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-HD-FLT-BLK"
  },
  {
    "name": "Jordan Dri-FIT Diamond Performance Shorts",
    "slug": "jordan-drifit-diamond-shorts",
    "subtitle": "Men's Heritage Mesh Court Shorts",
    "description": "One of the most recognizable silhouettes in basketball culture. The Diamond shorts feature breathable open-hole mesh with sweat-wicking Dri-FIT tech inspired by Michael Jordan's pro uniform.",
    "details": [
      "Dri-FIT technology moves sweat away from your skin for quicker evaporation",
      "Lightweight open-hole mesh fabric feels soft and breathable",
      "Contrasting diamond side hem paneling nods to iconic Chicago uniform styling",
      "Elastic waistband with exposed braided drawcord"
    ],
    "price": 50,
    "stock": 55,
    "categorySlug": "flight",
    "gender": "men",
    "sport": "basketball",
    "badge": "B-Ball Essential",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Gym Red / White",
      "Gym Red / Black",
      "Triple White"
    ],
    "colorway": "Black / Gym Red / White",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-SH-DIA-BLK"
  },
  {
    "name": "Jordan Hydro 8 Retro Slides",
    "slug": "jordan-hydro-8-retro-slides",
    "subtitle": "Unisex Post-Game Recovery Slides",
    "description": "Rest and recharge after hard-fought runs on the court. The Jordan Hydro 8 features an ultra-cushioned Solarsoft foam footbed with an adjustable midfoot strap featuring the iconic Jumpman.",
    "details": [
      "Ultra-soft Solarsoft foam footbed pampers tired athletic feet with textured massage pods",
      "Adjustable midfoot strap with synthetic leather padding provides a dialed-in custom fit",
      "Flex grooves on the outsole allow natural foot flex when walking",
      "Molded Jumpman badge on top strap"
    ],
    "price": 58,
    "stock": 50,
    "categorySlug": "flight",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Recovery",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": false,
    "colors": [
      "Black / White / Gym Red",
      "Triple White",
      "Cool Grey / Black"
    ],
    "colorway": "Black / White / Gym Red",
    "sizes": [
      "US 7",
      "US 8",
      "US 9",
      "US 10",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD-SLD-HYD8"
  },
  {
    "name": "SPORTIX Air Max 97 'Silver Bullet'",
    "slug": "sportix-air-max-97-silver-bullet",
    "subtitle": "Men's Fluid Motion Street Shoes",
    "description": "Inspired by Japanese bullet trains and water droplets rippling in a pond. The Air Max 97 revolutionized footwear with the world's first full-length visible Air unit and reflective silver wavy lines.",
    "details": [
      "Full-length Max Air unit delivers plush, lasting comfort with unmistakable retro street style",
      "Reflective 3M piping illuminates in low light for high-visibility flash",
      "Innovative hidden lacing system provides a clean, futuristic look",
      "Rubber outsole with modified waffle pattern gives reliable multi-surface traction"
    ],
    "price": 175,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Full-Length Air",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Metallic Silver / Varsity Red / Black",
      "Triple Black",
      "Triple White"
    ],
    "colorway": "Metallic Silver / Varsity Red / Black",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AM97-SLV-22"
  },
  {
    "name": "SPORTIX Air Max Plus (Tn)",
    "slug": "sportix-air-max-plus-sunset",
    "subtitle": "Men's Tuned Air Street Icon",
    "description": "Let your attitude have the edge in the Air Max Plus. Featuring prominent arch support inspired by a whale's tail and TPU gradient fingers nodding to breezy Florida palm trees, Tuned Air delivers legendary stability.",
    "details": [
      "Tuned Air cushioning units in heel and forefoot provide lightweight stability and comfort",
      "Prominent TPU arch draws inspiration from a whale tail and adds structure",
      "Synthetic gradient upper with molded TPU rib cage adds durability and defiance",
      "Rubber outsole provides durable grip on city pavement"
    ],
    "price": 180,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Tuned Air OG",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Sunset Orange / Tour Yellow / Black",
      "Hyper Blue / Black",
      "Triple Black"
    ],
    "colorway": "Sunset Orange / Tour Yellow / Black",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TN-SNT-23"
  },
  {
    "name": "SPORTIX Blazer Mid '77 Vintage",
    "slug": "sportix-blazer-mid-77-vintage",
    "subtitle": "Unisex Heritage Basketball Shoes",
    "description": "Styled for the '70s. Loved in the '80s. Classic in the '90s. Ready for the future. The Blazer Mid '77 Vintage delivers a timeless design with crisp leather and vintage suede details.",
    "details": [
      "Leather and synthetic upper keeps the classic look of the original while adding comfort",
      "Vintage treatment on the midsole provides an authentic old-school look",
      "Autoclave construction fuses the outsole to the midsole for a streamlined look",
      "Exposed foam on the tongue provides a retro throwback feel"
    ],
    "price": 105,
    "salePrice": 89,
    "stock": 55,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Vintage Suede",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Black / Sail",
      "White / Lucid Green",
      "Triple White"
    ],
    "colorway": "White / Black / Sail",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BLZ77-WHT-24"
  },
  {
    "name": "SPORTIX Killshot 2 Leather",
    "slug": "sportix-killshot-2-leather",
    "subtitle": "Men's Low-Profile Court Tennis Shoes",
    "description": "Inspired by our original low-profile tennis shoes. The Killshot 2 updates the classic court silhouette with varied textured leathers, soft suede overlays, and an iconic gum rubber sole.",
    "details": [
      "Leather upper with suede detailing softens to vintage perfection with wear",
      "Gum rubber sole adds a retro throwback look and durable everyday grip",
      "Low-cut padded collar looks sleek and feels comfortable around the ankle",
      "Embossed SPORTIX script on the heel counter"
    ],
    "price": 90,
    "stock": 60,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Club Classic",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Sail / Midnight Navy / Gum Yellow",
      "White / Lucid Green / Gum"
    ],
    "colorway": "Sail / Midnight Navy / Gum Yellow",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-KIL2-SAL-25"
  },
  {
    "name": "SPORTIX Cortez '72 Leather",
    "slug": "sportix-cortez-72-vintage",
    "subtitle": "Unisex Track Heritage Street Shoes",
    "description": "One word: tradition. From running legend to fashion phenomenon, its retro appeal, sponge-soft foam midsole, and sawtooth detailing deliver year after year of timeless style.",
    "details": [
      "Leather upper is easy to clean and easy to style with any outfit",
      "Foam midsole with iconic contrasting wedge insert delivers lightweight cushioning",
      "Herringbone pattern outsole delivers plenty of durable traction and heritage style",
      "Padded low-cut collar feels sleek and comfortable"
    ],
    "price": 90,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Original Heritage",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Varsity Red / Royal Blue (Forrest Gump)",
      "Black / White",
      "Triple White"
    ],
    "colorway": "White / Varsity Red / Royal Blue",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CRTZ-RED-26"
  },
  {
    "name": "SPORTIX Air Max 270 'Triple Black'",
    "slug": "sportix-air-max-270-triple-black",
    "subtitle": "Men's Max Heel Air Cushion Shoes",
    "description": "Boasting SPORTIX's biggest heel Air unit yet, the Air Max 270 delivers visible air under every single step. Built with a bootie construction that hugs the foot for supreme all-day comfort.",
    "details": [
      "Large volume 270 Max Air unit in heel delivers unbelievable bounce and impact protection",
      "Stretchy inner sleeve creates a snug, sock-like fit that flexes with your foot",
      "Engineered mesh upper offers structure and ventilation where needed",
      "Dual-density foam sole cushions and supports from sunrise to sunset"
    ],
    "price": 160,
    "stock": 55,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Super Comfort",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Triple Black",
      "White / Black / University Red",
      "Photon Dust / Volt"
    ],
    "colorway": "Triple Black",
    "sizes": [
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AM270-BLK-27"
  },
  {
    "name": "SPORTIX P-6000",
    "slug": "sportix-p-6000-metallic-silver",
    "subtitle": "Unisex 2000s Tech Running Silhouette",
    "description": "A mash-up of Pegasus history. The P-6000 takes 2000s running style to modern heights with breathable mesh, horizontal and vertical overlays, and comfortable foam cushioning.",
    "details": [
      "Leather, textile and synthetic overlays add structure and comfortable support",
      "Throwback design draws from the Pegasus 25 and Pegasus 2006 archives",
      "Cushioned insole provides a comfortable underfoot feel for full day wear",
      "Rubber outsole adds durable multi-surface traction"
    ],
    "price": 110,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Y2K Aesthetic",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Metallic Silver / White / Varsity Red",
      "Triple Black",
      "Flat Pewter / Light Iron Ore"
    ],
    "colorway": "Metallic Silver / White / Varsity Red",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 11"
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-P6000-SLV-28"
  },
  {
    "name": "SPORTIX Air Max 1 '86 OG",
    "slug": "sportix-air-max-1-86-big-bubble",
    "subtitle": "Men's Visible Air Trailblazer Shoes",
    "description": "The holy grail of sneaker heritage. The Air Max 1 '86 Big Bubble tells one of SPORTIX's best stories: revealing the visible Air window to the world with the original oversized four-chamber bubble.",
    "details": [
      "True-to-spec oversized 1986 Big Bubble visible Air unit in the heel",
      "Classic mesh upper with rich synthetic suede overlays and vibrant University Red fender",
      "Waffle rubber outsole provides authentic heritage traction",
      "Vintage Nike Air branded box and retro hangtag packaging"
    ],
    "price": 150,
    "stock": 32,
    "categorySlug": "shoes",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Original 1986",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / University Red / Neutral Grey",
      "Royal Blue / Neutral Grey"
    ],
    "colorway": "White / University Red / Neutral Grey",
    "sizes": [
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 12"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AM1-86-RED"
  },
  {
    "name": "SPORTIX Pro Dri-FIT Compression Long-Sleeve",
    "slug": "sportix-pro-drifit-compression-ls",
    "subtitle": "Men's Tight Base-Layer Workout Top",
    "description": "The ultimate second skin for serious athletes. SPORTIX Pro Dri-FIT hugs your muscles with targeted compression to reduce fatigue while high-stretch mesh panels disperse excess body heat.",
    "details": [
      "Dri-FIT technology moves sweat away from skin for quicker evaporation",
      "Lightweight, stretchy fabric helps you move naturally during sets and lunges",
      "Flat seams feel smooth against your skin without chafing under jerseys",
      "Vents at the hem let you move freely through overhead presses"
    ],
    "price": 42,
    "stock": 65,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "training",
    "badge": "Compression Fit",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "White / Black",
      "Smoke Grey / Heather"
    ],
    "colorway": "Black / White",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PRO-LS-BLK"
  },
  {
    "name": "SPORTIX Primary Dri-FIT Training Tee",
    "slug": "sportix-primary-drifit-training-tee",
    "subtitle": "Men's Sweat-Wicking Running & Gym Tee",
    "description": "Running, spinning, lifting, stretching—whatever your workout demands, the Primary Tee is there for it. Soft and comfortable with underarm ventilation to help keep you cool.",
    "details": [
      "SPORTIX Dri-FIT technology wicks sweat away from your skin to keep you dry",
      "Knit fabric feels buttery soft against your torso",
      "Embroidered eyelets at the underarms help increase airflow",
      "Underarm gusset gives you increased mobility across lifting maneuvers"
    ],
    "price": 45,
    "stock": 70,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "training",
    "badge": "Anti-Odor",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Obsidian Heather / Black",
      "Mineral Teal / White",
      "Pure White"
    ],
    "colorway": "Obsidian Heather / Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TEE-PRI-NAV"
  },
  {
    "name": "SPORTIX Sportswear Heavyweight Club Tee",
    "slug": "sportix-sportswear-heavyweight-tee",
    "subtitle": "Unisex Premium Dense Cotton T-Shirt",
    "description": "Cut with a roomy, boxy streetwear drape, this heavyweight Max90 tee gives you structured premium cotton with dropped shoulders and longer sleeves for everyday casual presence.",
    "details": [
      "Heavyweight 240g cotton feels structured and premium",
      "Dropped shoulders, longer sleeves and a roomy fit through the body and hips",
      "Embroidered classic SPORTIX Futura logo on left chest",
      "Ribbed collar retains shape through countless machine washes"
    ],
    "price": 40,
    "stock": 85,
    "categorySlug": "clothing",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Boxy Street Fit",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Vintage Sail",
      "Washed Black",
      "Olive Flak"
    ],
    "colorway": "Vintage Sail",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TEE-HVY-SAL"
  },
  {
    "name": "SPORTIX Dri-FIT UV Miler Running Top",
    "slug": "sportix-drifit-uv-miler-running-top",
    "subtitle": "Men's Breathable Marathon Training Shirt",
    "description": "Take on your daily miles in the lightweight Miler Top. Featuring ultra-breathable sweat-wicking knit fabric and built-in UVA and UVB sun protection in areas covered by the garment.",
    "details": [
      "UVA and UVB sun protection from the sun in the areas covered by the garment",
      "Dri-FIT technology pulls sweat from skin to accelerate evaporation",
      "Rolled-back shoulder seams help your arms swing freely and naturally",
      "Reflective Swoosh bar on chest for safety in low light conditions"
    ],
    "price": 38,
    "stock": 60,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "UVA/UVB Shield",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Volt / Reflective Silver",
      "Black / Reflective Silver",
      "Game Royal"
    ],
    "colorway": "Volt / Reflective Silver",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-MLR-VLT-30"
  },
  {
    "name": "SPORTIX Storm-FIT ADV Waterproof Parka",
    "slug": "sportix-stormfit-adv-goretex-parka",
    "subtitle": "Men's Gore-Tex All-Weather Shell",
    "description": "Engineered to withstand the fiercest torrential downpours. SPORTIX Storm-FIT ADV combines windproof and waterproof GORE-TEX fabric with sealed thermal seams to keep you completely dry.",
    "details": [
      "Storm-FIT ADV technology combines windproof and waterproof fabric with advanced engineering",
      "GORE-TEX 3-layer outer membrane is 100% waterproof yet breathable",
      "Two-way full-length front zipper with protective storm flap prevents water intrusion",
      "Multiple water-sealed zippered utility pockets protect smartphone and essentials"
    ],
    "price": 350,
    "stock": 20,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Gore-Tex Storm",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Matte Black / Anthracite",
      "Cargo Khaki / Sequoia"
    ],
    "colorway": "Matte Black / Anthracite",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-STORM-PRK-BLK"
  },
  {
    "name": "SPORTIX Repel UV Windrunner Running Jacket",
    "slug": "sportix-repel-uv-windrunner-jacket",
    "subtitle": "Men's Ultralight Packable Windbreaker",
    "description": "An icon evolved for windy, misty runs. The Repel Windrunner features featherweight water-repellent woven stretch fabric, 26-degree chevron vent lines, and packs neatly into its own pocket.",
    "details": [
      "Water-repellent finish helps keep you dry in wet, drizzly conditions",
      "Vented back panel and iconic chevron lines maximize airflow as body temperature climbs",
      "Jacket packs down into the interior back panel pocket for effortless portability",
      "Elastic cuffs and adjustable bungee hood seal out sudden wind gusts"
    ],
    "price": 115,
    "salePrice": 95,
    "stock": 50,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "Packable",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Reflective Silver",
      "Smoke Grey / White",
      "Hyper Royal / Obsidian"
    ],
    "colorway": "Black / Reflective Silver",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-WND-RPL-BLK"
  },
  {
    "name": "SPORTIX Therma-FIT Synthetic Fill Puffer",
    "slug": "sportix-thermafit-synthetic-puffer",
    "subtitle": "Men's Warm Insulated Winter Jacket",
    "description": "Lock in warmth when the temperature plummets. Powered by Therma-FIT technology and high-loft synthetic insulation, this puffer mimics the warmth, loft and feel of genuine down.",
    "details": [
      "SPORTIX Therma-FIT technology manages body’s natural heat to keep you warm in cold conditions",
      "Thermore Ecodown insulation contains 100% recycled fibers from plastic bottles",
      "Durable water-repellent ripstop shell sheds light rain and snow flurries",
      "Fleece-lined zippered hand pockets keep fingers warm"
    ],
    "price": 180,
    "stock": 35,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "lifestyle",
    "badge": "Thermal Warmth",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Triple Black",
      "Vintage Green / Sequoia",
      "Light Bone / Sail"
    ],
    "colorway": "Triple Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PUF-THM-BLK"
  },
  {
    "name": "SPORTIX Tech Fleece Slim Tapered Joggers",
    "slug": "sportix-tech-fleece-slim-joggers-women",
    "subtitle": "Women's Sleek Athletic Sweatpants",
    "description": "Low-profile warmth without the bulk. Premium lightweight double-sided smooth fleece gives these women's joggers a tailored aesthetic with iconic zippered tape pockets.",
    "details": [
      "Smooth on both sides, Tech Fleece offers premium warmth and an elevated look",
      "Signature bonded tape detailing surrounds the zippered utility pocket",
      "Ribbed cuffs and tapered leg design spotlight your favorite sneakers",
      "Soft elastic waistband with internal adjustable drawcord"
    ],
    "price": 110,
    "stock": 45,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "lifestyle",
    "badge": "Tailored Cut",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / Matte Silver",
      "Heather Grey / White",
      "Pale Ivory"
    ],
    "colorway": "Black / Matte Silver",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TFJ-W-BLK"
  },
  {
    "name": "SPORTIX Phenom Elite Knit Running Pants",
    "slug": "sportix-phenom-elite-knit-pants",
    "subtitle": "Men's Ankle-Zipped Track Running Pants",
    "description": "The runner's favorite pant. The Phenom Elite features lightweight stretch-knit fabric with targeted ventilation behind the knees, secure media pockets, and ankle zippers for easy shoe removal.",
    "details": [
      "Dri-FIT technology moves moisture away from skin to maintain cool comfort",
      "Lightweight knit fabric tapers neatly down the leg to stay out of the way of your stride",
      "Zippered back center pocket with vapor barrier shields smartphone from sweat",
      "Ankle zippers allow quick on-and-off transitions without removing your running shoes"
    ],
    "price": 85,
    "stock": 50,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "Night Reflective",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Reflective Silver",
      "Smoke Grey"
    ],
    "colorway": "Black / Reflective Silver",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PNT-PHN-BLK"
  },
  {
    "name": "SPORTIX Aeroswift 2-Inch Racing Shorts",
    "slug": "sportix-aeroswift-racing-split-shorts",
    "subtitle": "Men's Featherweight Marathon Split Shorts",
    "description": "Engineered purely for race day speed. The Aeroswift 2\" split shorts integrate sweat-wicking precision technology with a breathable Flyvent waistband and high side splits for stride freedom.",
    "details": [
      "Aeroswift technology integrates innovative features and materials for light weight and mobility",
      "Flyvent waistband provides lightweight ventilation for exceptional comfort",
      "High side split seams let your legs move through full marathon extension unimpeded",
      "Drop-in key pocket at the inner waist"
    ],
    "price": 70,
    "stock": 40,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "Race Day Elite",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Volt / Black",
      "Black / White",
      "Hyper Royal / White"
    ],
    "colorway": "Volt / Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SH-AER2-VLT"
  },
  {
    "name": "SPORTIX Flex Stride 5-Inch 2-in-1 Shorts",
    "slug": "sportix-flex-stride-5in-shorts",
    "subtitle": "Men's Lined Running & Gym Shorts",
    "description": "Versatile support from start to finish. The Flex Stride shorts pair a lightweight woven stretch outer shell with a supportive compression inner liner for anti-chafe comfort over long training sessions.",
    "details": [
      "Built-in compressive inner liner delivers snug support and eliminates friction chafing",
      "Zippered back pocket is large enough to hold most standard smartphones",
      "Perforations on the back yoke enhance breathability during high-intensity intervals",
      "Dual-function drawcord can be worn internally or externally"
    ],
    "price": 65,
    "salePrice": 52,
    "stock": 55,
    "categorySlug": "clothing",
    "gender": "men",
    "sport": "running",
    "badge": "Built-In Liner",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Reflective Silver",
      "Smoke Grey / Heather",
      "Cargo Khaki"
    ],
    "colorway": "Black / Reflective Silver",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SH-FLX5-BLK"
  },
  {
    "name": "SPORTIX One Luxe Mid-Rise 7/8 Leggings",
    "slug": "sportix-one-luxe-midrise-leggings",
    "subtitle": "Women's Silky Soft High-Performance Tights",
    "description": "The super-versatile leggings you'll want to wear all day, every day. Crafted from silky-soft, completely non-sheer InfinaSoft fabric, they pass the squat test with flying colors.",
    "details": [
      "InfinaSoft fabric is buttery soft yet squat-proof non-sheer even under maximum tension",
      "Seamless sides and a contoured V-shape back waistband flatter your silhouette",
      "Three hidden pockets in the mid-rise waistband hold your phone, keys, and cards",
      "Dri-FIT technology ensures rapid moisture evaporation"
    ],
    "price": 90,
    "stock": 50,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Luxe Feel",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / Clear",
      "Mineral Teal",
      "Burgundy Crush",
      "Dark Smoke Grey"
    ],
    "colorway": "Black / Clear",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-LEG-LUX-BLK"
  },
  {
    "name": "SPORTIX Swoosh Medium-Support Sports Bra",
    "slug": "sportix-swoosh-medium-support-bra",
    "subtitle": "Women's Padded Dri-FIT Workout Bra",
    "description": "With classic racerback design and wide, comfortable straps, the SPORTIX Swoosh Sports Bra feels snug and secure while you move. Removable 1-piece pad resists shifting and folding.",
    "details": [
      "Medium support is ideal for gym workouts, spin, cross-training, tennis, and running",
      "Removable 1-piece pad resists shifting or folding for a reliably comfortable fit",
      "Racerback design rests between your shoulder blades to let your arms move freely",
      "Dri-FIT fabric helps keep you cool, dry and supported through sweat sessions"
    ],
    "price": 42,
    "stock": 65,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Gym Essential",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "Pure White / Black",
      "Playful Pink / White"
    ],
    "colorway": "Black / White",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BRA-SWSH-BLK"
  },
  {
    "name": "SPORTIX Brasilia 9.5 Small Duffel (41L)",
    "slug": "sportix-brasilia-small-duffel-41l",
    "subtitle": "Unisex Compact Gym & Travel Duffel",
    "description": "The dependable gym daily. The Brasilia 9.5 Small Duffel holds all your workout essentials in a compact footprint with a dedicated ventilated shoe compartment that isolates sweaty gear.",
    "details": [
      "Zippered main compartment secures your training essentials",
      "Inner zippered pocket keeps dirty footwear and sweaty clothes separate from clean gear",
      "Coated bottom helps shield your gear from bumps, scrapes, and damp locker room floors",
      "Removable padded shoulder strap and dual handles offer versatile carrying options"
    ],
    "price": 45,
    "stock": 60,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Vented Shoe Pocket",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / Black / White",
      "Midnight Navy / Black",
      "Iron Grey / Total Orange"
    ],
    "colorway": "Black / Black / White",
    "sizes": [
      "Small (41 Liters)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BAG-BRS-41L"
  },
  {
    "name": "SPORTIX Hoops Elite Pro Backpack (32L)",
    "slug": "sportix-hoops-elite-pro-backpack",
    "subtitle": "Unisex Basketball & Court Travel Bag",
    "description": "The pro basketball player's mobile locker room. Built with duffel-style flat opening, ventilated shoe pocket that accommodates high-tops up to size 15, and foil-lined hydration pocket.",
    "details": [
      "Duffel-like main compartment opens completely flat for easy locker room loading",
      "Ventilated footwear compartment holds basketball shoes up to size US 15",
      "Foil-lined cooler pocket keeps cold beverages chilled for four quarters",
      "Sternum strap and Max Air padded shoulder straps distribute heavy gear evenly"
    ],
    "price": 85,
    "stock": 35,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "basketball",
    "badge": "Pro Court Pack",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / Metallic Gold / White",
      "Triple Black",
      "University Red / Black"
    ],
    "colorway": "Black / Metallic Gold / White",
    "sizes": [
      "32 Liters (19\" H x 11\" W x 9\" D)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BAG-ELT-32L"
  },
  {
    "name": "SPORTIX Heritage Crossbody Hip Pack (3L)",
    "slug": "sportix-heritage-crossbody-pack",
    "subtitle": "Unisex Everyday Street Waistpack",
    "description": "Hands-free convenience with heritage flair. The SPORTIX Heritage Crossbody Pack keeps phone, keys, wallet, and sunglasses organized in dual zippered compartments.",
    "details": [
      "Padded, adjustable cross-body strap lets you customize your wear style across chest or waist",
      "Dual zipper pulls on the main compartment make quick entry easy from either side",
      "Internal mesh organizer pocket keeps keys and cards securely separated",
      "Tough 600D woven polyester construction sheds light precipitation"
    ],
    "price": 30,
    "stock": 75,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Streetwear Essential",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Black / White Futura",
      "Desert Khaki",
      "University Red"
    ],
    "colorway": "Black / White Futura",
    "sizes": [
      "3 Liters (16\" L x 4\" W x 6\" H)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BAG-XBD-BLK"
  },
  {
    "name": "SPORTIX Utility Speed Backpack (27L)",
    "slug": "sportix-utility-speed-backpack",
    "subtitle": "Unisex Heavy-Duty Laptop & Gym Pack",
    "description": "Keeps your gear close, secure and organized when commuting to and from training sessions. Opens flat like a book with multiple zippered sleeve pockets and a padded 15\" laptop sleeve.",
    "details": [
      "Durable canvas construction shields contents while on the move",
      "Zippered main compartment opens wide and flat for accessibility",
      "Max Air cushioned shoulder straps reduce pressure during heavy carries",
      "Dedicated padded laptop compartment fits devices up to 15 inches"
    ],
    "price": 75,
    "stock": 40,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Max Durability",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Triple Black",
      "Cargo Khaki / Enigma Stone"
    ],
    "colorway": "Triple Black",
    "sizes": [
      "27 Liters (18\" H x 11\" W x 6\" D)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BAG-UTL-27L"
  },
  {
    "name": "SPORTIX Peak Cuffed Ribbed Beanie",
    "slug": "sportix-peak-cuffed-ribbed-beanie",
    "subtitle": "Unisex Double-Knit Winter Hat",
    "description": "A classic mid-depth cuffed beanie designed to keep you warm and stylish when freezing winds roll in. Soft yarn blend in a ribbed double-knit design with an embroidered SPORTIX metallic ingot.",
    "details": [
      "Soft acrylic knit yarns feel warm and smooth against your skin",
      "Cuffed ribbed design lets you wear it cuffed high or uncuffed slouchy",
      "Embroidered metal Futura ingot on cuff adds sleek polish",
      "Stretches comfortably to fit all head sizes"
    ],
    "price": 28,
    "stock": 60,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "lifestyle",
    "badge": "Winter Warmth",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Matte Black",
      "Heather Grey",
      "Sail White",
      "Vintage Green"
    ],
    "colorway": "Matte Black",
    "sizes": [
      "One Size Fits Most"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-HAT-PEAK-BLK"
  },
  {
    "name": "SPORTIX Vapor Jet 7.0 Football Gloves",
    "slug": "sportix-vapor-jet-football-gloves",
    "subtitle": "Men's Magnigrip Receiver Sticky Gloves",
    "description": "Make impossible one-handed catches look routine. The Vapor Jet 7.0 features all-weather Magnigrip palms that provide an ultra-sticky catching surface engineered to meet NFHS/NCAA specifications.",
    "details": [
      "Magnigrip palm maximizes sticky catching surface for vacuum-like reception control",
      "Breathable, flexible woven back of hand keeps hands cool in high-pressure drives",
      "Adjustable hook-and-loop wrist cuff allows a personalized lock",
      "Reinforced pinky seams resist wear and tear over a grueling 16-game season"
    ],
    "price": 50,
    "stock": 45,
    "categorySlug": "accessories",
    "gender": "men",
    "sport": "football",
    "badge": "Magnigrip Palm",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "White / Metallic Gold / Black",
      "Triple Black",
      "University Red / White"
    ],
    "colorway": "White / Metallic Gold / Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-GLV-VP7-WHT"
  },
  {
    "name": "SPORTIX Big Mouth 2.0 32oz Squeeze Bottle",
    "slug": "sportix-big-mouth-squeeze-bottle-32oz",
    "subtitle": "Unisex Rapid-Flow Sports Bottle",
    "description": "Hydration without hesitation. The SPORTIX Big Mouth 2.0 features a wide-opening screw top for rapid ice filling and a high-flow pop-up nozzle for effortless sideline hydration.",
    "details": [
      "Squeezable LDPE plastic body delivers high-flow hydration when compressed",
      "Wide mouth opening accommodates large ice cubes and sport electrolyte powders",
      "BPA-free construction leaves zero plastic aftertaste",
      "Textured grip surface prevents bottle slipping from sweaty hands"
    ],
    "price": 16,
    "stock": 95,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "BPA Free",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Clear / Black Swoosh",
      "Volt / Black",
      "Anthracite / White"
    ],
    "colorway": "Clear / Black Swoosh",
    "sizes": [
      "32 oz (946 ml)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BTL-BM32-CLR"
  },
  {
    "name": "SPORTIX Fuel Jug 64oz Water Chug",
    "slug": "sportix-fuel-jug-half-gallon-64oz",
    "subtitle": "Unisex Insulated All-Day Hydration Jug",
    "description": "Crush two-a-day practices without refilling. The SPORTIX Fuel Jug holds a massive half-gallon of water, featuring double-wall foam insulation that keeps fluids icy cold through grueling summer camps.",
    "details": [
      "64oz (1.9 Liters) capacity keeps you fully hydrated throughout full-day tournaments",
      "Lightweight double-wall foam insulation keeps water chilled for up to 12 hours",
      "Flip-cap lid with integrated fence hooks keeps bottle off dirty grass and dugout floors",
      "Ergonomic top carry handle makes transport effortless"
    ],
    "price": 42,
    "stock": 45,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "All-Day Cold",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Matte Black / Anthracite",
      "Hyper Royal / White",
      "Volt / Black"
    ],
    "colorway": "Matte Black / Anthracite",
    "sizes": [
      "64 oz (1.9 Liters)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BTL-JUG-64"
  },
  {
    "name": "SPORTIX Everyday Lightweight Ankle Socks (6-Pack)",
    "slug": "sportix-everyday-lightweight-ankle-socks",
    "subtitle": "Unisex Breathable Low-Cut Socks",
    "description": "Power through your workout in comfort. Sweat-wicking yarns keep your feet dry and cool, while snug arch band compression delivers that supportive locked-in feel.",
    "details": [
      "Dri-FIT technology helps feet stay dry, comfortable, and blister-free",
      "Arch band contours around the midfoot for snug, supportive compression",
      "Reinforced heel and toe provide durability where high friction occurs",
      "Pack includes 6 pairs for a full week of training rotation"
    ],
    "price": 22,
    "stock": 90,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Value 6-Pack",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "All White (6-Pack)",
      "All Black (6-Pack)",
      "Assorted Grey / Black / White"
    ],
    "colorway": "All White (6-Pack)",
    "sizes": [
      "M (US Men 6-8)",
      "L (US Men 8-12)",
      "XL (US Men 12-15)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SCK-ANK-6PK"
  },
  {
    "name": "SPORTIX 2.0 Weighted Speed Jump Rope",
    "slug": "sportix-weighted-speed-jump-rope",
    "subtitle": "Unisex High-Speed Steel Bearing Rope",
    "description": "Supercharge your footwork, agility, and cardiovascular conditioning. Features smooth steel ball bearings that rotate frictionlessly for double-unders and high-cadence boxing intervals.",
    "details": [
      "Dual precision steel ball bearings ensure frictionless 360-degree rotation without tangling",
      "Removable 0.5 lb weight cylinders inside handles for customizable upper body resistance",
      "Kink-resistant coated steel wire rope cuts through the air with minimal drag",
      "Textured non-slip ergonomic grips maintain handle hold during intense sweating"
    ],
    "price": 25,
    "stock": 60,
    "categorySlug": "accessories",
    "gender": "unisex",
    "sport": "training",
    "badge": "Cardio Conditioning",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Matte Black / Volt Wire",
      "Black / Red Wire"
    ],
    "colorway": "Matte Black / Volt Wire",
    "sizes": [
      "9.8 ft Adjustable Length"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ROP-SPD-20"
  },
  {
    "name": "SPORTIX Gamma Force",
    "slug": "sportix-gamma-force-women",
    "subtitle": "Women's Layered Hardwood Street Shoes",
    "description": "Layers upon layers of dimension and court style. Rooted in classic b-ball culture, the Gamma Force pairs suede, real and synthetic leather for a multifaceted look that commands attention.",
    "details": [
      "Subtle platform lift gives you just enough height without compromising stability",
      "Leather, suede and mesh layers add a durable, dimensional look to any outfit",
      "Rubber outsole contains speckled SPORTIX Grind material",
      "Perforations at the toe and quarter panel maintain steady airflow"
    ],
    "price": 95,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "lifestyle",
    "badge": "Trending",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "White / Phantom / Sanddrift",
      "Sail / Bronzine / Amber",
      "Triple White"
    ],
    "colorway": "White / Phantom / Sanddrift",
    "sizes": [
      "US 5.5",
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-GMA-W-SND"
  },
  {
    "name": "SPORTIX Calm Slides",
    "slug": "sportix-calm-slides-women",
    "subtitle": "Women's Water-Friendly Contoured Slides",
    "description": "Enjoy a calm, comfortable experience wherever your day off takes you. Made from soft yet responsive foam, these lightweight slides are easy to style and water-friendly for beach and poolside days.",
    "details": [
      "Contoured design is crafted from a single piece of foam for a seamless, smooth feel",
      "Subtle textured footbed keeps your foot in place even when wet",
      "Water-friendly foam shell is quick and easy to clean",
      "Full-length rubber outsole gives reliable traction on wet deck surfaces"
    ],
    "price": 50,
    "stock": 65,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "lifestyle",
    "badge": "Poolside Comfort",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Sesame / Sand",
      "Black",
      "Geode Teal",
      "Barely Rose"
    ],
    "colorway": "Sesame / Sand",
    "sizes": [
      "US 6",
      "US 7",
      "US 8",
      "US 9",
      "US 10"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-CLM-W-SES"
  },
  {
    "name": "SPORTIX Zenvy Gentle-Support Biker Shorts",
    "slug": "sportix-zenvy-gentle-biker-shorts",
    "subtitle": "Women's 8-Inch InfinaSoft Yoga Shorts",
    "description": "Feel free to move effortlessly in the Zenvy biker shorts. InfinaSoft fabric is lightweight and buttery soft, letting you bend, stretch, and flow with limitless flexibility.",
    "details": [
      "InfinaSoft fabric feels lightweight, soft, and gentle against sensitive skin",
      "Extra-wide waistband helps reduce rolling, pinching, and sliding",
      "Drop-in center back pocket fits smartphones securely during Pilates and yoga flows",
      "Raw-cut hem finish creates a smooth, flattering leg profile"
    ],
    "price": 62,
    "stock": 40,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "InfinaSoft",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Black / Matte",
      "Earth Brown",
      "Mineral Teal"
    ],
    "colorway": "Black / Matte",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ZNV-W-BLK"
  },
  {
    "name": "SPORTIX Alate All-Day Light-Support Bra",
    "slug": "sportix-alate-all-day-bra",
    "subtitle": "Women's Seamless Everyday Bralette",
    "description": "Lightweight and barely-there. The Alate All-Day bra delivers gentle support with a featherweight brushed liner and flexible bonded straps you will forget you are wearing.",
    "details": [
      "Incredibly soft, stretchy fabric moves with your natural posture throughout the day",
      "Ultra-thin breathable pads provide shape without adding unnecessary volume",
      "Low-profile hook-and-eye closure at the back allows custom underbust sizing",
      "Dri-FIT technology ensures quick-drying comfort from morning yoga to evening errands"
    ],
    "price": 40,
    "stock": 55,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "All-Day Soft",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Soft Pink / Rose Gold",
      "Pure White",
      "Black"
    ],
    "colorway": "Soft Pink / Rose Gold",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-ALT-W-PNK"
  },
  {
    "name": "SPORTIX Sportswear Phoenix Fleece Oversized Crew",
    "slug": "sportix-sportswear-phoenix-fleece-crew",
    "subtitle": "Women's Exaggerated Ribbing Sweatshirt",
    "description": "Rise up and transform your fleece wardrobe with strong cozy vibes. Extra-long ribbing at the cuffs and hem pairs with dropped shoulders to deliver statement volume.",
    "details": [
      "Brushed midweight fleece feels extra soft on the inside and smooth on the outside",
      "Elongated ribbing at the cuffs and hem provides extra comfort and structure",
      "Exaggerated drop-shoulder cut gives a relaxed, effortless slouch",
      "Embroidered mini Swoosh logo on center chest"
    ],
    "price": 70,
    "stock": 48,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "lifestyle",
    "badge": "Cozy Fleece",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Sail / Black",
      "Dark Grey Heather / Sail",
      "Malt / White"
    ],
    "colorway": "Sail / Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-PHX-W-SAL"
  },
  {
    "name": "SPORTIX Dri-FIT One Relaxed Muscle Tank",
    "slug": "sportix-drifit-one-relaxed-tank",
    "subtitle": "Women's Breathable Fitness Top",
    "description": "Engineered for every workout scenario. Whether lifting dumbbells, sweating on the spin bike, or heading out for a 5K, the Dri-FIT One Tank keeps you dry with soft, curved-hem coverage.",
    "details": [
      "Breathable, lightweight jersey fabric wicks sweat for quick evaporation",
      "Wide armholes let you move freely through shoulder presses and dumbbell flys",
      "Curved hemline provides modest coverage through deep stretches and bends",
      "Subtle center-back seam enhances tailored drape"
    ],
    "price": 35,
    "stock": 60,
    "categorySlug": "clothing",
    "gender": "women",
    "sport": "training",
    "badge": "Dri-FIT One",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "White / Black",
      "Black / White",
      "Guava Ice"
    ],
    "colorway": "White / Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-TNK-ONE-WHT"
  },
  {
    "name": "SPORTIX Bella Kai 5",
    "slug": "sportix-bella-kai-5",
    "subtitle": "Women's Studio & Mat Training Shoes",
    "description": "Power your workouts with stability and plush cushioning. The Bella Kai 5 combines Max Air cushioning in the heel with a flat, stable outsole for squats and machine work.",
    "details": [
      "Max Air unit in the heel cushions heavy foot impacts during gym sets",
      "Flat sole keeps you grounded on gym floorboards and platform weights",
      "Textured mesh upper is light, breathable and flexible",
      "Sleeve-like internal fit allows easy step-in convenience"
    ],
    "price": 85,
    "stock": 35,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "training",
    "badge": "Gym Studio",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": false,
    "colors": [
      "Platinum Violet / White / Metallic Silver",
      "Black / Rose Gold"
    ],
    "colorway": "Platinum Violet / White / Metallic Silver",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-BEL5-W-PLT"
  },
  {
    "name": "SPORTIX Air Max Dia SE",
    "slug": "sportix-air-max-dia-women",
    "subtitle": "Women's Elevated Air Platform Kicks",
    "description": "Designed specifically for a woman's foot. The Air Max Dia delivers a lifted, airy aesthetic with a sleek, minimalist translucent upper and exaggerated Max Air midsole unit.",
    "details": [
      "Max Air unit in the heel surrounded by clear TPU provides elevated street presence",
      "Minimal synthetic and textile upper offers modern lightweight transparency",
      "Exaggerated foam midsole delivers lightweight all-day cushioning",
      "Rubber around the perimeter of the outsole provides reliable traction"
    ],
    "price": 120,
    "stock": 38,
    "categorySlug": "shoes",
    "gender": "women",
    "sport": "lifestyle",
    "badge": "Platform Air",
    "isFeatured": true,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Summit White / Black / Laser Fuchsia",
      "Pale Ivory / Bio Beige"
    ],
    "colorway": "Summit White / Black / Laser Fuchsia",
    "sizes": [
      "US 6",
      "US 6.5",
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DIA-W-FUC"
  },
  {
    "name": "SPORTIX Dynamo GO (Kids)",
    "slug": "sportix-dynamo-go-kids",
    "subtitle": "Kids' Fold-Down Collapsible Heel Kicks",
    "description": "Easy on, easy off, always ready to run. The Dynamo GO features an ingenious collapsible heel that lets kids step down on the back, slide their toes in, and watch the heel pop right back up.",
    "details": [
      "Collapsible step-in heel lets kids get shoes on and off without untying or needing help",
      "Soft and flexible textile upper helps little feet stay comfortable on the go",
      "Squishy foam sole has wavy flex lines for natural movement when running",
      "Rubber pods on the toe and heel add long-lasting playground durability"
    ],
    "price": 55,
    "stock": 50,
    "categorySlug": "shoes",
    "gender": "kids",
    "sport": "lifestyle",
    "badge": "Step-In Heel",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Game Royal / University Gold / White",
      "Pink Foam / Elemental Pink",
      "Black / White"
    ],
    "colorway": "Game Royal / University Gold / White",
    "sizes": [
      "US 11C",
      "US 12C",
      "US 13C",
      "US 1Y",
      "US 2Y",
      "US 3Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-DYN-K-ROY"
  },
  {
    "name": "Air Jordan 1 Mid SE (Kids)",
    "slug": "air-jordan-1-mid-se-kids",
    "subtitle": "Kids' Hardwood Legend Shoes",
    "description": "Start your young hooper in legendary heritage. The Air Jordan 1 Mid SE features durable genuine leather, plush ankle padding, and iconic Wings logo styling scaled perfectly for youth feet.",
    "details": [
      "Real and synthetic leather upper provides structure and durability for active kids",
      "Solid rubber outsole with pivot circle pattern provides classic traction",
      "Encapsulated heel Air unit cushions playground jumps and basketball cuts",
      "Padded collar wraps the ankle with soft, comfortable support"
    ],
    "price": 85,
    "stock": 42,
    "categorySlug": "flight",
    "gender": "kids",
    "sport": "basketball",
    "badge": "Youth Flight",
    "isFeatured": true,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "University Blue / White / Black",
      "Chicago Red / White / Black"
    ],
    "colorway": "University Blue / White / Black",
    "sizes": [
      "US 1Y",
      "US 1.5Y",
      "US 2Y",
      "US 2.5Y",
      "US 3Y",
      "US 3.5Y",
      "US 4Y",
      "US 5Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "AIR-JD1M-K-BLU"
  },
  {
    "name": "SPORTIX Air Max 90 Leather (Kids)",
    "slug": "sportix-air-max-90-leather-kids",
    "subtitle": "Kids' Heritage Running Shoes",
    "description": "The 90s legend, sized down for the next generation of champions. Made with real and synthetic leather that is durable and easy to wipe clean after recess and park adventures.",
    "details": [
      "Real and synthetic leather construction is durable and easy to clean",
      "Max Air unit combined with soft foam cushioning gives lightweight bounce",
      "Flexible rubber Waffle sole provides durable multi-surface playground grip",
      "Extra padding around the ankle collar gives a plush, locked-in feel"
    ],
    "price": 75,
    "stock": 45,
    "categorySlug": "shoes",
    "gender": "kids",
    "sport": "lifestyle",
    "badge": "Classic 90",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Triple White",
      "Black / White",
      "White / University Red"
    ],
    "colorway": "Triple White",
    "sizes": [
      "US 1Y",
      "US 2Y",
      "US 3Y",
      "US 4Y",
      "US 5Y",
      "US 6Y"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-AM90-K-WHT"
  },
  {
    "name": "SPORTIX Club Fleece Kids Full-Zip Hoodie",
    "slug": "sportix-club-fleece-kids-hoodie",
    "subtitle": "Kids' Soft Brushed Cozy Fleece",
    "description": "The go-to layer for chilly mornings, recess tag, and weekend sports practices. Made with our most popular Club Fleece fabric that is brushed inside for ultra-soft warmth.",
    "details": [
      "Club Fleece is smooth on the outside and super soft on the inside for all-day comfort",
      "Full-length front zipper makes layering on and off effortless during gym class",
      "Ribbed cuffs and hem help keep the sleeves in place while running and climbing",
      "Front split kangaroo pockets keep hands warm and hold small toys"
    ],
    "price": 45,
    "stock": 55,
    "categorySlug": "clothing",
    "gender": "kids",
    "sport": "lifestyle",
    "badge": "Kids Fleece",
    "isFeatured": false,
    "isNew": false,
    "isBestseller": true,
    "colors": [
      "Carbon Heather / White",
      "Black / White",
      "Game Royal / White"
    ],
    "colorway": "Carbon Heather / White",
    "sizes": [
      "XS (6-7)",
      "S (8-9)",
      "M (10-12)",
      "L (14-16)",
      "XL (18-20)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-HD-K-CLB-GRY"
  },
  {
    "name": "SPORTIX Dri-FIT Trophy Kids Athletic Shorts",
    "slug": "sportix-trophy-kids-athletic-shorts",
    "subtitle": "Kids' Lightweight Playground Shorts",
    "description": "Champion comfort for sports and play. The Trophy shorts feature Dri-FIT sweat-wicking knit fabric, an elastic waistband with interior drawcord, and loose fit for maximum running speed.",
    "details": [
      "Dri-FIT technology moves sweat away from little athletes’ skin for quicker evaporation",
      "Lightweight knit fabric is smooth and breathable on hot summer afternoons",
      "Elastic waistband with internal drawcord gives a snug, slip-free fit",
      "Side hand pockets provide quick storage for playground treasures"
    ],
    "price": 28,
    "stock": 65,
    "categorySlug": "clothing",
    "gender": "kids",
    "sport": "training",
    "badge": "Dri-FIT Kids",
    "isFeatured": false,
    "isNew": true,
    "isBestseller": true,
    "colors": [
      "Black / White",
      "Game Royal / White",
      "University Red / Black"
    ],
    "colorway": "Black / White",
    "sizes": [
      "XS (6-7)",
      "S (8-9)",
      "M (10-12)",
      "L (14-16)",
      "XL (18-20)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"
    ],
    "sku": "SPX-SH-K-TRP-BLK"
  }
];

export const SEED_COUPONS = [
  {
    "code": "APP15",
    "discountType": "PERCENTAGE",
    "discountValue": 15,
    "minOrder": 50,
    "isActive": true
  },
  {
    "code": "SPORTIX10",
    "discountType": "PERCENTAGE",
    "discountValue": 10,
    "minOrder": 50,
    "isActive": true
  },
  {
    "code": "SPORTIX20",
    "discountType": "PERCENTAGE",
    "discountValue": 20,
    "minOrder": 100,
    "isActive": true
  },
  {
    "code": "MEMBER25",
    "discountType": "FIXED",
    "discountValue": 25,
    "minOrder": 150,
    "isActive": true
  }
];
