import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiAuth } from '../plugins/axios';

const initialState: UserState = {
  username: '',
  password: '',
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: { username: string; password: string }) => {
    const res = await api.post('/admin/signin', user);
    const { token } = res.data;
    sessionStorage.setItem('access_token', token);
    return token;
  }
);

export const checkLoginStatus = createAsyncThunk(
  'user/checkStatus',
  async () => {
    const res = await apiAuth.post('/api/user/check');
    return res.data.success;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '登入失敗';
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

interface UserState {
  username: string;
  password: string;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}