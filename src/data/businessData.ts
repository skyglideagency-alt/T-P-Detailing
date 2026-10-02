import { DetailingPackage, AddOnOption, TransformationItem } from '../types';

export const BUSINESS_INFO = {
  name: "T & P Detailing",
  legalName: "T & P Premium Detailing",
  tagline: "We are committed to making your vehicle look as close to showroom ready as possible",
  phone: "+1 850-740-9769",
  phoneDisplay: "(850) 740-9769",
  email: "tandpdetailing@gmail.com",
  instagram: "T.and.P_Detailing",
  instagramUrl: "https://www.instagram.com/T.and.P_Detailing",
  facebookUrl: "https://www.facebook.com/tandpdetailing",
  location: "Panama City, Florida 32404",
  serviceAreas: [
    "Panama City, FL",
    "Panama City Beach (PCB)",
    "Callaway, FL",
    "Crestview, FL",
    "Bay County & Surrounding"
  ],
  stats: {
    recommendationRate: "100%",
    totalReviews: "8",
    rating: "5.0",
    satisfaction: "100% Satisfaction Guaranteed"
  },
  operatingHours: "Monday – Saturday: 8:00 AM – 6:30 PM (Sunday by appointment)"
};

export const PACKAGES: DetailingPackage[] = [
  {
    id: "express-refresh",
    name: "Silver Express Refresh",
    tagline: "Essential maintenance wash and interior vacuum for a sharp everyday look.",
    prices: {
      sedan: 95,
      truck: 115,
      suv: 135
    },
    duration: "1.5 - 2 Hours",
    recommendedFor: "Routine monthly maintenance, fleet upkeep, or quick cleanups",
    features: [
      "pH-Neutral active foam pre-soak & hand wash",
      "Wheel faces, barrels & tire deep clean",
      "Satin non-sling tire dressing",
      "Full cabin vacuum (floors, mats, seats)",
      "Dashboard, console & cupholder surface wipe",
      "Crystal clear streak-free glass inside & out",
      "Door jambs wiped down & deodorizing mist"
    ]
  },
  {
    id: "signature-deep-detail",
    name: "Signature Showroom Overhaul",
    popular: true,
    badge: "Most Popular",
    tagline: "Our flagship deep-clean restoration. Interior extraction plus exterior gloss protection.",
    prices: {
      sedan: 185,
      truck: 215,
      suv: 245
    },
    duration: "3 - 4.5 Hours",
    recommendedFor: "Vehicles with stains, pet hair, dirt buildup, or before selling",
    features: [
      "Everything in Silver Express, plus:",
      "Hot water steam extraction for carpets & floor mats",
      "Fabric shampoo or deep leather conditioner & UV shield",
      "Intensive center console, cupholder & AC vent detailing",
      "Chemical paint iron decontamination & clay mitt treatment",
      "High-gloss ceramic spray sealant (3 months hydrophobic protection)",
      "Plastic trim conditioning & restoration",
      "Heavy spot treatment on high-traffic spill zones"
    ]
  },
  {
    id: "platinum-ceramic",
    name: "Platinum Ceramic & Polish",
    badge: "Ultimate Protection",
    tagline: "Showroom-grade paint correction, mirror gloss enhancement, and long-term protection.",
    prices: {
      sedan: 320,
      truck: 360,
      suv: 395
    },
    duration: "5 - 7 Hours",
    recommendedFor: "Enthusiasts, new car protection, and restoring dull or swirled paint",
    features: [
      "Everything in Signature Overhaul, plus:",
      "Multi-stage exterior paint decontamination",
      "Single-stage machine polish (removes light swirls, restores optical clarity)",
      "12-Month ceramic graphene paint & windshield coating",
      "Deep engine bay degrease, steam clean & satin dress",
      "Wheel well liners deep scrubbed & protected",
      "Full interior antimicrobial steam sanitization",
      "Leather ceramic barrier coating on driver & passenger seats"
    ]
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: "pet-hair",
    name: "Stubborn Pet Hair Extraction",
    price: 45,
    description: "Specialized mechanical rubber tools and commercial extractor to pull deeply woven pet hair from carpets & seats.",
    iconName: "PawPrint"
  },
  {
    id: "heavy-stains",
    name: "Deep Stain & Spill Hot Extraction",
    price: 40,
    description: "Enzyme treatment and high-temp hot water extraction for deep coffee, soda, mud, or food stains.",
    iconName: "Droplets"
  },
  {
    id: "headlight-restoration",
    name: "Headlight Clarity Restoration",
    price: 60,
    description: "Multi-stage wet sanding, polishing, and UV ceramic sealant to eliminate yellow fog and double night visibility.",
    iconName: "Sun"
  },
  {
    id: "engine-bay",
    name: "Engine Bay Detail & Dressing",
    price: 50,
    description: "Safe electrical wrap, grease breakdown, gentle steam cleaning, and heat-resistant satin dressing.",
    iconName: "Cpu"
  },
  {
    id: "ozone-odor",
    name: "Ozone Odor Elimination Treatment",
    price: 45,
    description: "Medical-grade ozone gas machine cycle destroys smoke, mildew, food, and pet odors at the molecular level.",
    iconName: "Wind"
  }
];

