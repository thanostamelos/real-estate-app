import {Dialog, Divider, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import React from 'react';
import {PaperComponentDraggable} from "../../../../../utils/general/CustomPaperComponent";
import CalendarViewEventsModalContent from "../components/CalendarViewEventsModalContent";
import CalendarViewEventsModalActions from "../components/CalendarViewEventsModalActions";
import CalendarViewEventsModalTitle from "../components/CalendarViewEventsModalTitle";

const CalendarViewEventsModal = ({open, handleClose, events, setSelectedEvent, eventDate, isAuthorized}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const eventsLength = events.length;

    const addEvent = (eventToEdit) => {
        if (!isAuthorized) return;
        setSelectedEvent({
            ...eventToEdit,
            screenId: eventToEdit?.screenName || null,
            movieId: eventToEdit?.movieTitle || null,
            eventDate: eventToEdit?.eventDate || eventDate || new Date(),
            startTime: eventToEdit?.startTime || '',
            endTime: eventToEdit?.endTime || '',
            status: eventToEdit?.status || 'AVAILABLE',
            description: eventToEdit?.description || '',
        });
    };

    const handleEditEvent = (id) => {
        const eventToEdit = events.find((event) => event?.extendedProps?.calendarId === id);
        addEvent(eventToEdit?.extendedProps);
    };

    return (
        <Dialog
            open={open}
            fullScreen={isMobile}
            onClose={handleClose}
            PaperComponent={isMobile ? undefined : PaperComponentDraggable}
            aria-labelledby="draggable-dialog-title-2"
            hideBackdrop={!isMobile}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    backgroundColor: 'background.paper',
                    width: '100%',
                    m: {xs: 0, sm: 2},
                    minWidth: {xs: '100%', sm: 560, md: 720},
                    maxWidth: {xs: '100%', sm: 'min(92vw, 820px)'},
                    minHeight: {xs: '100%', sm: 480},
                    maxHeight: {xs: '100%', sm: 'calc(100vh - 96px)'},
                    borderRadius: {xs: 0, sm: 3},
                    overflow: 'hidden'
                }
            }}
        >
            <CalendarViewEventsModalTitle handleClose={handleClose} eventDate={eventDate}/>

            <Divider/>

            <CalendarViewEventsModalContent
                handleEditEvent={handleEditEvent}
                events={events}
                eventsLength={eventsLength}
                isAuthorized={isAuthorized}
            />

            <Divider/>

            <CalendarViewEventsModalActions eventsLength={eventsLength} addEvent={addEvent} isAuthorized={isAuthorized}/>
        </Dialog>
    );
};

export default CalendarViewEventsModal;