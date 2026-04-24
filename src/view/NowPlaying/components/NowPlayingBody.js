import {Box, Chip, LinearProgress, Link, Stack, Typography} from "@mui/material";
import {CalendarMonth, EventSeat, MeetingRoom, Schedule} from "@mui/icons-material";

const NowPlayingBody = ({item, formatDate}) => {
    const occupancyValue = Number(item?.occupancyPercent ?? 0);
    const reservedCount = item?.reservedCount ?? 0;
    const checkedInCount = item?.checkedInCount ?? 0;
    const capacity = item?.capacity ?? 0;
    const availableSeats = item?.availableSeats ?? 0;

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 900,
                        lineHeight: 1.2,
                        fontSize: {xs: '1rem', sm: '1.1rem'}
                    }}
                >
                    {item?.movieTitle || 'Untitled movie'}
                </Typography>

                <Chip
                    label={item?.status || 'UNKNOWN'}
                    color={item?.status === 'AVAILABLE' ? 'success' : 'default'}
                    size="small"
                />
            </Stack>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    minHeight: 20,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {item?.description || 'No description available.'}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{minHeight: 40}}
            >
                Trailer:{" "}
                {item?.movieTrailerUrl ? (
                    <Link
                        href={item.movieTrailerUrl}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                    >
                        Watch Trailer
                    </Link>
                ) : (
                    "No trailer available."
                )}
            </Typography>

            <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarMonth fontSize="small"/>
                    <Typography variant="body2">
                        {formatDate(item?.eventDate)}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Schedule fontSize="small"/>
                    <Typography variant="body2">
                        {item?.startTime || '-'} - {item?.endTime || '-'}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <MeetingRoom fontSize="small"/>
                    <Typography variant="body2">
                        {item?.screenName || '-'}{item?.screenCode ? ` (${item.screenCode})` : ''}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <EventSeat fontSize="small"/>
                    <Typography variant="body2">
                        {availableSeats} / {capacity} seats available
                    </Typography>
                </Stack>
            </Stack>

            <Box sx={{mt: 0.5}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{mb: 0.5}}
                >
                    <Typography variant="body2" fontWeight={700}>
                        Occupancy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {occupancyValue}%
                    </Typography>
                </Stack>

                <LinearProgress
                    variant="determinate"
                    value={Math.max(0, Math.min(100, occupancyValue))}
                    sx={{
                        height: 8,
                        borderRadius: 999
                    }}
                />
            </Box>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip size="small" label={`Reserved: ${reservedCount}`} variant="outlined"/>
                <Chip size="small" label={`Checked-in: ${checkedInCount}`} variant="outlined"/>
                <Chip size="small" label={`Available: ${availableSeats}`} variant="outlined"/>
            </Stack>
        </>
    )
}

export default NowPlayingBody;