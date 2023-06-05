import { Product } from '@/types/product.type';
import Secure from '@/utils/secureLs';
import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: Secure.getCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }: { payload: Product }) {
      const isExist = state.cart.some(item => item.id === payload.id);
      if (!isExist) {
        const newState = [...state.cart, payload];
        state.cart = newState;
        Secure.setCart(newState);
      }
    },
    removeFromCart(state, { payload }: { payload: Product }) {
      const newState = state.cart.filter(
        item => item.id !== payload.id,
      );
      state.cart = newState;
      Secure.setCart(newState);
    },
    clearCart(state) {
      state.cart = [];
      Secure.setCart([]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
