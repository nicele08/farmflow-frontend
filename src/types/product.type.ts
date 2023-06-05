import { InitialState } from './state.type';

export type Category = 'SEED' | 'FERTILIZER';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  maxPerAcre: number;
  perAcre: number;
  seedIds: number[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState extends InitialState {
  products: Product[];
  product: Product | null;
}
