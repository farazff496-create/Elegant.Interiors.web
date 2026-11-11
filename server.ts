import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Increase payload limits for base64 architectural photos
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed database
const defaultData = {
  siteSettings: {
    businessName: "Elegant Interiors & Construction",
    tagline: "Interior Architect Office & Construction Company",
    officialWebsite: "https://elegantinteriors.com.pk",
    phone: "0331 3404441",
    whatsapp: "+923313404441",
    email: "info@elegantinteriors.com.pk",
    address: "Barkat Market, 61 BB Central Plaza, New Commercial Area, Garden Town, Lahore, 54000, Pakistan",
    googleMapsUrl: "https://maps.app.goo.gl/LP6N3UtNVaLG8v477",
    googleReviewUrl: "https://maps.app.goo.gl/LP6N3UtNVaLG8v477",
    googleRating: 4.7,
    reviewCount: 26,
    heroHeadline: "Transforming Spaces Into Timeless Experiences",
    heroSubtitle: "Architectural Design | Construction | Interior Design | Turnkey Projects",
    heroCta1: "Explore Our Projects",
    heroCta2: "Get a Free Consultation",
    heroCta3: "Contact Us",
    businessHours: "Monday - Saturday: 10:00 AM - 7:00 PM | Sunday: Closed",
    aboutIntro: "Elegant Interiors & Construction is an esteemed interior architect office and construction company headquartered in Garden Town, Lahore. We harmonize visionary architecture with turnkey engineering, crafting residences, corporate headquarters, and bespoke spaces that withstand the test of time.",
    aboutVision: "To pioneer timeless architectural environments and luxury living spaces that elevate human experience through precision engineering, bespoke craftsmanship, and sustainable aesthetics.",
    aboutMission: "Delivering turnkey architectural and construction excellence across Pakistan, translating client dreams into physical masterpieces with complete transparency and zero compromises.",
    aboutPhilosophy: "Every line drawn and every brick laid is guided by the philosophy that authentic luxury is the seamless fusion of proportion, functional elegance, and enduring structural integrity.",
    constructionExpertise: "With an established presence in Lahore's most prestigious enclaves—including DHA, Gulberg, and Garden Town—our turnkey construction team oversees grey structure, MEP engineering, high-end finishing, and custom woodwork with millimeter precision.",
    projectManagement: "Our rigorous project governance provides clients with milestones, bill-of-quantities (BOQ) discipline, weekly on-site QA reports, and meticulous timeline adherence.",
    qualityCommitment: "We select only certified structural steel, grade-A porcelain, seasoned solid hardwoods, and premium architectural hardware, backed by our comprehensive warranty.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      whatsapp: "https://wa.me/923313404441"
    },
    seoTitle: "Elegant Interiors & Construction | Architectural & Turnkey Studio Lahore",
    seoDescription: "Premier architectural design, luxury interior design, and turnkey construction company in Lahore, Pakistan.",
    seoKeywords: "Interior Design Lahore, Architecture Firm Lahore, Turnkey Construction Pakistan, Garden Town Interior Architect, Barkat Market Construction, Luxury Home Decor Lahore",
    googleSearchConsoleTag: ""
  },
  services: [
    {
      id: "srv-1",
      title: "Architectural Design",
      category: "Design",
      tagline: "Innovative, bespoke blueprints and spatial layouts",
      description: "Comprehensive 2D & 3D architectural master planning, structural drafting, exterior elevations, and permit-ready municipal drawings tailored to contemporary aesthetics and local climate requirements.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Site Analysis & Zoning", "3D Photorealistic Exterior Renders", "Floor Plans & Structural Framing", "Municipal Submission Packages"],
      featured: true
    },
    {
      id: "srv-2",
      title: "Construction",
      category: "Building",
      tagline: "High-grade structural construction from foundation to roof",
      description: "End-to-end civil construction services adhering to strict seismic and load-bearing standards. We manage excavation, RCC framing, brick masonry, slab casting, and premium waterproofing.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Soil Testing & Foundation Piling", "Seismic-Compliant Grey Structure", "MEP (Mechanical, Electrical, Plumbing)", "Advanced Thermal & Moisture Insulation"],
      featured: true
    },
    {
      id: "srv-3",
      title: "Interior Design",
      category: "Interior",
      tagline: "Timeless luxury interior architecture and curated palettes",
      description: "Tailored interior solutions balancing functionality and understated opulence. From false ceilings and custom lighting design to imported Italian stone, bespoke wall textures, and luxury furnishings.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Space Planning & Layout Strategy", "3D Photorealistic Interior Walkthroughs", "False Ceiling & Lighting Schematics", "Material Moodboards & Custom Joinery"],
      featured: true
    },
    {
      id: "srv-4",
      title: "Turnkey Projects",
      category: "Turnkey",
      tagline: "Single-point responsibility from bare ground to handover",
      description: "Complete hassle-free project execution where we oversee everything: architectural blueprints, material procurement, grey construction, interior finishing, and smart home automation until key handover.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Fixed Budget & Milestone Guarantees", "Comprehensive Material Procurement", "Dedicated Site Engineers & Supervisors", "Key Handover Ready for Living"],
      featured: true
    },
    {
      id: "srv-5",
      title: "Customise",
      category: "Bespoke",
      tagline: "Made-to-order architectural elements and custom woodwork",
      description: "Bespoke architectural woodwork, custom wardrobes, signature vanity units, CNC metal screens, imported marble waterjet inlays, and customized artisanal furniture pieces crafted for unique spaces.",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Custom Wood Joinery & Cabinetry", "Bespoke Metal & Glass Partitions", "Tailored Stone & Marble Inlays", "Signature Feature Walls"],
      featured: false
    },
    {
      id: "srv-6",
      title: "Construction Projects",
      category: "Commercial & Civil",
      tagline: "Large-scale commercial, institutional, and residential builds",
      description: "Execution of multistory residential complexes, commercial plazas, corporate offices, and retail showrooms with rigorous BOQ control, daily safety compliance, and certified site supervisors.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Commercial Plaza Grey & Finishing", "Multi-Unit Housing Developments", "Contractual Safety & Quality Audits", "HVAC & Fire Safety Infrastructure"],
      featured: false
    },
    {
      id: "srv-7",
      title: "Exterior Design",
      category: "Exterior",
      tagline: "Striking facade treatments, boundary walls, and illumination",
      description: "Distinctive facade architecture combining porcelain tiles, louvers, HPL sheets, fair-faced concrete, and dynamic architectural accent illumination that commands immediate curb appeal.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Facade Redesign & Cladding", "Boundary Wall & Gate Detailing", "Architectural Landscape Integration", "Exterior Night Lighting Design"],
      featured: false
    },
    {
      id: "srv-8",
      title: "House Decor",
      category: "Decor",
      tagline: "Refined accessories, soft furnishings, and art curation",
      description: "Curating the emotional atmosphere of your home through bespoke textiles, imported wallpaper accents, curated artwork, acoustic panels, bespoke rugs, and handcrafted decorative elements.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Curtain & Window Treatments", "Art & Sculptural Curation", "Luxury Area Rugs & Soft Furnishings", "Decorative Accent Accessories"],
      featured: false
    },
    {
      id: "srv-9",
      title: "Interior Decor",
      category: "Decor",
      tagline: "Elevated stylistic styling for residential and corporate spaces",
      description: "Detailed interior styling that elevates every corner. We optimize color harmony, tactile textures, indoor landscaping, ambient scenting, and bespoke accent furniture to define personal identity.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Color Palette Formulation", "Furniture Arrangement & Ergonomics", "Biophilic Indoor Greenery", "Seasonal Interior Refreshing"],
      featured: false
    },
    {
      id: "srv-10",
      title: "Project Management Services",
      category: "Management",
      tagline: "Transparent supervision, schedule tracking, and vendor control",
      description: "Independent or integrated owner's representation. We oversee contractors, audit material invoices, monitor critical path schedules, conduct rigorous quality checks, and eliminate costly delays.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Gantt Chart Milestone Management", "Material Bill-of-Quantities (BOQ) Audit", "Third-Party Concrete & Steel Lab Tests", "Weekly Photographic Progress Reports"],
      featured: false
    },
    {
      id: "srv-11",
      title: "Residence Architecture",
      category: "Residential",
      tagline: "Custom luxury villas, contemporary bungalows, and estates",
      description: "Specialized architectural practice for 10 Marla, 1 Kanal, 2 Kanal, and luxury farmhouse residences across Lahore. We maximize natural daylight, airflow, privacy, and family lifestyle requirements.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Custom Luxury Bungalow Plans", "Double-Height Lobby & Atrium Design", "Basement & Home Cinema Planning", "Sunlight & Ventilation Optimization"],
      featured: false
    },
    {
      id: "srv-12",
      title: "Residential Properties",
      category: "Residential",
      tagline: "Property development, turnkey remodeling, and luxury expansions",
      description: "Upgrading existing residential properties into modern luxury showpieces. Complete structural extensions, addition of master suites, rooftop garden terraces, and modern floor plan conversions.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Full Home Renovation & Modernization", "Rooftop Terrace & Pergola Design", "Kitchen & Bathroom Overhauls", "Value Appreciation Upgrades"],
      featured: false
    },
    {
      id: "srv-13",
      title: "Value Engineering",
      category: "Engineering",
      tagline: "Optimizing architectural costs without compromising luxury or strength",
      description: "In-depth technical analysis of architectural specifications to recommend cost-effective structural solutions, alternate high-performance materials, and energy-efficient building envelopes.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
      deliverables: ["Structural Weight & Steel Optimization", "Cost-to-Benefit Material Analysis", "Energy Efficiency & Thermal Audits", "Life-Cycle Cost Reduction"],
      featured: false
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "The Al-Miraj Contemporary Villa",
      category: "Residential Projects",
      location: "DHA Phase 6, Lahore",
      scope: "Turnkey Architecture & Interior Finishing",
      area: "1 Kanal (4,500 sq ft)",
      year: "2024",
      description: "A masterclass in modern tropical brutalism and warm minimalism. Features a double-height travertine marble foyer, custom walnut joinery, smart automated climate control, and an internal courtyard with cascading water fountain.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: true,
      hasBeforeAfter: true,
      beforeImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?q=80&w=1200&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "proj-2",
      title: "The Obsidian Executive Headquarters",
      category: "Office Interiors",
      location: "Gulberg III, Lahore",
      scope: "Commercial Interior Design & Execution",
      area: "6,200 sq ft",
      year: "2024",
      description: "Corporate workspace designed for high-performance productivity and sophisticated brand presence. Incorporates acoustic slatted timber paneling, concealed magnetic track lighting, ergonomic executive suites, and private boardrooms.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: true,
      hasBeforeAfter: false
    },
    {
      id: "proj-3",
      title: "Garden Town Modernist Bungalow",
      category: "Residence Architecture",
      location: "Garden Town, Lahore",
      scope: "Full Structural Construction & Facade Redesign",
      area: "2 Kanal (9,000 sq ft)",
      year: "2023",
      description: "Strategically located near Central Plaza, this estate harmonizes raw architectural concrete with brushed brass screening and lush biophilic perimeter gardens. Completed on time with value engineering.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: true,
      hasBeforeAfter: true,
      beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "proj-4",
      title: "Cantt Luxury Penthouse Remodel",
      category: "Interior Design",
      location: "Lahore Cantt",
      scope: "Turnkey Interior Decor & Custom Joinery",
      area: "3,800 sq ft",
      year: "2024",
      description: "A luxurious sky residence featuring customized book-matched Statuario marble flooring, bespoke velvet banquettes, fluted oak partitions, and a panoramic rooftop dining pergola.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: true,
      hasBeforeAfter: true,
      beforeImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "proj-5",
      title: "Barkat Commercial Plaza Facade",
      category: "Exterior Design",
      location: "Barkat Market, Lahore",
      scope: "Commercial Renovation & Cladding",
      area: "12,000 sq ft",
      year: "2023",
      description: "Revitalization of a high-traffic commercial building in Barkat Market. Features energy-efficient low-E curtain wall glazing, dark charcoal composite aluminum cladding, and integrated illuminated signage.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: false,
      hasBeforeAfter: false
    },
    {
      id: "proj-6",
      title: "Model Town Heritage Residence",
      category: "Turnkey Projects",
      location: "Model Town, Lahore",
      scope: "Turnkey Architecture & Full Renovation",
      area: "2 Kanal Estate",
      year: "2024",
      description: "Sympathetic contemporary expansion of a traditional Model Town family residence. Preserved historical sightlines while integrating modern open-concept living, solar thermal insulation, and a gourmet chef kitchen.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
      ],
      featured: true,
      hasBeforeAfter: false
    }
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Qaisar G",
      rating: 5,
      date: "2 months ago",
      text: "Very good experience in turnkey project, Excellent 3D design, excellent execution team work.",
      projectType: "Turnkey Project",
      source: "Google Reviews",
      verified: true
    },
    {
      id: "rev-2",
      author: "Muhammad Naveed",
      rating: 5,
      date: "3 months ago",
      text: "One of the best Interior Design company. Excellent execution as per design.",
      projectType: "Interior Design",
      source: "Google Reviews",
      verified: true
    },
    {
      id: "rev-3",
      author: "Jamshed Khan",
      rating: 5,
      date: "4 months ago",
      text: "Have a great experience with interior design and turnkey basis project.",
      projectType: "Turnkey Basis Project",
      source: "Google Reviews",
      verified: true
    },
    {
      id: "rev-4",
      author: "tahir mughal",
      rating: 5,
      date: "5 months ago",
      text: "Excellent interior design services! Masha Allah superb quality. Highly recommended!",
      projectType: "Interior Design Services",
      source: "Google Reviews",
      verified: true
    },
    {
      id: "rev-5",
      author: "Tariq Lodhi",
      rating: 5,
      date: "6 months ago",
      text: "Excellent services with client and vendors. Keep it up.",
      projectType: "Client & Vendor Coordination",
      source: "Google Reviews",
      verified: true
    },
    {
      id: "rev-6",
      author: "saqib awan",
      rating: 5,
      date: "7 months ago",
      text: "Mash Allah, Excellent interior design services!",
      projectType: "Interior Architecture",
      source: "Google Reviews",
      verified: true
    }
  ],
  messages: [
    {
      id: "msg-101",
      name: "Chaudhry Bilal",
      phone: "0300 8472911",
      email: "bilal.chaudhry@example.com",
      service: "Turnkey Projects",
      budget: "PKR 25 Million - 40 Million",
      message: "Looking for turnkey construction and architectural design for our 1-Kanal plot in DHA Phase 7. We want modern minimalist elevation with premium interior finishes.",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      read: false,
      replied: false,
      notes: "High priority commercial / residential client."
    },
    {
      id: "msg-102",
      name: "Dr. Ayesha Malik",
      phone: "0321 4455890",
      email: "ayesha.malik@example.com",
      service: "Interior Design",
      budget: "PKR 10 Million - 15 Million",
      message: "We need complete interior redesign for our apartment in Gulberg, including custom false ceilings, marble accent wall, and living room lighting.",
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      read: true,
      replied: true,
      notes: "Replied via WhatsApp with portfolio brochure."
    }
  ],
  stats: {
    totalVisitors: 1482,
    todayVisitors: 74
  },
  admin: {
    email: "admin@elegantinteriors.com.pk",
    // simple secure password check
    password: "ElegantAdmin2026!"
  }
};

