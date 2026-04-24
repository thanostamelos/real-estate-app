import * as Yup from "yup";


export const validationSchema = Yup.object()
    .shape({
        active: Yup.boolean().required().default(true),
        email: Yup.string().required('Email is required'),
        roles: Yup.array().of(Yup.string().max(30, 'Each tag must be under 30 characters')).nullable(),
    });
