import {useTheme} from '@mui/material/styles';
import {Box, Button, Chip, Divider, Stack, Typography} from '@mui/material';
import React from 'react';
import {removeZeros} from "../../../helper/functions";

const CalendarViewEventsCard = ({event, handleEditEvent, isAuthorized}) => {
    const theme = useTheme();

    const {
        calendarId,
        screenCode,
        screenDescription,
        screenName,
        movieTitle,
        occupancyPercent,
        reservedCount,
        availableSeats,
        capacity,
        checkedInCount,
        startTime,
        endTime,
        description,
        status,
    } = event || {};

    const cardAccent = theme.palette.calendar?.cardColors?.[2] || theme.palette.action.hover;
    const safeStartTime = removeZeros(startTime);
    const safeEndTime = removeZeros(endTime);

    const stats = [
        {label: 'Reserved', value: `${reservedCount ?? 0} / ${capacity ?? 0}`},
        {label: 'Available', value: `${availableSeats ?? 0}`},
        {label: 'Checked in', value: `${checkedInCount ?? 0}`},
        {label: 'Occupancy', value: `${occupancyPercent ?? 0}%`}
    ];

    return (
        <Box
            sx={{
                width: '100%',
                p: {xs: 1.5, sm: 2},
                mb: 2,
                borderRadius: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: {xs: 'none', sm: 'translateY(-2px)'},
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)'
                }
            }}
        >
            <Stack spacing={1.5}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Box sx={{minWidth: 0, flex: 1}}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 800,
                                color: 'text.primary',
                                fontSize: {xs: '0.98rem', sm: '1.05rem'},
                                lineHeight: 1.3,
                                wordBreak: 'break-word'
                            }}
                        >
                            {movieTitle || 'Untitled movie'}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mt: 0.4,
                                fontSize: {xs: '0.78rem', sm: '0.875rem'},
                                wordBreak: 'break-word'
                            }}
                        >
                            {screenName || 'Unknown screen'}
                            {screenCode ? ` · ${screenCode}` : ''}
                        </Typography>
                    </Box>

                    <Chip
                        label={status || 'Unknown'}
                        size="small"
                        sx={{
                            fontWeight: 700,
                            flexShrink: 0,
                            maxWidth: {xs: 110, sm: 'none'},
                            '& .MuiChip-label': {
                                px: 1.2
                            }
                        }}
                    />
                </Stack>

                <Box
                    sx={{
                        p: 1.25,
                        borderRadius: 2,
                        backgroundColor: cardAccent
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            color: 'text.secondary',
                            mb: 0.5,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5
                        }}
                    >
                        Time
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        {safeStartTime} - {safeEndTime}
                    </Typography>
                </Box>

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={1}
                >
                    <Box
                        sx={{
                            flex: 1,
                            p: 1.25,
                            borderRadius: 2,
                            backgroundColor: theme.palette.action.hover
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                color: 'text.secondary',
                                mb: 0.5,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5
                            }}
                        >
                            Screen
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                wordBreak: 'break-word'
                            }}
                        >
                            {screenName || 'Unknown screen'}
                        </Typography>

                        {screenCode && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    mt: 0.25,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Code: {screenCode}
                            </Typography>
                        )}

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mt: 0.4
                            }}
                        >
                            Capacity: {capacity ?? 0}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            p: 1.25,
                            borderRadius: 2,
                            backgroundColor: theme.palette.action.hover
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                color: 'text.secondary',
                                mb: 0.75,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5
                            }}
                        >
                            Availability
                        </Typography>

                        <Stack spacing={0.5}>
                            {stats.map((item) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 1
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{color: 'text.secondary', fontSize: '0.82rem'}}
                                    >
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{fontWeight: 700, color: 'text.primary', fontSize: '0.84rem'}}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Stack>

                {(screenDescription || description) && (
                    <>
                        <Divider/>
                        <Stack spacing={1}>
                            {screenDescription && (
                                <Box
                                    sx={{
                                        p: 1.25,
                                        borderRadius: 2,
                                        backgroundColor: theme.palette.action.hover
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            color: 'text.secondary',
                                            mb: 0.5,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5
                                        }}
                                    >
                                        Screen description
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.primary',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        {screenDescription}
                                    </Typography>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    p: 1.25,
                                    borderRadius: 2,
                                    backgroundColor: theme.palette.action.hover
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        color: 'text.secondary',
                                        mb: 0.5,
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                    }}
                                >
                                    Event Description
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {description || 'No description available.'}
                                </Typography>
                            </Box>
                        </Stack>
                    </>
                )}

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    justifyContent="space-between"
                    alignItems={{xs: 'stretch', sm: 'center'}}
                    spacing={1}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            wordBreak: 'break-word'
                        }}
                    >
                        Event ID: {calendarId || '-'}
                    </Typography>

                    {isAuthorized && <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            if (!isAuthorized) return;
                            handleEditEvent?.(calendarId)
                        }}
                        sx={{
                            alignSelf: {xs: 'stretch', sm: 'flex-end'},
                            minHeight: 40,
                            px: 2,
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: 2
                        }}
                    >
                        Edit event
                    </Button>}
                </Stack>
            </Stack>
        </Box>
    );
};

export default CalendarViewEventsCard;