// In-memory cache + persistent disk synchronization
let db = { ...defaultData };

function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      db = { ...defaultData, ...parsed };
    } else {
      saveDb();
    }
  } catch (err) {
    console.error("Failed to load db.json, using default seed:", err);
    saveDb();
  }
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to save db.json:", err);
  }
}

loadDb();

// Simple auth middleware for protected admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized. Admin token missing." });
  }
  const token = authHeader.replace("Bearer ", "").trim();
  // We accept valid session token or default admin token
  if (token === "elegant-admin-session-active" || token === "eic-secure-token-2026") {
    return next();
  }
  return res.status(403).json({ error: "Invalid admin authentication token." });
}

// ---------------- PUBLIC API ROUTES ----------------

// Get general site public data
app.get('/api/site-data', (req: Request, res: Response) => {
  res.json({
    settings: db.siteSettings,
    services: db.services,
    projects: db.projects,
    reviews: db.reviews,
    rating: {
      average: db.siteSettings.googleRating,
      count: db.siteSettings.reviewCount
    }
  });
});

// Track page visit
app.post('/api/track-visit', (req: Request, res: Response) => {
  db.stats.totalVisitors += 1;
  db.stats.todayVisitors += 1;
  saveDb();
  res.json({ success: true, total: db.stats.totalVisitors });
});

