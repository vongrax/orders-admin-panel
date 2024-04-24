import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import OrderClient from '@/api/order.api';
import { Order } from '@/typespaces/interfaces/order.interface';
import { Query } from '@/typespaces/types/query.type';
import { AppoveOrder } from '@/typespaces/types/order.type';
import { State } from './state';
import { Mutations } from './mutations';
import { OrdersMutationTypes } from './mutation-types';
import { OrdersActionTypes } from './action-types';

const client = new OrderClient();

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [OrdersActionTypes.FETCH_ORDERS]({ commit }: AugmentedActionContext, payload?: Query): void;

  [OrdersActionTypes.APPROVE_ORDER]({ commit }: AugmentedActionContext, payload: AppoveOrder): void;

  [OrdersActionTypes.REMOVE_ORDER]({ commit }: AugmentedActionContext, payload: number): void;

  [OrdersActionTypes.CREATE_ORDER]({ commit }: AugmentedActionContext, payload: Order): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [OrdersActionTypes.FETCH_ORDERS]({ commit }, payload?: Query) {
    commit(OrdersMutationTypes.ORDERS_LOADING);
    try {
      const response = await client.fetchOrders(payload);
      commit(OrdersMutationTypes.FETCH_ORDERS, response);
      commit(OrdersMutationTypes.ORDERS_SUCCEEDED);
    } catch (err) {
      commit(OrdersMutationTypes.ORDERS_ERROR, err as string);
      throw new Error(err as string);
    }
  },

  async [OrdersActionTypes.APPROVE_ORDER]({ commit }, payload: AppoveOrder) {
    commit(OrdersMutationTypes.ORDERS_LOADING);
    try {
      await client.approveOrder(payload);
      commit(OrdersMutationTypes.APPROVE_ORDER, payload);
      commit(OrdersMutationTypes.ORDERS_SUCCEEDED);
    } catch (err) {
      commit(OrdersMutationTypes.ORDERS_ERROR, err as string);
      throw new Error(err as string);
    }
  },

  async [OrdersActionTypes.REMOVE_ORDER]({ commit }, payload: number) {
    commit(OrdersMutationTypes.ORDERS_LOADING);
    try {
      await client.removeOrder(payload);
      commit(OrdersMutationTypes.REMOVE_ORDER, payload);
      commit(OrdersMutationTypes.ORDERS_SUCCEEDED);
    } catch (err) {
      commit(OrdersMutationTypes.ORDERS_ERROR, err as string);
      throw new Error(err as string);
    }
  },
  async [OrdersActionTypes.CREATE_ORDER]({ commit }, payload: Order) {
    commit(OrdersMutationTypes.ORDERS_LOADING);
    try {
      await client.createOrder(payload);
      commit(OrdersMutationTypes.CREATE_ORDER, payload);
      commit(OrdersMutationTypes.ORDERS_SUCCEEDED);
    } catch (err) {
      commit(OrdersMutationTypes.ORDERS_ERROR, err as string);
      throw new Error(err as string);
    }
  },
};
