import {Box, DialogContent, Typography} from '@mui/material';
import CalendarViewEventsCard from "./CalendarViewEventsCard";
import React from "react";

const CalendarViewEventsModalContent = ({events, handleEditEvent, eventsLength, isAuthorized}) => {

    return (
        <DialogContent
            sx={{
                p: {xs: 1.5, sm: 2},
                backgroundColor: 'background.default',
                overflowY: 'auto'
            }}
        >
            {eventsLength > 0 ? (
                events.map((event, index) => (
                    <CalendarViewEventsCard
                        key={event?.id || index}
                        handleEditEvent={handleEditEvent}
                        event={event?.extendedProps}
                        isAuthorized={isAuthorized}
                    />
                ))
            ) : (
                <Box
                    sx={{
                        minHeight: {xs: 240, sm: 320},
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography color="text.secondary" sx={{fontSize: {xs: '0.9rem', sm: '1rem'}}}>
                        No events found for this date.
                    </Typography>
                </Box>
            )}
        </DialogContent>
    )
};

export default CalendarViewEventsModalContent;