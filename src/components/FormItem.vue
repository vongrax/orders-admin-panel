<template>
  <div class="input-container">
    <Field
      :class="[{ error: (!meta.valid && meta.touched) || error }, 'input']"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      @input="onInput"
      :type="type"
    />
    <ErrorMessage class="error-message" :name="name" />
  </div>
</template>

<script setup lang="ts">
// Core
import { defineProps, defineEmits } from 'vue';
import { ErrorMessage, useField, Field } from 'vee-validate';

// Types
import { InputEvent } from '@/typespaces/types/input.type';

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
  },
  error: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:value']);
const { meta } = useField(props.name);

const onInput = (event: InputEvent) => {
  emit('update:value', event.target.value);
};
</script>

<style scoped>
.input-container {
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.input {
  padding: 11px 17px;
  border: 1px solid;
  outline: none;
  width: 250px;
}

.error {
  border-color: var(--error);
}

.error-message {
  color: var(--error);
  position: absolute;
  padding-top: 3px;
  font-size: 14px;
  text-align: center;
  bottom: -20px;
  width: 100%;
}
</style>
