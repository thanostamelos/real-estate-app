import SimpleButton from "../../../../../utils/Buttons/SimpleButton";
import {DialogActions} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useMemo} from "react";
import {asyncFindReservationById, emptySearchReservation} from "../../../../../store/slices/data_reservation";
import {selectReservationById, selectReservationByIdLoading} from "../../../selectors/CheckInSelectors";

const CheckInModalActions = ({formik, listData, isLoading, selected, handleClose, wasLoadingOnce}) => {
    const dispatch = useDispatch();
    const reservationByIdLoading = useSelector(selectReservationByIdLoading);
    const reservationById = useSelector(selectReservationById);

    const getReservationById = useCallback(() => {
        if (!dispatch || !selected) return;

        dispatch(asyncFindReservationById({reservationId: selected}));
        dispatch(emptySearchReservation());
    }, [selected, dispatch]);

    const disableSelect = useMemo(() => {
        if (reservationById) {
            return Object?.keys(reservationById)?.length > 0
        }
    }, [reservationById])

    return (
        <DialogActions
            sx={{
                p: {xs: 2, sm: 2},
                gap: 1,
                justifyContent: 'flex-end'
            }}
        >
            {/*<SimpleButton*/}
            {/*    onClick={formik?.handleSubmit}*/}
            {/*    name={'Search'}*/}
            {/*    disabled={*/}
            {/*        isLoading || wasLoadingOnce || listData?.length === 1*/}
            {/*    }*/}
            {/*    isLoading={isLoading}*/}
            {/*/>*/}
            <SimpleButton
                onClick={getReservationById}
                name={'Select'}
                disabled={!selected || disableSelect}
                isLoading={reservationByIdLoading}
            />
            <SimpleButton
                onClick={handleClose}
                name={'Close'}
            />
        </DialogActions>
    )
}

export default CheckInModalActions;