import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types/product.types';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null, // Add this
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  addProduct, 
  updateProduct, 
  removeProduct, 
  setSelectedProduct,
  setLoading, 
  setError, 
  clearError 
} = productSlice.actions;
export default productSlice.reducer;