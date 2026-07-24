import { createClient, type SupabaseClient } from '@supabase/supabase-js';

interface Database {
  public: {
    Tables: {
      restaurant_settings: {
        Row: {
          id: number;
          address: string | null;
          phone: string | null;
          email: string | null;
          hours_fr: string | null;
          hours_en: string | null;
          hours_pt: string | null;
          sunday_fr: string | null;
          sunday_en: string | null;
          sunday_pt: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          hero_subtitle_fr: string | null;
          hero_subtitle_en: string | null;
          hero_subtitle_pt: string | null;
          updated_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['restaurant_settings']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['restaurant_settings']['Insert']>;
      };
      menu_categories: {
        Row: {
          id: string;
          sort_order: number | null;
          name_fr: string;
          name_en: string;
          name_pt: string;
          slug: string;
          created_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['menu_categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['menu_categories']['Insert']>;
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string | null;
          sort_order: number | null;
          name: string;
          description_fr: string | null;
          description_en: string | null;
          description_pt: string | null;
          price: string | null;
          image: string | null;
          chef_pick: boolean | null;
          wine_pairing: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['menu_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['menu_items']['Insert']>;
      };
      hero_images: {
        Row: {
          id: string;
          image_url: string;
          sort_order: number | null;
          active: boolean | null;
          created_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['hero_images']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['hero_images']['Insert']>;
      };
      gallery_images: {
        Row: {
          id: string;
          image_url: string;
          sort_order: number | null;
          caption_fr: string | null;
          caption_en: string | null;
          caption_pt: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['gallery_images']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['gallery_images']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let client: SupabaseClient<Database> | null = null;

export function getSupabase() {
  if (!client) {
    client = createClient<Database>(supabaseUrl, supabaseKey);
  }
  return client;
}
