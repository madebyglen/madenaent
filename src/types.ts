export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price_at_time: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export type Category = 'all' | 'wallets' | 'belts' | 'knives' | 'batons';
