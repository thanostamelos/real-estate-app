import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    calendarId: Yup.string().required('Is required'),
    customerName: Yup.string().required('Is required'),
    customerSurname: Yup.string().required('Is required'),
    customerEmail: Yup.string().email('Invalid email').required('Is required'),
    customerPhone: Yup.string().required('Is required'),
    type: Yup.string().required('Is required'),
    wantsEmailNotifications: Yup.boolean(),
    description: Yup.string().max(5000),
});
