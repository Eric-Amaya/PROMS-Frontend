import * as Yup from 'yup';

export const createTeamSchema = Yup.object().shape({
    name: Yup.string()
        .min (4, "Min. 4 caracteres")
        .max(24, "Max. 24 caracteres")
        .required("Este campo es obligatorio"),
    type: Yup.string()
        .required("Este campo es obligatorio"),
});