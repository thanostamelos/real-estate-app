import {Dialog, DialogActions} from '@mui/material';
import {FormikProvider, useFormik} from 'formik';
import React, {memo, useCallback, useMemo} from 'react';
import {PaperComponentDraggable} from "../../../../../utils/general/CustomPaperComponent";
import {useDispatch} from "react-redux";
import {validationSchema} from "../../../helper/formik";
import CalendarAddEventModalActions from "../components/CalendarAddEventModalActions";
import CalendarAddEventModalContent from "../components/CalendarAddEventModalContent";
import CalendarAddEventModalTitle from "../components/CalendarAddEventModalTitle";
import {asyncCreateMonitoring, asyncUpdateEvent} from "../../../../../store/slices/data_calendar";
import {formatDatesForBackEndSingle} from "../../../../../utils/functions/generalFunctions";


const CalendarAddEventModal = (
    {
        isAddModalOpen,
        handleClose,
        selectedEvent,
        range,
        moviePairs,
        screenPairs
    }
) => {
    const dispatch = useDispatch();

    const initialValues = useMemo(() => ({
        screenId: selectedEvent?.screenId ?? null,
        movieId: selectedEvent?.movieId ?? null,
        eventDate: selectedEvent?.eventDate
            ? new Date(selectedEvent.eventDate)
            : range?.start
                ? new Date(range?.start)
                : new Date(),
        startTime: selectedEvent?.startTime ?? '',
        endTime: selectedEvent?.endTime ?? '',
        status: selectedEvent?.status ?? 'AVAILABLE',
        description: selectedEvent?.description ?? ''
    }), [selectedEvent, range?.start]);

    const handleSubmitEvent = useCallback(async (values, {setSubmitting}) => {

        const eventDate = formatDatesForBackEndSingle(values?.eventDate);
        const movieId = moviePairs.find(a => a.label === values?.movieId)?.id;
        const screenId = screenPairs.find(a => a.label === values?.screenId)?.id;

        try {
            if (selectedEvent?.calendarId) {
                await dispatch(asyncUpdateEvent({
                    id: selectedEvent.calendarId,
                    request: {...values, eventDate, movieId, screenId}
                })).unwrap();
            } else {
                await dispatch(asyncCreateMonitoring({...values, eventDate, movieId, screenId})).unwrap();
            }
            handleClose();
        } finally {
            setSubmitting(false);
        }
    }, [dispatch, handleClose, moviePairs, screenPairs, selectedEvent?.calendarId]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmitEvent,
        enableReinitialize: true,
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: false
    });

    const {handleSubmit, isSubmitting} = formik;

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            open={isAddModalOpen}
            sx={{'& .MuiDialog-paper': {p: 0}}}
            PaperComponent={PaperComponentDraggable}
            aria-labelledby="draggable-dialog-title-2"
            hideBackdrop
        >

            <FormikProvider value={formik}>
                <CalendarAddEventModalTitle handleClose={handleClose} selectedEvent={selectedEvent}/>

                <CalendarAddEventModalContent/>

                <DialogActions sx={{p: 3}}>
                    <CalendarAddEventModalActions
                        selectedEvent={selectedEvent}
                        isSubmitting={isSubmitting}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </DialogActions>
            </FormikProvider>
        </Dialog>
    );
};

export default memo(CalendarAddEventModal);