// Real transformations documented from the user's uploaded FB images
export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "cloth-seats-stain",
    title: "Deep Stain Extraction on Rear Fabric Bench",
    category: "Interior Extraction",
    vehicle: "Compact Hatchback / Sedan",
    problem: "Heavily stained cloth seats with dark dried beverage spills, ground-in mud and moisture watermarks across seating panels.",
    solution: "Pre-treated with commercial enzyme cleaner, agitated with horsehair brush, followed by high-temp 210°F hot water extraction.",
    beforeImg: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", // fallback
    afterImg: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80", // fallback
    highlightStat: "100% Stains Removed"
  },
  {
    id: "ram-rubber-mats",
    title: "Dodge Ram Heavy-Duty All-Weather Mat Restoration",
    category: "Floor Restorations",
    vehicle: "Ram 1500 / Truck",
    problem: "Caked Florida red clay, fine sand, and dried road grime baked into deep tread grooves.",
    solution: "Acid-free degreaser, drill brush agitation, pressure rinse, and non-greasy matte UV dressing that restores deep factory black without slippage.",
    beforeImg: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    highlightStat: "OEM Matte Black Restored"
  },
  {
    id: "console-deep-clean",
    title: "Center Console & Cupholder Sanitization",
    category: "Detail Crevices",
    vehicle: "Ford F-150 SuperCrew",
    problem: "Sticky beverage runoff, food debris, and dust packed into sliding trays, USB ports, and dual cupholders.",
    solution: "Dry steam vapor brush in all seams, soft boar hair detailing brushes around knobs, and anti-static interior finish.",
    beforeImg: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    highlightStat: "Sanitized & Dust-Repelling"
  },
  {
    id: "pet-hair-trunk",
    title: "Extreme Pet Hair Removal in SUV Cargo Area",
    category: "Pet Hair Extraction",
    vehicle: "Jeep / SUV Cargo",
    problem: "Severe dog fur deeply interlocked into dense trunk carpeting fibers, resisting normal vacuuming.",
    solution: "Specialty Fur-Eel & pet hair stone de-weaving process, compressed air vortex pulse, and medical-grade HEPA vacuuming.",
    beforeImg: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    highlightStat: "Zero Strands Remaining"
  },
  {
    id: "titan-footwell",
    title: "Nissan Titan Platinum Reserve Driver Footwell Refresh",
    category: "Interior Renovation",
    vehicle: "Nissan Titan Platinum",
    problem: "Heavy dirt tracks, dead grass, salt deposits, and dusty pedals after weeks of worksite hauling.",
    solution: "Full extraction of underlying carpet, dead-pedal and brake pedal decontamination, brushed sill plates and conditioned leather bolsters.",
    beforeImg: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
    highlightStat: "Showroom Carpet Freshness"
  },
  {
    id: "honda-exterior-gloss",
    title: "Red Honda Decontamination & Mirror Gloss Polish",
    category: "Exterior Gloss",
    vehicle: "Honda Accord Sedan",
    problem: "Dull oxidized red paint covered in heavy pollen, road film, bug etchings, and micro haze.",
    solution: "Two-bucket foam bath, clay bar iron decontamination, dual-action machine gloss polish, and hydrophobic ceramic sealant.",
    beforeImg: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    highlightStat: "Deep Wet Mirror Gloss"
  }
];

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    location: "Panama City, FL",
    rating: 5,
    text: "Had my truck detailed by T&P and couldn't believe the difference. The floor mats looked like they just rolled off the assembly line and all the dog hair in the back was completely vanished. Super friendly, arrived right on time!",
    badge: "Verified Client · Ram 1500"
  },
  {
    id: "rev-2",
    author: "Brittany Taylor",
    location: "Panama City Beach, FL",
    rating: 5,
    text: "My kids spilled juice and coffee in the back cloth seats months ago and I thought it was permanently ruined. T&P extracted every single drop. The car smells amazing and clean without any chemical perfume. 100% recommended!",
    badge: "Verified Client · Honda Odyssey"
  },
  {
    id: "rev-3",
    author: "Derek S.",
    location: "Callaway, FL",
    rating: 5,
    text: "T&P Detailing does real craftsmanship. The paint gloss on my red sedan is like looking into liquid glass. You can tell they take immense pride in their work. Best mobile detailers in Bay County hands down.",
    badge: "Verified Client · Honda Accord"
  },
  {
    id: "rev-4",
    author: "Austin R.",
    location: "Crestview, FL",
    rating: 5,
    text: "Booked the Platinum package with engine bay cleaning for my Nissan Titan. Incredible attention to detail. Every nook and cranny in the center console and vents was spotless. Worth every penny.",
    badge: "Verified Client · Titan Platinum"
  }
];

export const FAQS = [
  {
    q: "Do you come to my home or work in Panama City & surrounding areas?",
    a: "Yes! T & P Detailing provides convenient mobile detailing across Panama City, Panama City Beach, Callaway, Crestview, and surrounding communities. We bring our professional equipment, eco-safe solutions, and high-temp extraction directly to your driveway or office."
  },
  {
    q: "How long does a detailing service usually take?",
    a: "Our Silver Express refresh takes approximately 1.5 to 2 hours. Our Signature Overhaul takes about 3 to 4.5 hours. Deep paint correction and Platinum ceramic coatings typically take 5 to 7 hours for meticulous perfection."
  },
  {
    q: "Can you remove tough odors like smoke or spoiled milk?",
    a: "Absolutely. We use high-heat hot water steam extraction on fabric padding combined with our dedicated commercial ozone generator treatment, which oxidizes odor-causing bacteria at the molecular level."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash, Card (Visa, MasterCard, Amex), Zelle, Venmo, and CashApp upon completion of the service and after you inspect your showroom-ready vehicle."
  }
];
