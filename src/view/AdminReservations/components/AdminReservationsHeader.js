import {Box, Typography} from "@mui/material";

const AdminReservationsHeader = () => {

    return (
        <Box
            sx={{
                py: {xs: 1, sm: 1.25},
                mb: {xs: 1, sm: 2}
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontSize: {xs: 18, sm: 24},
                    lineHeight: 1.2
                }}
            >
                Reservations
            </Typography>
        </Box>
    )
}

export default AdminReservationsHeader;