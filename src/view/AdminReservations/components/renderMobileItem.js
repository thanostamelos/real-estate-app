import {Stack, Typography} from "@mui/material";

export const renderMobileItem = (row) => {
    return (
        <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Name: <b>{row?.name ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Last Name: <b>{row?.lastName ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Email: <b>{row?.email ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Phone: <b>{row?.phone ?? '—'}</b>
                </Typography>
            </Stack>

            <Typography variant="caption" color="text.secondary">
                Check In Status: <b>{row?.checkInStatus}</b>
            </Typography>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Movie: <b>{row?.movieTitle ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Screen: <b>{row?.screenName ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Starts: <b>{row?.startTime ?? '—'}</b>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Finishes: <b>{row?.endTime ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Event Date: <b>{row?.eventDate ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Seat: <b>{row?.seat ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Price: <b>{row?.price ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Status: <b>{row?.status ?? '—'}</b>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
               <Typography variant="caption" color="text.secondary">
                    Type: {row?.type ?? '—'}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
               <Typography variant="caption" color="text.secondary">
                    Reservation Code: {row?.reservationCode ?? '—'}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Reservation Id: <b>{row?.reservationId ?? '—'}</b>
                </Typography>
            </Stack>
        </Stack>
    )
}