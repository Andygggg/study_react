import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, PATH } from "../plugins/axios";


interface ProductState {
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
    const response = await api.get(`/api/${PATH}/cart`);
    return response.data.data;
  }
);

export const addToCart = createAsyncThunk(
  "shopping/addToCart",
  async ({ id, qty }: { id: string; qty: number }) => {
    const response = await api.post(`/api/${PATH}/cart`, {
      data: {
        product_id: id,
        qty,
      },
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "shopping/updateCartItem",
  async ({ id, qty }: { id: string; qty: number }) => {
    const response = await api.put(`/api/${PATH}/cart/${id}`, {
      data: {
        product_id: id,
        qty,
      },
    });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "shopping/removeFromCart",
  async (id: string) => {
    await api.delete(`/api/${PATH}/cart/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk(
  "shopping/clearCart",
  async () => {
    await api.delete(`/api/${PATH}/carts`);
    return null;
  }
);

const productSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(getClientProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientProducts.fulfilled, (state, action) => {
        state.cartList = action.payload.products;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getClientProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // Fetch Single Product
      .addCase(getClientProduct.pending, (state, action) => {
        state.loadingProductId = action.meta.arg;
      })
      .addCase(getClientProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload.product;
        state.loadingProductId = null;
      })
      .addCase(getClientProduct.rejected, (state) => {
        state.loadingProductId = null;
      })

      // Fetch Cart
      .addCase(getClientCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state, action) => {
        state.loadingCartId = action.meta.arg.id;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loadingCartId = null;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loadingCartId = null;
      })

      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state) => {
        console.log(state);
        
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state) => {
        console.log(state);
      })

      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart.items = [];
      });
  },
});

export default productSlice.reducer;