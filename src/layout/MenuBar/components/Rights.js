import {Box, Tooltip} from "@mui/material";

export default function Rights() {
    return (
        <Box sx={{ml: 2}}>
            <footer className="app-footer">
                <Tooltip title={'Athanasios Stamelos mpsp2548'}>
                    <div className="container py-3 small text-muted">
                        © {new Date().getFullYear()} Cinema Booking
                    </div>
                </Tooltip>
            </footer>
        </Box>
    );
}