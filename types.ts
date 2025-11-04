export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  itemsPerPackage?: number;
  createdAt: string; // ISO string
}

export interface Sale {
  id:string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string; // ISO string
}

export interface Return {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number; // Value of returned goods
  date: string; // ISO string
}
