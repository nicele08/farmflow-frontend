import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@/types/auth.type';
import { getUserData } from '@/utils/helpers';
import { onLogin, onRegister } from '@/api/auth.api';
import Secure from '@/utils/secureLs';
import { toast } from 'react-toastify';

const initialState: AuthState = {
  user: getUserData(),
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    onLogout(state) {
      Secure.removeToken();
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    onRemoveError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(onLogin.pending, state => {
        state.loading = true;
      })
      .addCase(onLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        Secure.setToken(payload.token);
        Secure.setUser(payload.user);
        window.location.href = '/';
      })
      .addCase(onLogin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
        toast.error(state.error);
      })

      .addCase(onRegister.pending, state => {
        state.loading = true;
      })
      .addCase(onRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        Secure.setToken(payload.token);
        Secure.setUser(payload.user);
        window.location.href = '/';
      })
      .addCase(onRegister.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
        toast.error(state.error);
      });
  },
});

export const { onLogout, onRemoveError } = loginSlice.actions;

export default loginSlice.reducer;
