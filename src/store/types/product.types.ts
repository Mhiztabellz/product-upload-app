export interface Product {
  id: string;
  name: string;
  price: number;
  imageUri: string | null;
  createdAt: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null; // Added this for editing
}

export const MAX_PRODUCTS = 5;