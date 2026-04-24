import {Box, DialogActions, Typography} from '@mui/material';
import React from 'react';
import SimpleButton from "../../../../../utils/Buttons/SimpleButton";

const CalendarViewEventsModalActions = ({eventsLength, addEvent, isAuthorized}) => {


    return (
        <DialogActions
            sx={{
                px: {xs: 1.5, sm: 2},
                py: {xs: 1.25, sm: 1.5},
                backgroundColor: 'background.paper'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    alignItems: {xs: 'stretch', sm: 'center'},
                    justifyContent: 'space-between',
                    gap: 1
                }}
            >
                <Typography
                    fontSize={12}
                    color="text.secondary"
                    sx={{order: {xs: 2, sm: 1}, textAlign: {xs: 'center', sm: 'left'}}}
                >
                    {eventsLength} Events
                </Typography>

                <Box sx={{order: {xs: 1, sm: 2}, width: {xs: '100%', sm: 'auto'}}}>
                    {isAuthorized && <SimpleButton
                        name={'Add event'}
                        onClick={() => addEvent(null)}
                    />}
                </Box>
            </Box>
        </DialogActions>
    )

}

export default CalendarViewEventsModalActions;