<template>
  <div class="back-drop" @click="handleClose">
    <div class="modal-dialog">
      <div class="modal-header">
        <span class="modal-title">{{ title }}</span>
        <button class="close-button" @click="handleClose">x</button>
      </div>
      <div class="modal-content">
        <slot />
      </div>
      <div class="modal-footer">
        <button @click="handleClose">Отмена</button>
        <button class="ok-button" @click="okHandler">{{ okText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps({
  okText: {
    type: String,
    default: 'Сохранить',
  },
  title: String,
});

const emit = defineEmits(['close', 'ok-handler']);

const handleClose = () => {
  emit('close');
};

const okHandler = () => {
  emit('ok-handler');
};
</script>

<style scoped>
.back-drop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 25%);
}

.modal-dialog {
  width: 500px;
  background: #fff;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  border-radius: 5px;
  padding: 15px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
}

.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
}

.modal-content {
  padding: 10px 10px 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 5px 10px;
  background: transparent;
  border: 1px solid #f0f0f0;
  cursor: pointer;
}

.modal-footer button:last-of-type {
  margin-left: 8px;
}

.modal-footer .ok-button {
  border: none;
  background: #4096ff;
  color: #fff;
}
</style>
