<template>
  <div class="header">
    <div class="menu-wrapper">
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/" class="link"> Все заказы</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/add-order" class="link"> Добавить заказ</router-link>
        </li>
      </ul>
      <div>
        <span class="user">{{ user?.name }}</span>
        <button class="exit-button" @click="logOutHandler">Выход</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Core
import { computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Interfaces
import { User } from '@/typespaces/interfaces/user.interface';

// ActionTypes
import { AuthActionTypes } from '@/store/modules/auth/action-types';

const store = useStore();
const router = useRouter();
const user: ComputedRef<User | null> = computed(() => store.getters.getCurrentUser);

const logOutHandler = () => {
  store.dispatch(AuthActionTypes.LOG_OUT).then(() => {
    router.push({ name: 'Auth' });
  });
};
</script>
<style scoped>
.header {
  background: #165996;
  padding: 12px 15px 12px 22px;
}

.menu-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 797px;
  margin: 0 auto;
}

.menu {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

.menu-item {
  margin-right: 36px;
}

.link {
  text-decoration: none;
  color: #fff;
}

.user {
  padding-right: 28px;
}

.exit-button {
  padding: 6px 20px;
  background: #d9d9d9;
  cursor: pointer;
  border: none;
}
</style>
