import * as yup from 'yup';

export const orderSchema = yup.object({
  name: yup.string().required('Пожалуйста, введите имя'),
  address: yup.string().required('Пожалуйста, укажите адрес'),
});
