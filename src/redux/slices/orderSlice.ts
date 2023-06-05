import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '@/types/order.type';
import {
  onAddOrder,
  onDeleteOrder,
  onGetOrder,
  onGetOrders,
  onUpdateOrder,
} from '@/api/order.api';

const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(onGetOrders.pending, state => {
        state.loading = true;
      })
      .addCase(onGetOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(onGetOrders.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onGetOrder.pending, state => {
        state.loading = true;
      })
      .addCase(onGetOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload;
      })
      .addCase(onGetOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onAddOrder.pending, state => {
        state.loading = true;
      })
      .addCase(onAddOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = [payload, ...state.orders];
      })
      .addCase(onAddOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onUpdateOrder.pending, state => {
        state.loading = true;
      })
      .addCase(onUpdateOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map(order =>
          order.id === payload.id ? payload : order,
        );
      })
      .addCase(onUpdateOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })

      .addCase(onDeleteOrder.pending, state => {
        state.loading = true;
      })
      .addCase(onDeleteOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.filter(
          order => order.id !== payload,
        );
      })
      .addCase(onDeleteOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      });
  },
});

export default orderSlice.reducer;
