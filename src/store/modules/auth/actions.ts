import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { Auth } from '@/typespaces/types/auth.type';
import { State } from './state';
import { Mutations } from './mutations';
import { AuthMutationTypes } from './mutation-types';
import { AuthActionTypes } from './action-types';
import AuthClient from '../../../api/auth.api';

const client = new AuthClient();

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [AuthActionTypes.SIGN_IN]({ commit }: AugmentedActionContext, payload: Auth): void;

  [AuthActionTypes.LOG_OUT]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [AuthActionTypes.SIGN_IN]({ commit }, payload: Auth) {
    commit(AuthMutationTypes.AUTH_LOADING);
    try {
      const response = await client.signIn(payload);
      commit(AuthMutationTypes.SIGN_IN, response);
      commit(AuthMutationTypes.AUTH_SUCCEEDED);
    } catch (error) {
      commit(AuthMutationTypes.AUTH_ERROR, error as string);
      throw new Error(error as string);
    }
  },

  [AuthActionTypes.LOG_OUT]({ commit }) {
    commit(AuthMutationTypes.LOG_OUT);
  },
};
