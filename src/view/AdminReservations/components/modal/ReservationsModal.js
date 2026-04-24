import ReservationsModalContent from "./ReservationsModalContent.js";
import {useFormik} from "formik";
import {useMemo} from "react";
import {validationSchema} from "../../helper/formik";
import {useDispatch, useSelector} from "react-redux";
import CrudModal from "../../../../utils/ReusableComponents/CrudModal/container/CrudModal";
import {selectCalendar, selectCalendarLoading, selectSelectedScreening} from "../../selectors/ReservationsSelectors";
import {asyncCreateRecord} from "../../../../store/slices/data_reservation";

const ReservationsModal = ({open, handleClose}) => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectSelectedScreening);

    const screenings = useSelector(selectCalendar);
    const isLoading = useSelector(selectCalendarLoading);

    const screeningOptions = useMemo(() => {
        return screenings
            .filter((s) => s.calendarId)
            .map((s) => ({
                id: s.calendarId,
                label: `${s.movieTitle || '-'} • ${s.screenName || '-'} • ${s.eventDate || '-'} • ${(s.startTime || '').slice(0, 5)}`
            }));
    }, [screenings]);

    const computedInitialValues = useMemo(() => {
        const calId = selectedItem?.calendarId;

        return {
            calendarId: calId ?? '',
            selectedScreening: screeningOptions.find(a => a.id === calId) || null,
            customerName: '',
            customerSurname: '',
            customerEmail: '',
            customerPhone: '',
            type: '',
            wantsEmailNotifications: false,
            description: "",
        };
    }, [selectedItem, screeningOptions]);

    const handleSubmitEvent = (values, {resetForm}) => {
        const payload = {
            calendarId: values.calendarId,
            customerName: values.customerName,
            customerSurname: values.customerSurname,
            customerEmail: values.customerEmail,
            customerPhone: values.customerPhone,
            type: values.type,
            wantsEmailNotifications: values.wantsEmailNotifications,
            description: values.description,
        };

        dispatch(asyncCreateRecord(payload))
            .unwrap()
            .then(() => {
                resetForm();
                handleClose();
            })
            .catch(() => {
            });
    };

    const formik = useFormik({
        initialValues: computedInitialValues,
        validationSchema,
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
            <ReservationsModalContent
                formik={formik}
                screeningOptions={screeningOptions}
                isLoading={isLoading}
            />
        </CrudModal>
    );
};

export default ReservationsModal;