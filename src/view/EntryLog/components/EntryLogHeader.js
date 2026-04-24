import {Box, Typography} from "@mui/material";

const EntryLogHeader = () => {

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
                Entry Logs
            </Typography>
        </Box>
    )
}

export default EntryLogHeader;