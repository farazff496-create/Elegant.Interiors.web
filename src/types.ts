export interface SiteSettings {
  businessName: string;
  tagline: string;
  officialWebsite: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  googleReviewUrl: string;
  googleRating: number;
  reviewCount: number;
  heroHeadline: string;
  heroSubtitle: string;
  heroCta1: string;
  heroCta2: string;
  heroCta3: string;
  businessHours: string;
  aboutIntro: string;
  aboutVision: string;
  aboutMission: string;
  aboutPhilosophy: string;
  constructionExpertise: string;
  projectManagement: string;
  qualityCommitment: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    whatsapp: string;
  };
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  googleSearchConsoleTag?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  featured: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  scope: string;
  area: string;
  year: string;
  description: string;
  image: string;
  gallery: string[];
  featured: boolean;
  hasBeforeAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  projectType: string;
  source: string;
  verified: boolean;
}

export interface InquiryMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
  notes?: string;
}

export interface DashboardStats {
  totalVisitors: number;
  totalMessages: number;
  newMessages: number;
  readMessages: number;
  totalProjects: number;
  totalServices: number;
  publishedReviews: number;
  googleRating: number;
  reviewCount: number;
}
