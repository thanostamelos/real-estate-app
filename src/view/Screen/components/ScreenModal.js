import ScreenModalContent from "./ScreenModalContent.js";
import {useFormik} from "formik";
import {useMemo} from "react";
import {initialValues, validationSchema} from "../helper/formik";
import {asyncCreateScreen, asyncUpdateScreen} from "../../../store/slices/data_screen";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedScreen} from "../selectors/ScreenSelectors";
import CrudModal from "../../../utils/ReusableComponents/CrudModal/container/CrudModal";

const ScreenModal = ({open, handleClose}) => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectSelectedScreen);

    const computedInitialValues = useMemo(() => {
        if (open?.action === "create") return initialValues;

        return {
            name: selectedItem?.name || "",
            code: selectedItem?.code || '',
            screenType: selectedItem?.screenType || '',
            active: selectedItem?.active || '',
            capacity: selectedItem?.capacity || '',
            description: selectedItem?.description || "",
            photo: selectedItem?.photo || null,
            photoContentType: selectedItem?.photoContentType || null,
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
                    JSON.stringify({...sanitizedData})
                ],
                {type: 'application/json'}
            )
        );

        if (photo instanceof File) {
            formData.append('image', photo);
        }

        const thunk =
            open.action === "create"
                ? asyncCreateScreen(formData)
                : asyncUpdateScreen({id: selectedItem?.screenId, data: formData});

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
            <ScreenModalContent formik={formik}/>
        </CrudModal>
    )
}

export default ScreenModal;