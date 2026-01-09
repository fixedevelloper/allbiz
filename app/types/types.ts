export interface Phone {
  id: number;
  name?: string;
  nom?: string;
  memory?: string;
  image?: string;
  img?: string;
  image_url?: string;
  prixCash?: number;
  price?: number;
  prix?: number;
  prixLeasing?: number;
  price_leasing?: number;
  isCustom?: boolean;
}
export interface Product {
  id: number;
  name: string;
  image_url?: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
}

export interface Order {
  id: number;
  reference_id: string | null;
  amount: number;
  amount_rest: number;
  status: "pending" | "waiting" | "confirmed" | "failed";
  created_at: string;
  items: OrderItem[];
}
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
export interface Withdraw {
  id: number
  status: boolean
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
