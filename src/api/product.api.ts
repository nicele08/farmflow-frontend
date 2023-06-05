import { Product } from '@/types/product.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './http';
import { toast } from 'react-toastify';
import { QueryParams } from '@/types/global.type';

export const onGetProducts = createAsyncThunk(
  'product/getProducts',
  async ({ page = 1, limit = 5 }: QueryParams) => {
    try {
      const { data } = await API.get(
        `/products?page=${page}&limit=${limit}`,
      );
      return data as Product[];
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const getProductById = async (id: number) => {
  try {
    const { data } = await API.get(`/products/${id}`);
    return data as Product;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error?.message);
  }
};

export const onGetProduct = createAsyncThunk(
  'product/getProduct',
  getProductById,
);

export const onAddProduct = createAsyncThunk(
  'product/addProduct',
  async (
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    try {
      const { data } = await API.post('/products', product);
      toast.success(`Product added successfully`);
      return data as Product;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);

export const onUpdateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({
    id,
    product,
  }: {
    id: number;
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
  }) => {
    try {
      const { data } = await API.patch(`/products/${id}`, product);
      toast.success(`Product updated successfully`);
      return data as Product;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);

export const onDeleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: number) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success(`Product deleted successfully`);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message;
      toast.error(message);
      throw new Error(message);
    }
  },
);

export const calculateProductQuantity = async ({
  product,
  landSize,
}: {
  product: Product;
  landSize: number;
}) => {
  try {
    const { data } = await API.get(
      `/products/${product.id}/calculate/${landSize}`,
    );
    return {
      ...product,
      price: data.price as number,
      quantity: data.quantity as number,
      maxQuantity: data.maxQuantity as number,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error?.message);
  }
};
