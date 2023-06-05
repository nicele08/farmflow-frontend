import { User } from './auth.type';
import { Product } from './product.type';
import { InitialState } from './state.type';

type OrderStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Order {
  id: number;
  farmerId: number;
  productId: number;
  quantity: number;
  landSize: number;
  isPaid: boolean;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;

  farmer?: User;
  product?: Product;
}

export interface OrderState extends InitialState {
  orders: Order[];
  order: Order | null;
}
