import MovieCrudModalContent from "./MovieCrudModalContent.js";
import {useFormik} from "formik";
import {useMemo} from "react";
import {initialValues, validationSchema} from "../helper/formik";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedMovie} from "../selectors/MovieSelectors";
import {asyncCreateMovie, asyncUpdateMovie} from "../../../store/slices/data_movies";
import CrudModal from "../../../utils/ReusableComponents/CrudModal/container/CrudModal";
import {formatDatesForBackEndSingle} from "../../../utils/functions/generalFunctions";

const MovieCrudModal = ({open, handleClose}) => {
    const dispatch = useDispatch();

    const selectedItem = useSelector(selectSelectedMovie);

    const computedInitialValues = useMemo(() => {
        if (open?.action === "create") return initialValues;

        return {
            title: selectedItem?.title || '',
            releaseDate: selectedItem?.releaseDate || null,
            genre: selectedItem?.genre || '',
            language: selectedItem?.language || '',
            country: selectedItem?.country || '',
            durationMinutes: selectedItem?.durationMinutes || '',
            rating: selectedItem?.rating || '',
            director: selectedItem?.director || '',
            actors: selectedItem?.actors || '',
            trailerUrl: selectedItem?.trailerUrl || '',
            photo: selectedItem?.photo || null,
            photoContentType: selectedItem?.photoContentType || null,
            description: selectedItem?.description || '',
            active: selectedItem?.active || true,
        };
    }, [open?.action, selectedItem]);

    const handleSubmitEvent = (values, {resetForm}) => {
        const {photo, ...data} = values;

        const sanitizedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]));

        const formData = new FormData();

        formData.append(
            'request',
            new Blob(
                [
                    JSON.stringify({
                        ...sanitizedData,
                        createdOn: formatDatesForBackEndSingle(sanitizedData.createdOn),
                        updatedOn: formatDatesForBackEndSingle(sanitizedData.updatedOn),
                        releaseDate: formatDatesForBackEndSingle(sanitizedData.releaseDate)
                    })
                ],
                {type: 'application/json'}
            )
        );

        if (photo instanceof File) {
            formData.append('image', photo);
        }

        const thunk =
            open.action === "create"
                ? asyncCreateMovie(formData)
                : asyncUpdateMovie({id: selectedItem?.movieId, data: formData});


        dispatch(thunk)
            .unwrap()
            .then(() => {
                resetForm();
                handleClose();
            })
            .catch(() => {
            })
    };

    const formik = useFormik({
        initialValues: computedInitialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: handleSubmitEvent
    });


    return (
        <CrudModal
            open={open}
            handleClose={handleClose}
            formik={formik}
        >
            <MovieCrudModalContent formik={formik}/>
        </CrudModal>
    )
}

export default MovieCrudModal;