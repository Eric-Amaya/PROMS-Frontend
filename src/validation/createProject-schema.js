import * as Yup from 'yup';

export const projectFormSchema = Yup.object().shape({
    name: Yup.string()
        .min (4, "Min. 4 caracteres")
        .max(24, "Max. 24 caracteres")
        .required('El nombre es requerido'),
    amount_participant: Yup.number()
        .required('La cantidad de participantes es requerida')
        .typeError("La cantidad debe ser un número válido"),
    description: Yup.string()
        .min(16, "Min. 16 caracteres")
        .max(256, "Max. 256 caracteres")
        .required('La descripción es requerida'),
    start_date: Yup.date()
        .required('La fecha de inicio es requerida'),
    end_date: Yup.date()
        .required('La fecha de finalización es requerida'),
  });