// Services public route
app.get('/api/services', (req: Request, res: Response) => {
  res.json(db.services);
});

// Projects public route
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(db.projects);
});

// Reviews public route
app.get('/api/reviews', (req: Request, res: Response) => {
  res.json({
    rating: db.siteSettings.googleRating,
    count: db.siteSettings.reviewCount,
    reviews: db.reviews
  });
});

// Public contact message inquiry submission
app.post('/api/messages', (req: Request, res: Response) => {
  try {
    const { name, phone, email, service, budget, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: "Please provide your Name, Phone Number, and Message." });
    }

    const newMessage = {
      id: "msg-" + Date.now(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      service: service || "General Inquiry",
      budget: budget || "Not Specified",
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      read: false,
      replied: false,
      notes: ""
    };

    db.messages.unshift(newMessage);
    saveDb();

    res.status(201).json({
      success: true,
      message: "Thank you for contacting Elegant Interiors & Construction. Our principal architect will contact you shortly.",
      inquiryId: newMessage.id
    });
  } catch (error) {
    console.error("Error creating inquiry message:", error);
    res.status(500).json({ error: "Failed to submit message inquiry. Please call 0331 3404441 directly." });
  }
});

// ---------------- ADMIN AUTHENTICATION ----------------

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Compare with stored admin or allow default admin credentials
  const cleanEmail = String(email).trim().toLowerCase();
  const isValidEmail = cleanEmail === db.admin.email.toLowerCase() || cleanEmail === "admin@elegantinteriors.com.pk";
  const isValidPassword = password === db.admin.password || password === "ElegantAdmin2026!";

  if (isValidEmail && isValidPassword) {
    return res.json({
      success: true,
      token: "elegant-admin-session-active",
      user: {
        email: db.admin.email,
        role: "Principal Architect / Admin",
        name: "Admin Office"
      }
    });
  }

  return res.status(401).json({ error: "Invalid email or password. Please check your credentials." });
});

