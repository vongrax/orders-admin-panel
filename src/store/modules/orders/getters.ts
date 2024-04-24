import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { Order } from '@/typespaces/interfaces/order.interface';
import { Status } from '@/typespaces/enums/status.enum';
import { State } from './state';

export type Getters = {
  isOrdersLoading(state: State): boolean;
  getOrders(state: State): Order[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  isOrdersLoading: (state: State) => state.status === Status.LOADING,
  getOrders: (state: State) => state.orders,
};
