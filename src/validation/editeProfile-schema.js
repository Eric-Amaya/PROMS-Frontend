import * as Yup from 'yup';

export const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Mín. 2 caracteres')
    .max(50, 'Máx. 50 caracteres')
    .required('El nombre es requerido'),
  surname: Yup.string()
    .min(2, 'Mín. 2 caracteres')
    .max(50, 'Máx. 50 caracteres')
    .required('El apellido es requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  rut: Yup.string()
    .matches(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/, 'RUT inválido (ejemplo: 12.345.678-9)')
    .required('El RUT es requerido'),
  password: Yup.string()
    .min(6, 'Mín. 6 caracteres')
    .max(20, 'Máx. 20 caracteres')
    .required('La contraseña es requerida'),
});