app.get('/api/admin/verify', requireAdmin, (req: Request, res: Response) => {
  res.json({
    valid: true,
    user: {
      email: db.admin.email,
      role: "Principal Architect / Admin",
      businessName: db.siteSettings.businessName
    }
  });
});

app.post('/api/admin/change-password', requireAdmin, (req: Request, res: Response) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }
  db.admin.password = newPassword;
  saveDb();
  res.json({ success: true, message: "Admin password updated successfully." });
});

// ---------------- ADMIN DASHBOARD STATS ----------------

app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
  const unreadMessages = db.messages.filter(m => !m.read).length;
  res.json({
    totalVisitors: db.stats.totalVisitors,
    totalMessages: db.messages.length,
    newMessages: unreadMessages,
    readMessages: db.messages.length - unreadMessages,
    totalProjects: db.projects.length,
    totalServices: db.services.length,
    publishedReviews: db.reviews.length,
    googleRating: db.siteSettings.googleRating,
    reviewCount: db.siteSettings.reviewCount
  });
});

// ---------------- ADMIN MESSAGE MANAGEMENT ----------------

app.get('/api/admin/messages', requireAdmin, (req: Request, res: Response) => {
  res.json(db.messages);
});

app.patch('/api/admin/messages/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { read, replied, notes } = req.body;

  const msg = db.messages.find(m => m.id === id);
  if (!msg) {
    return res.status(404).json({ error: "Message not found." });
  }

  if (typeof read === 'boolean') msg.read = read;
  if (typeof replied === 'boolean') msg.replied = replied;
  if (typeof notes === 'string') msg.notes = notes;

  saveDb();
  res.json({ success: true, message: msg });
});

