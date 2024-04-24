import { createLogger, createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { AuthStore, State as IAuthState, store as auth } from './modules/auth';
import { OrdersStore, State as IOrdersStore, store as orders } from './modules/orders';

export type RootState = {
  auth: IAuthState;
  orders: IOrdersStore;
};

export type Store = AuthStore<Pick<RootState, 'auth'>> & OrdersStore<Pick<RootState, 'orders'>>;

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    auth: state.auth,
  }),
});

const plugins = [createLogger({}), vuexLocal.plugin];

export const store = createStore({
  plugins,
  modules: {
    auth,
    orders,
  },
});

export default function useStore(): Store {
  return store as Store;
}
