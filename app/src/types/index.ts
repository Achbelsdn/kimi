// Types pour La Réserve Restaurant

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks' | 'wines';
  image_url?: string;
  video_url?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  comment: string;
  cuisine_rating?: number;
  service_rating?: number;
  ambiance_rating?: number;
  is_approved: boolean;
  created_at: string;
}

export interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  number_of_guests: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  video_url?: string;
  category: 'interior' | 'food' | 'events' | 'ambiance';
  is_featured: boolean;
  created_at: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  google_maps_url: string;
  opening_hours: OpeningHours;
  social_media: SocialMedia;
  updated_at: string;
}

export interface OpeningHours {
  monday: { open: string | null; close: string | null };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'manager';
  created_at: string;
}

export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks' | 'wines';

export const MENU_CATEGORIES: { value: MenuCategory; label: string; icon: string }[] = [
  { value: 'starters', label: 'Entrées', icon: 'UtensilsCrossed' },
  { value: 'mains', label: 'Plats Principaux', icon: 'ChefHat' },
  { value: 'desserts', label: 'Desserts', icon: 'IceCream' },
  { value: 'drinks', label: 'Boissons', icon: 'Coffee' },
  { value: 'wines', label: 'Vins', icon: 'Wine' },
];

export const GALLERY_CATEGORIES = [
  { value: 'interior', label: 'Intérieur' },
  { value: 'food', label: 'Plats' },
  { value: 'events', label: 'Événements' },
  { value: 'ambiance', label: 'Ambiance' },
] as const;
