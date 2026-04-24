import Rights from "../components/Rights";
import {Box} from "@mui/material";
import {Container} from "@mui/system";

const Footer = () => {

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Box
            component="footer"
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                borderTop: "1px solid",
                borderColor: "divider",
                mt: "auto",
                py: 2,
                width: '100%'
            }}
        >
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Container maxWidth="lg">
                <Rights/>
            </Container>
        </Box>
    )
}

export default Footer;