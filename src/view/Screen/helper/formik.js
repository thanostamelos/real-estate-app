import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Is required'),
    screenType: Yup.string().required('Is required'),
    active: Yup.boolean().required('Is required'),
    capacity: Yup.number().required('Is required'),
    description: Yup.string().max(5000),
    photo: Yup
        .mixed()
        .nullable()
        .notRequired()
        .test('fileSize', 'Max file size is 5MB', (file) => {
            if (!file) return true; // allow empty if not required
            if (!(file instanceof File)) return true; // allow existing photo
            return file.size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Only JPG/PNG/WebP allowed', (file) => {
            if (!file) return true;
            if (!(file instanceof File)) return true; // allow existing photo

            return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        })
});

export const initialValues = {
    name: '',
    screenType: '',
    active: true,
    capacity: 0,
    description: '',
    photo: null,
    photoContentType: ''
}
