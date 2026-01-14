export interface Operator {
  id: number;
  name: string;
  image_url: string;
}
export interface Country {
  id: number;
  name: string | null;
  code: string | null;
  image_url: string;
  operators: Operator[];
}
export interface Roulette {
  id: number;
  type: string;
  status: boolean;
  created_at: string;
  amount: number;
}
export interface Commission {
  id: number;
  type: string;
  created_at: string;
  amount: number;
  investment_amount:number,
  roulette_count:number,
  phone:string
}
type WithdrawStatus = "pending" | "processing" | "success" | "failed";

export interface Withdraw {
  id: number
  status: WithdrawStatus;
  created_at: string
  amount: number
  operator?: Operator
  meta?: {
    operator?: Operator
    phone?: string
    tax?: number
    net_amount?: number
  }
}
export interface Formule {
  id: number;
  name: string;
  price: number;
  description?: string;
}
export interface ProductImage {
  id: number;
  name: string;
  src: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  downloable: boolean;
  is_promotion: boolean;
  price: number;
  promotion_price: number;
  description?: string;
  how_it_works?: string;
  category?: Category;
  category_id?: number;
  images?: ProductImage[];
}
interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  promotion_price?: number;
}

export interface Order {
  id: number;
  status: 'pending' | 'waiting' | 'confirmed' | 'failed';
  amount: number;
  amount_rest?: number;
  reference_id?: string;
  created_at: string;
  items: OrderItem[];
}