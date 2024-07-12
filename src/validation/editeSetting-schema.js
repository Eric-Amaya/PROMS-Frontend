import * as Yup from 'yup';

export const editSettingSchema = Yup.object().shape({
    name: Yup.string()
    .min(4, 'Mín. 4 caracteres')
    .max(24, 'Máx. 24 caracteres')
    .required('El nombre es requerido'),
    amount_participant: Yup.number()
    .required('La cantidad de participantes es requerida')
    .typeError('La cantidad de participantes debe ser un número'),
    description: Yup.string()
    .min(16, 'Mín. 16 caracteres')
    .max(256, 'Máx. 256 caracteres')
    .required('La descripción es requerida'),
    start_date: Yup.date()
    .required('La fecha de inicio es requerida'),
    end_date: Yup.date()
    .required('La fecha de finalización es requerida'),
  });
  