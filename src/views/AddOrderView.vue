<template>
  <div class="container">
    <h2>Добавить заказ</h2>
    <Form @submit="onSubmit" :validation-schema="orderSchema">
      <form-item name="name" placeholder="Введите ваше имя" v-model:value="values.name" />
      <form-item name="address" placeholder="Введите ваш адрес" v-model:value="values.address" />
      <form-item name="comment" placeholder="Комментарий" v-model:value="values.comment" />
      <button class="button" type="submit">Добавить заказ</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
// Core
import { computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { Form, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

// Components
import FormItem from '@/components/FormItem.vue';

// Validation
import { orderSchema } from '@/validationSchemas/order.schema';

// ActionTypes
import { User } from '@/typespaces/interfaces/user.interface';
import { OrderStatus } from '@/typespaces/enums/orderStatus.enum';
import { OrdersActionTypes } from '@/store/modules/orders/action-types';

const store = useStore();
const router = useRouter();
const currentUser: ComputedRef<User | null> = computed(() => store.getters.getCurrentUser);
const { values } = useForm({
  initialValues: {
    name: currentUser.value?.name || '',
    address: '',
    comment: '',
  },
});

const onSubmit = () => {
  const randomId = Math.floor(Math.random() * 999);

  const data = {
    id: randomId,
    name: values.name,
    address: values.address,
    date: new Date(Date.now()).toLocaleDateString(),
    status: OrderStatus.NEW,
    comment: values.comment,
  };

  store.dispatch(OrdersActionTypes.CREATE_ORDER, data).then(() => {
    router.back();
  });
};
</script>

<style scoped>
.container {
  padding: 0 20px;
  width: 300px;
}

.button {
  border: none;
  background: var(--button-primary);
  color: var(--white);
  padding: 8px 15px;
}
</style>
