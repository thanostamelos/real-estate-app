import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    screenId: Yup.string().required('Is required'),
    movieId: Yup.string().required('Is required'),
    eventDate: Yup.date().required('Is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    status: Yup.string().required('Is required'),
    description: Yup.string().max(5000),
});
