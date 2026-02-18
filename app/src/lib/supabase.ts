import { createClient } from '@supabase/supabase-js';
import type { MenuItem, Review, Reservation, GalleryItem, RestaurantInfo } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Menu Items API
export const menuApi = {
  getAll: async (category?: string) => {
    let query = supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as MenuItem[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as MenuItem;
  },

  create: async (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data as MenuItem;
  },

  update: async (id: string, item: Partial<MenuItem>) => {
    const { data, error } = await supabase
      .from('menu_items')
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as MenuItem;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  uploadImage: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('menu-images')
      .upload(path, file);
    if (error) throw error;
    return data;
  },

  uploadVideo: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('menu-videos')
      .upload(path, file);
    if (error) throw error;
    return data;
  },
};

// Reviews API
export const reviewsApi = {
  getAll: async (approvedOnly = true) => {
    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (approvedOnly) {
      query = query.eq('is_approved', true);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as Review[];
  },

  create: async (review: Omit<Review, 'id' | 'created_at' | 'is_approved'>) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert({ ...review, is_approved: false })
      .select()
      .single();
    if (error) throw error;
    return data as Review;
  },

  update: async (id: string, review: Partial<Review>) => {
    const { data, error } = await supabase
      .from('reviews')
      .update(review)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Review;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  approve: async (id: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Review;
  },
};

// Reservations API
export const reservationsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('reservation_date', { ascending: true });
    if (error) throw error;
    return data as Reservation[];
  },

  getByDate: async (date: string) => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('reservation_date', date)
      .order('reservation_time', { ascending: true });
    if (error) throw error;
    return data as Reservation[];
  },

  create: async (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    const { data, error } = await supabase
      .from('reservations')
      .insert({ ...reservation, status: 'pending' })
      .select()
      .single();
    if (error) throw error;
    return data as Reservation;
  },

  updateStatus: async (id: string, status: Reservation['status']) => {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Reservation;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Gallery API
export const galleryApi = {
  getAll: async (category?: string) => {
    let query = supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as GalleryItem[];
  },

  getFeatured: async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as GalleryItem[];
  },

  create: async (item: Omit<GalleryItem, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('gallery')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data as GalleryItem;
  },

  update: async (id: string, item: Partial<GalleryItem>) => {
    const { data, error } = await supabase
      .from('gallery')
      .update(item)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as GalleryItem;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  uploadImage: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('gallery-images')
      .upload(path, file);
    if (error) throw error;
    return data;
  },

  uploadVideo: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('gallery-videos')
      .upload(path, file);
    if (error) throw error;
    return data;
  },
};

// Restaurant Info API
export const restaurantApi = {
  getInfo: async () => {
    const { data, error } = await supabase
      .from('restaurant_info')
      .select('*')
      .single();
    if (error) throw error;
    return data as RestaurantInfo;
  },

  update: async (info: Partial<RestaurantInfo>) => {
    const { data, error } = await supabase
      .from('restaurant_info')
      .update({ ...info, updated_at: new Date().toISOString() })
      .eq('id', '1')
      .select()
      .single();
    if (error) throw error;
    return data as RestaurantInfo;
  },
};

// Auth API
export const authApi = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Get public URL for storage
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
