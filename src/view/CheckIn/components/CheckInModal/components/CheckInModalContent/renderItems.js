import {Stack, Typography} from "@mui/material";

export const renderItems = (row) => {
    return (
        <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Reservation code: <b>{row?.reservationCode ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Movie: <b>{row?.movieTitle ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Strat Time: <b>{row?.startTime ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    End time: <b>{row?.endTime ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" fontWeight={700} color="text.primary">
                    Screen: <b>{row?.screenName ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" fontWeight={700} color="text.primary">
                    Screen Description: <b>{row?.screenDescription ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" fontWeight={700} color="text.primary">
                    Seat: <b>{row?.seat ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" fontWeight={700} color="text.primary">
                    Price: <b>{row?.price ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Name: <b>{row?.customerName ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Last Name: <b>{row?.customerSurname ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Email: <b>{row?.customerEmail ?? '—'}</b>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                <Typography variant="caption" color="text.secondary">
                    Phone: <b>{row?.customerPhone ?? '—'}</b>
                </Typography>
            </Stack>
        </Stack>
    )
}