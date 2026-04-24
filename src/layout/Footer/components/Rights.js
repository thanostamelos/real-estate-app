import {Box, Tooltip} from "@mui/material";

export default function Rights() {
    return (
        <Box sx={{ml: 2}}>
            <footer className="app-footer">
                <Tooltip title={'PROTAL'}>
                    <div className="container py-3 small text-muted">
                        © {new Date().getFullYear()} Real Estate Protal
                    </div>
                </Tooltip>
            </footer>
        </Box>
    );
}