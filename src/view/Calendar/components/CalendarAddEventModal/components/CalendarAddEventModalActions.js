import {Grid, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {memo, useCallback} from 'react';
import SimpleButton from "../../../../../utils/Buttons/SimpleButton";
import {useDispatch, useSelector} from "react-redux";
import {asyncDeleteEvent} from "../../../../../store/slices/data_calendar";
import {
    selectCalendarCreateLoading,
    selectCalendarDeleteLoading,
    selectCalendarUpdateLoading
} from "../../../selectors/CalendarSelectos";

const CalendarAddEventModalActions = ({selectedEvent, handleSubmit, handleClose}) => {
    const dispatch = useDispatch();

    const calendarId = selectedEvent?.calendarId;
    const createIsLoading = useSelector(selectCalendarCreateLoading);
    const updateIsLoading = useSelector(selectCalendarDeleteLoading);
    const deleteIsLoading = useSelector(selectCalendarUpdateLoading);

    const handleDelete = useCallback(() => {
        dispatch(asyncDeleteEvent(calendarId))
            .unwrap()
            .then(handleClose)
            .catch(() => {})
    }, [dispatch, handleClose, calendarId]);

    return (
        <div
            container
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Grid sx={{display: 'flex', justifyContent: 'flex-start'}}>
                {calendarId && (
                    <Tooltip title="Delete Event">
                        <IconButton onClick={handleDelete} size="large">
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Grid>
            <SimpleButton
                name={calendarId ? 'Update' : 'Add'}
                onClick={handleSubmit}
                disabled={
                    createIsLoading ||
                    updateIsLoading ||
                    deleteIsLoading
                }
                isLoading={
                    createIsLoading ||
                    updateIsLoading ||
                    deleteIsLoading
                }
                size={'small'}
            />
        </div>
    );
};

export default memo(CalendarAddEventModalActions);