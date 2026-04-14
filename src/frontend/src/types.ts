export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cash" | "card" | "upi";

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  ownerId: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: number;
  updatedAt: number;
  notes?: string;
}

export interface CustomerProfile {
  name: string;
  phone?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
