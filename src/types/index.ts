export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  category: ProductCategory;
  brand?: string;
  images: string[];
  specifications: Record<string, string>;
  isActive: boolean;
  isFeatured: boolean;
  requiresInstallation: boolean;
  weightKg?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory =
  | "solar_panels"
  | "inverters"
  | "batteries"
  | "charge_controllers"
  | "accessories"
  | "systems";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentReference?: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  interest?: string;
  message: string;
  referralSource?: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  authorId?: string;
  status: "draft" | "published" | "scheduled";
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  readTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerTitle?: string;
  customerLocation?: string;
  content: string;
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "manager" | "support";
  isActive: boolean;
}
