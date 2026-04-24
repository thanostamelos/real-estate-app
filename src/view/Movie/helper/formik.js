import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    title: Yup.string().required('Is required'),
    releaseDate: Yup.date().required('Is required'),
    genre: Yup.string().required('Is required'),
    language: Yup.string().required('Is required'),
    country: Yup.string().required('Is required'),
    durationMinutes: Yup.number().required('Is required'),
    rating: Yup.number().required('Is required'),
    director: Yup.string().required('Is required'),
    actors: Yup.string().required('Is required'),
    trailerUrl: Yup.string(),
    description: Yup.string(),
    active: Yup.boolean().required('Is required'),
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
    title: '',
    releaseDate: null,
    genre: '',
    language: '',
    country: '',
    durationMinutes: '',
    rating: '',
    director: '',
    actors: '',
    trailerUrl: '',
    description: '',
    active: true,
    photo: null,
    photoContentType: ''
}
