import { Order } from '@/types/order.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './http';
import { toast } from 'react-toastify';
import { QueryParams } from '@/types/global.type';

export const onGetOrders = createAsyncThunk(
  'order/getOrders',
  async ({ page = 1, limit = 5 }: QueryParams) => {
    try {
      const { data } = await API.get(
        `/orders?page=${page}&limit=${limit}`,
      );
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const onGetOrder = createAsyncThunk(
  'order/getOrder',
  async (id: number) => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const onAddOrder = createAsyncThunk(
  'order/addOrder',
  async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data } = await API.post('/orders', order);
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);

export const onUpdateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, order }: { id: number; order: Partial<Order> }) => {
    try {
      const { data } = await API.patch(`/orders/${id}`, order);
      toast.success(`Order updated successfully`);
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);

export const onDeleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id: number) => {
    try {
      await API.delete(`/orders/${id}`);
      toast.success(`Order deleted successfully`);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);
