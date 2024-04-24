import * as yup from 'yup';

export const authSchema = yup.object({
  user: yup.string().required('Пожалуйста, введите логин'),
  password: yup.string().required('Пожалуйста, введите пароль').min(8, 'Пароль должен содержать 8 символов'),
});
