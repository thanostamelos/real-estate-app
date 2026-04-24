import {IconButton, Stack, Typography} from "@mui/material";
import {IconQrcode} from "@tabler/icons-react";

export const renderMobileItem = (row, handleOpenQr) => {
    return (
        <Stack spacing={0.5}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography fontWeight={700} fontSize={16} noWrap>
                    {row?.reservationCode ?? '—'}
                </Typography>
                <div >
                    <IconButton onClick={() => handleOpenQr(row)}>
                        <IconQrcode/>
                    </IconButton>
                </div>
            </div>

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
                <Typography variant="caption" color="text.secondary">
                    Check In Status: <b>{row?.checkInStatus}</b>
                </Typography>
            </Stack>
        </Stack>
    )
}