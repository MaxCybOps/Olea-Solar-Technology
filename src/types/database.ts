export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// ─── Row types (what comes back from SELECT) ─────────────────────────────────

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  category: string;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  is_featured: boolean;
  images: string[];
  video_url: string | null;
  specifications: Json;
  rating: number | null;
  review_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: Json | null;
  status: string;
  payment_status: string;
  payment_reference: string | null;
  subtotal: number;
  shipping_fee: number;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string | null;
  rating: number;
  title: string | null;
  body: string;
  is_approved: boolean;
  is_verified: boolean;
  admin_response: string | null;
  created_at: string;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  type: string;
  status: string;
  created_at: string;
}

export interface StockAdjustRow {
  id: string;
  product_id: string;
  previous_quantity: number;
  new_quantity: number;
  reason: string | null;
  adjusted_by: string | null;
  created_at: string;
}

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: Json;
  category: string | null;
  author: string | null;
  image_url: string | null;
  read_time: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface InstallationRow {
  id: string;
  order_id: string | null;
  customer_name: string;
  customer_phone: string | null;
  address: string;
  scheduled_date: string | null;
  technician_name: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessageRow {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
}

// ─── Insert / Update helpers ──────────────────────────────────────────────────

export type ProductInsert = Omit<ProductRow, "id" | "created_at" | "updated_at">;
export type ProductUpdate = Partial<ProductInsert>;

export type OrderInsert = Omit<OrderRow, "id" | "order_number" | "created_at" | "updated_at">;
export type OrderUpdate = Partial<OrderInsert>;

export type OrderItemInsert = Omit<OrderItemRow, "id" | "created_at">;
export type OrderItemUpdate = Partial<OrderItemInsert>;

export type ReviewInsert = Omit<ReviewRow, "id" | "created_at">;
export type ReviewUpdate = Partial<ReviewInsert>;

export type LeadInsert = Omit<LeadRow, "id" | "created_at">;
export type LeadUpdate = Partial<LeadInsert>;

export type StockAdjustInsert = Omit<StockAdjustRow, "id" | "created_at">;

export type BlogPostInsert = Omit<BlogPostRow, "id" | "created_at" | "updated_at">;
export type BlogPostUpdate = Partial<BlogPostInsert>;

export type InstallationInsert = Omit<InstallationRow, "id" | "created_at" | "updated_at">;
export type InstallationUpdate = Partial<InstallationInsert>;

export type ChatMessageInsert = Omit<ChatMessageRow, "id" | "created_at">;

// ─── Supabase Database generic ────────────────────────────────────────────────
// Must satisfy postgrest-js GenericSchema — each table needs Relationships: [],
// and the schema needs Views and Functions keys.

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
        Relationships: [];
      };
      stock_adjustments: {
        Row: StockAdjustRow;
        Insert: StockAdjustInsert;
        Update: Partial<StockAdjustInsert>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: OrderUpdate;
        Relationships: [];
      };
      order_items: {
        Row: OrderItemRow;
        Insert: OrderItemInsert;
        Update: OrderItemUpdate;
        Relationships: [];
      };
      reviews: {
        Row: ReviewRow;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: LeadUpdate;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: BlogPostInsert;
        Update: BlogPostUpdate;
        Relationships: [];
      };
      site_settings: {
        Row: { key: string; value: string | null; updated_at: string };
        Insert: { key: string; value?: string | null };
        Update: { key?: string; value?: string | null };
        Relationships: [];
      };
      installations: {
        Row: InstallationRow;
        Insert: InstallationInsert;
        Update: InstallationUpdate;
        Relationships: [];
      };
      chat_messages: {
        Row: ChatMessageRow;
        Insert: ChatMessageInsert;
        Update: Partial<ChatMessageInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
