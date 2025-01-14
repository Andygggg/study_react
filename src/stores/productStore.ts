import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuth, PATH } from '../plugins/axios';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const res = await apiAuth.get(`/api/${PATH}/admin/products`);
    return res.data.products;
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id: string) => {
    const res = await apiAuth.get(`/api/${PATH}/product/${id}`);
    return res.data.product;
  }
);

export const uploadProduct = createAsyncThunk(
  'products/upload',
  async (productData: Product) => {
    const res = await apiAuth.post(`/api/${PATH}/admin/product`, {
      data: productData
    });
    return res.data;
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, data }: { id: string; data: Product }) => {
    const res = await apiAuth.put(`api/${PATH}/admin/product/${id}`, {data});
    return res.data.product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string) => {
    try {
      const {data} = await apiAuth.delete(`/api/${PATH}/admin/product/${id}`);
      return data
    } catch (error) {
      console.log(error);
      
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '獲取產品失敗';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '刪除失敗';
      });
  }
});

export default productSlice.reducer;

export interface Product {
  category: string;
  content: string;
  description: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  imageUrl: string;
  imagesUrl: string[];
}

export interface Products {
  id: string;
  category: string;
  content: string;
  description: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  imageUrl: string;
  imagesUrl: string[];
}

interface ProductState {
  products: Products[];
  loading: boolean;
  error: string | null;
}