app.delete('/api/admin/messages/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = db.messages.length;
  db.messages = db.messages.filter(m => m.id !== id);

  if (db.messages.length === initialLength) {
    return res.status(404).json({ error: "Message not found." });
  }

  saveDb();
  res.json({ success: true, message: "Inquiry message deleted." });
});

// ---------------- ADMIN WEBSITE CONTENT MANAGEMENT ----------------

app.get('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  res.json(db.siteSettings);
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  db.siteSettings = { ...db.siteSettings, ...req.body };
  saveDb();
  res.json({ success: true, settings: db.siteSettings });
});

// ---------------- ADMIN SERVICES CRUD ----------------

app.post('/api/admin/services', requireAdmin, (req: Request, res: Response) => {
  const { title, category, tagline, description, image, deliverables, featured } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Service title and description are required." });
  }

  const newService = {
    id: "srv-" + Date.now(),
    title: String(title).trim(),
    category: category || "Architecture",
    tagline: tagline || "",
    description: String(description).trim(),
    image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    deliverables: Array.isArray(deliverables) ? deliverables : ["Custom Consultation", "Quality Execution"],
    featured: Boolean(featured)
  };

  db.services.push(newService);
  saveDb();
  res.status(201).json(newService);
});

app.put('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.services.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Service not found." });
  }

  db.services[index] = { ...db.services[index], ...req.body, id };
  saveDb();
  res.json(db.services[index]);
});

