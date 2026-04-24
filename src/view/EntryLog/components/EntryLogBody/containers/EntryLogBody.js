import {useTheme} from "@mui/material/styles";
import {Box, Paper, useMediaQuery} from "@mui/material";
import EntryLogBodyContent from "../components/EntryLogBodyContent";

const desktopStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: 'background.default'
};

const EntryLogBody = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Paper
            sx={{
                width: "100%",
                height: {xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 253px)'},
                overflow: "hidden",
                borderRadius: {xs: 1.5, sm: 2}
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    ...(isDesktop ? desktopStyle : {}),
                    overflowY: {xs: 'auto', md: 'hidden'},
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <EntryLogBodyContent isDesktop={isDesktop}/>
            </Box>
        </Paper>
    )
}

export default EntryLogBody;