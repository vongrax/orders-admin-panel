import { MutationTree } from 'vuex';
import { Order } from '@/typespaces/interfaces/order.interface';
import { Status } from '@/typespaces/enums/status.enum';
import { OrderStatus } from '@/typespaces/enums/orderStatus.enum';
import { AppoveOrder } from '@/typespaces/types/order.type';
import { State } from './state';
import { OrdersMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [OrdersMutationTypes.FETCH_ORDERS](state: S, payload: Order[]): void;
  [OrdersMutationTypes.APPROVE_ORDER](state: S, payload: AppoveOrder): void;
  [OrdersMutationTypes.REMOVE_ORDER](state: S, payload: number): void;
  [OrdersMutationTypes.ORDERS_SUCCEEDED](state: S): void;
  [OrdersMutationTypes.ORDERS_ERROR](state: S, payload: string): void;
  [OrdersMutationTypes.ORDERS_LOADING](state: S): void;
  [OrdersMutationTypes.CREATE_ORDER](state: S, payload: Order): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [OrdersMutationTypes.FETCH_ORDERS](state: State, payload: Order[]) {
    state.orders = payload;
  },

  [OrdersMutationTypes.APPROVE_ORDER](state: State, payload: { id: number; status: OrderStatus }) {
    state.orders = state.orders.map((item) => {
      if (item.id === payload.id) {
        return { ...item, status: payload.status };
      }
      return item;
    });
  },

  [OrdersMutationTypes.CREATE_ORDER](state: State, payload: Order) {
    state.orders.push(payload);
  },

  [OrdersMutationTypes.REMOVE_ORDER](state: State, payload: number) {
    const orderIdx = state.orders.map((item) => item.id).indexOf(payload);
    state.orders.splice(orderIdx, 1);
  },
  [OrdersMutationTypes.ORDERS_SUCCEEDED](state: State) {
    state.status = Status.SUCCEEDED;
  },
  [OrdersMutationTypes.ORDERS_LOADING](state: State) {
    state.status = Status.LOADING;
  },
  [OrdersMutationTypes.ORDERS_ERROR](state: State, payload: string) {
    state.status = Status.FAILED;
    state.error = payload;
  },
};
