import React, {useEffect, useRef, useState} from 'react';
import {Box, Chip, Stack, Typography, useMediaQuery, useTheme} from '@mui/material';
import {getCardColor, removeZeros} from "../helper/functions";

const SIDEBAR_THRESHOLD = 190;

const RecordsCard = ({eventInfo}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const containerRef = useRef(null);
    const lastShowSidebar = useRef(true);
    const [showSidebar, setShowSidebar] = useState(true);

    const recordData = eventInfo?.event?._def?.extendedProps ?? {};

    const startTime = removeZeros(recordData?.startTime);
    const endTime = removeZeros(recordData?.endTime);
    const cardColor = getCardColor(eventInfo, theme);

    const movieTitle = recordData?.movieTitle || 'Untitled movie';
    const screenName = recordData?.screenName || 'Unknown screen';
    const screenCode = recordData?.screenCode || '-';
    const status = recordData?.status || 'UNKNOWN';

    const capacity = Number(recordData?.capacity ?? 0);
    const reservedCount = Number(recordData?.reservedCount ?? 0);
    const checkedInCount = Number(recordData?.checkedInCount ?? 0);
    const availableSeats = Number(recordData?.availableSeats ?? 0);
    const occupancyPercent = Number(recordData?.occupancyPercent ?? 0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || isMobile) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const shouldShow = entry.contentRect.width >= SIDEBAR_THRESHOLD;
                if (shouldShow !== lastShowSidebar.current) {
                    lastShowSidebar.current = shouldShow;
                    setShowSidebar(shouldShow);
                }
            }
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [isMobile]);

    if (isMobile) {
        return (
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    minHeight: '42px',
                    px: '6px',
                    py: '5px',
                    borderRadius: '8px',
                    backgroundColor: cardColor,
                    color: 'rgba(255,255,255,0.96)',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        minWidth: 0
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                            opacity: 0.9
                        }}
                    >
                        {startTime}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                            opacity: 0.75
                        }}
                    >
                        -
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                            opacity: 0.9
                        }}
                    >
                        {endTime}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1
                        }}
                    >
                        {movieTitle}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 500,
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'rgba(255,255,255,0.8)'
                        }}
                    >
                        {screenName}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            flexShrink: 0,
                            color: 'rgba(255,255,255,0.92)'
                        }}
                    >
                        {reservedCount}/{capacity}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 9,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.72)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px'
                        }}
                    >
                        {status}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: 9,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.72)'
                        }}
                    >
                        {occupancyPercent}% full
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: cardColor,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                cursor: 'pointer',
                position: 'relative',
                minHeight: '62px',
                borderBottom: 'none',
                '&:hover': {
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.25)'
                }
            }}
        >
            {showSidebar && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.14)',
                        px: '7px',
                        flexShrink: 0,
                        minWidth: '44px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: 1.2
                        }}
                    >
                        {startTime}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.82)',
                            lineHeight: 1.2
                        }}
                    >
                        {endTime}
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: '6px',
                    px: '8px',
                    gap: '3px'
                }}
            >
                {!showSidebar && (
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.62)',
                            lineHeight: 1.2,
                            letterSpacing: '0.3px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {startTime} - {endTime}
                    </Typography>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        minWidth: 0
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.96)',
                            lineHeight: 1.3,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {movieTitle}
                    </Typography>

                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            height: 18,
                            ml: 'auto',
                            backgroundColor: 'rgba(255,255,255,0.16)',
                            color: '#fff',
                            fontWeight: 700,
                            '& .MuiChip-label': {
                                px: 0.9,
                                fontSize: '10px'
                            }
                        }}
                    />
                </Box>

                <Typography
                    component="span"
                    sx={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.78)',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {screenName} · {screenCode}
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        flexWrap: 'wrap',
                        rowGap: '2px'
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.92)'
                        }}
                    >
                        Reserved: {reservedCount}/{capacity}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.76)'
                        }}
                    >
                        Check-in: {checkedInCount}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.76)'
                        }}
                    >
                        Free: {availableSeats}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.76)'
                        }}
                    >
                        Fullness: {occupancyPercent}%
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default RecordsCard;