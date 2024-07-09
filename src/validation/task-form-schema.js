import * as Yup from 'yup';

export const taskFormSchema = Yup.object().shape({
    title: Yup.string()
        .min (4, "Min. 4 caracteres")
        .max(24, "Max. 24 caracteres")
        .required("Este campo es obligatorio"),
    description: Yup.string()
        .min(16, "Min. 16 caracteres")
        .max(256, "Max. 256 caracteres")
        .required("Este campo es obligatorio"),
    resources: Yup.string()
        .max(256, "Max. 256 caracteres"),
});