import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, PATH } from "../plugins/axios";


interface ProductState {
  goodsList: any[];
  cartList: any[];
  currentProduct: any;
  cart: {
    items: any[];
  };
  pagination: {
    current_page: number;
    total_pages: number;
  };
  loadingProductId: string | null;
  loadingCartId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  goodsList: [],
  cartList: [],
  currentProduct: null,
  cart: {
    items: [],
  },
  pagination: {
    current_page: 1,
    total_pages: 1,
  },
  loadingProductId: null,
  loadingCartId: null,
  loading: false,
  error: null,
};

// Async Thunks
export const getClientProducts = createAsyncThunk(
  "shopping/getClientProducts",
  async (page: number = 1) => {
    const response = await api.get(`/api/${PATH}/products?page=${page}`);
    return response.data;
  }
);

export const getClientProduct = createAsyncThunk(
  "shopping/getClientProduct",
  async (id: string) => {
    const response = await api.get(`/api/${PATH}/product/${id}`);
    return response.data;
  }
);

export const getClientCart = createAsyncThunk(
  "shopping/getClientCart",
  async () => {
    const res = await api.get(`/api/${PATH}/cart`);
    return res.data.data;
  }
);

export const addToCart = createAsyncThunk(
  "shopping/addToCart",
  async ({ id, qty }: { id: string; qty: number }) => {
    const res = await api.post(`/api/${PATH}/cart`, {
      data: {
        product_id: id,
        qty,
      },
    });
    return res.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "shopping/updateCartItem",
  async ({ id, qty }: { id: string; qty: number }) => {
    const res = await api.put(`/api/${PATH}/cart/${id}`, {
      data: {
        product_id: id,
        qty,
      },
    });
    
    return res.data;
  }
);

export const delGoods = createAsyncThunk(
  "shopping/delGoods",
  async (id: string) => {
    const res = await api.delete(`/api/${PATH}/cart/${id}`);
    return res.data;
  }
);

export const delAllCart = createAsyncThunk(
  "shopping/delAllCart",
  async () => {
    const res = await api.delete(`/api/${PATH}/carts`);
    return res.data
  }
);

const productSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientProducts.fulfilled, (state, action) => {
        state.goodsList = action.payload.products;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getClientProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(getClientCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload.carts;
      })
      .addCase(getClientCart.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default productSlice.reducer;