import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '@/types/product.type';
import {
  onAddProduct,
  onDeleteProduct,
  onGetProduct,
  onGetProducts,
  onUpdateProduct,
} from '@/api/product.api';

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(onGetProducts.pending, state => {
        state.loading = true;
      })
      .addCase(onGetProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(onGetProducts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onGetProduct.pending, state => {
        state.loading = true;
      })
      .addCase(onGetProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload;
      })
      .addCase(onGetProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onAddProduct.pending, state => {
        state.loading = true;
      })
      .addCase(onAddProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = [payload, ...state.products];
      })
      .addCase(onAddProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onUpdateProduct.pending, state => {
        state.loading = true;
      })
      .addCase(onUpdateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.map(product =>
          product.id === payload.id
            ? payload
            : product,
        );
      })
      .addCase(onUpdateProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onDeleteProduct.pending, state => {
        state.loading = true;
      })
      .addCase(onDeleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.filter(
          product => product.id !== payload,
        );
      })
      .addCase(onDeleteProduct.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      });
  },
});

export default productSlice.reducer;
