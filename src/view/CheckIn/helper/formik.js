import * as Yup from 'yup';

export const schemaPersonalInfo = Yup.object().shape({
    firstName: Yup.string().required('Is required'),
    lastName: Yup.string().required('Is required'),
    email: Yup.string().required('Is required'),
    phone: Yup.string().required('Is required'),
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

export const initialPersonalInfo = {
    firstName: "",
    lastName: '',
    email: '',
    phone: '',
    photo: null,
    photoContentType: null,
}


export const searchSchema = Yup.object()
    .shape({
        email: Yup.string().email('Invalid email'),
        phone: Yup.string()
    })
    .test(
        'at-least-one',
        'Fill email or phone',
        function (value) {
            if (!value) return false;
            return !!(value.email || value.phone);
        }
    );

export const searchInitial = {
    email: '',
    phone: '',
}
