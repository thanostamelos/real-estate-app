import {Dialog, useMediaQuery} from "@mui/material";
import {PaperComponentDraggable} from "../../../../../utils/general/CustomPaperComponent";
import {useTheme} from "@mui/material/styles";
import CheckInModalTitle from "../components/CheckInModalTitle";
import CheckInModalActions from "../components/CheckInModalActions";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {searchInitial, searchSchema} from "../../../helper/formik";
import {asyncSearchReservation} from "../../../../../store/slices/data_reservation";
import SearchReservation from "../components/CheckInModalContent/SearchReservation";
import {selectEnterCinemaData, selectSearchReservationLoading} from "../../../selectors/CheckInSelectors";
import {useState} from "react";

const CheckInModal = ({open, handleClose}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // const listData = useSelector(selectSearchReservation);
    const listData = useSelector(selectEnterCinemaData);
    const isLoading = useSelector(selectSearchReservationLoading);
    const [wasLoadingOnce, setWasLoadingOnce] = useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selected, setSelected] = useState(null)

    const submitTabTwo = (values, {resetForm}) => {

        dispatch(asyncSearchReservation(values))
            .unwrap()
            .then(() => {
                resetForm();
            })
            .catch(() => {
            })
    };

    const formik = useFormik({
        initialValues: searchInitial,
        validationSchema: searchSchema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: submitTabTwo
    });

    return (
        <Dialog
            open={open}
            fullScreen={isMobile}
            onClose={() => {
                if (formik?.resetForm) {
                    formik.resetForm();
                }
                handleClose();
            }}
            PaperComponent={isMobile ? undefined : PaperComponentDraggable}
            aria-labelledby="draggable-dialog-title-2"
            hideBackdrop
            PaperProps={{
                sx: {
                    backgroundColor: 'background.paper',

                    width: '100%',
                    m: {xs: 0, sm: 2},

                    minWidth: {xs: '100%', sm: 560, md: 300},
                    maxWidth: {xs: '100%', sm: 'min(90vw, 900px)'},
                    minHeight: {xs: '100%', sm: 480},
                    maxHeight: {xs: '100%', sm: 'calc(100vh - 184px)'},

                    borderRadius: {xs: 0, sm: 2},
                    overflow: 'hidden'
                }
            }}
        >
            <CheckInModalTitle
                handleClose={handleClose}
                formik={formik}
                listData={listData}
                wasLoadingOnce={wasLoadingOnce}
            />
            <SearchReservation
                listData={listData}
                isLoading={isLoading}
                selected={selected}
                setSelected={setSelected}
                wasLoadingOnce={wasLoadingOnce}
                setWasLoadingOnce={setWasLoadingOnce}
            />
            <CheckInModalActions
                formik={formik}
                listData={listData}
                isLoading={isLoading}
                selected={selected}
                handleClose={handleClose}
                wasLoadingOnce={wasLoadingOnce}
            />
        </Dialog>
    )
}

export default CheckInModal;