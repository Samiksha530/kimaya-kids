export interface Product {
  id: number;
  name: string;
  price: number;
  image: number;
  gallery: number[];
  color: string;
  type: string;
  stock: number;
}
export interface Line {
  id: number;
  size: string;
  qty: number;
}
export interface CustomerDetails {
  age?: string;
  chest?: string;
  waist?: string;
  length?: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  date: string;
  time: string;
}
export interface Inquiry extends CustomerDetails {
  id: string;
  kind: string;
  status: string;
}
export interface Order extends CustomerDetails {
  id: string;
  total: number;
  items: Line[];
}