app.delete('/api/admin/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = db.services.length;
  db.services = db.services.filter(s => s.id !== id);

  if (db.services.length === initialLength) {
    return res.status(404).json({ error: "Service not found." });
  }

  saveDb();
  res.json({ success: true, message: "Service deleted." });
});

// ---------------- ADMIN PROJECTS CRUD ----------------

app.post('/api/admin/projects', requireAdmin, (req: Request, res: Response) => {
  const { title, category, location, scope, area, year, description, image, gallery, featured, hasBeforeAfter, beforeImage, afterImage } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Project title and description are required." });
  }

  const newProject = {
    id: "proj-" + Date.now(),
    title: String(title).trim(),
    category: category || "Residential Projects",
    location: location || "Lahore, Pakistan",
    scope: scope || "Turnkey Architecture & Interior Finishing",
    area: area || "1 Kanal",
    year: year || "2024",
    description: String(description).trim(),
    image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    gallery: Array.isArray(gallery) && gallery.length > 0 ? gallery : [image],
    featured: Boolean(featured),
    hasBeforeAfter: Boolean(hasBeforeAfter),
    beforeImage: beforeImage || "",
    afterImage: afterImage || ""
  };

  db.projects.unshift(newProject);
  saveDb();
  res.status(201).json(newProject);
});

app.put('/api/admin/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found." });
  }

  db.projects[index] = { ...db.projects[index], ...req.body, id };
  saveDb();
  res.json(db.projects[index]);
});

app.delete('/api/admin/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== id);

  if (db.projects.length === initialLength) {
    return res.status(404).json({ error: "Project not found." });
  }

  saveDb();
  res.json({ success: true, message: "Project deleted." });
});

// ---------------- ADMIN REVIEWS CRUD ----------------

app.post('/api/admin/reviews', requireAdmin, (req: Request, res: Response) => {
  const { author, rating, text, date, projectType, source, verified } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: "Review author and text are required." });
  }

  const newReview = {
    id: "rev-" + Date.now(),
    author: String(author).trim(),
    rating: Number(rating) || 5,
    date: date || "Recently",
    text: String(text).trim(),
    projectType: projectType || "Interior Design & Turnkey",
    source: source || "Google Reviews",
    verified: verified !== false
  };

  db.reviews.unshift(newReview);
  saveDb();
  res.status(201).json(newReview);
});

app.put('/api/admin/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.reviews.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Review not found." });
  }

  db.reviews[index] = { ...db.reviews[index], ...req.body, id };
  saveDb();
  res.json(db.reviews[index]);
});

app.delete('/api/admin/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = db.reviews.length;
  db.reviews = db.reviews.filter(r => r.id !== id);

  if (db.reviews.length === initialLength) {
    return res.status(404).json({ error: "Review not found." });
  }

  saveDb();
  res.json({ success: true, message: "Review deleted." });
});

// ---------------- SITEMAP AND ROBOTS.TXT ----------------

app.get('/robots.txt', (req: Request, res: Response) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://elegantinteriors.com.pk/sitemap.xml\n');
});

app.get('/sitemap.xml', (req: Request, res: Response) => {
  res.type('application/xml');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elegantinteriors.com.pk/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://elegantinteriors.com.pk/#services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elegantinteriors.com.pk/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elegantinteriors.com.pk/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elegantinteriors.com.pk/#reviews</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elegantinteriors.com.pk/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  res.send(xml);
});

// ---------------- VITE MIDDLEWARE & STATIC SERVING ----------------

async function startServer() {
  if (!isProduction) {
    // Dynamic import to avoid bundling Vite in production build
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static files from dist
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[EIC Server] Elegant Interiors & Construction server running on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
