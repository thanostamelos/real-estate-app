import {IconButton} from "@mui/material";
import {IconQrcode} from "@tabler/icons-react";

export const getColumnsDefs = (handleOpenQr) => [
    {
        field: 'qrCodeBase64',
        headerName: 'QR',
        width: 70,
        renderCell: (params) => (
            <IconButton
                title={'View QR code'}
                onClick={() => handleOpenQr(params.row)}
            >
                <IconQrcode />
            </IconButton>
        )
    },
    {field: 'checkInStatus', headerName: 'Check In Status', width: 200},
    {field: 'movieTitle', headerName: 'Movie Title', width: 180},
    {field: 'screenName', headerName: 'Screen Name', width: 180},
    {field: 'startTime', headerName: 'Start Time', width: 130},
    {field: 'endTime', headerName: 'End Time', width: 130},
    {field: 'eventDate', headerName: 'Event Date', width: 130},
    {field: 'seat', headerName: 'Seat', width: 100},
    {field: 'price', headerName: 'Price', width: 100},
    {field: 'status', headerName: 'Status', width: 130},
    {field: 'reservationCode', headerName: 'Code', width: 160},
];