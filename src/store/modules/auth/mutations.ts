import { MutationTree } from 'vuex';
import { User } from '@/typespaces/interfaces/user.interface';
import { Status } from '@/typespaces/enums/status.enum';
import { State } from './state';
import { AuthMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [AuthMutationTypes.SIGN_IN](state: S, payload: User): void;
  [AuthMutationTypes.LOG_OUT](state: S): void;
  [AuthMutationTypes.AUTH_LOADING](state: S): void;
  [AuthMutationTypes.AUTH_SUCCEEDED](state: S): void;
  [AuthMutationTypes.AUTH_ERROR](state: S, payload: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AuthMutationTypes.SIGN_IN](state: State, payload: User) {
    state.user = payload;
  },

  [AuthMutationTypes.LOG_OUT](state: State) {
    state.user = null;
    state.error = null;
  },

  [AuthMutationTypes.AUTH_LOADING](state: State) {
    state.status = Status.LOADING;
  },
  [AuthMutationTypes.AUTH_SUCCEEDED](state: State) {
    state.status = Status.SUCCEEDED;
  },
  [AuthMutationTypes.AUTH_ERROR](state: State, payload: string) {
    state.status = Status.FAILED;
    state.error = payload;
  },
};
