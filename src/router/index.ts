// Core
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { store } from '@/store';

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// Views
import AuthView from '@/views/AuthView.vue';
import OrdersView from '@/views/OrdersView.vue';
import AddOrderView from '@/views/AddOrderView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'Auth',
    component: AuthView,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: OrdersView,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: '/add-order',
    name: 'AddOrder',
    component: AddOrderView,
    meta: {
      layout: DefaultLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const IS_LOGGED_IN = store.getters.isLoggedIn;
  if (to.name !== 'Auth' && !IS_LOGGED_IN) {
    next({ name: 'Auth' });
  }
  if (to.name === 'Auth' && IS_LOGGED_IN) {
    next({ name: 'Home' });
  }
  next();
});

export default router;
