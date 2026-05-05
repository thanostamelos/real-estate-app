import {Box, Typography} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const InfoSection = ({
                         title,
                         location,
                         area,
                         rooms,
                         description,
                         phone,
                         email
                     }) => {
    return (
        <Box sx={{p: 2}}>
            <Typography fontWeight={700}>{title}</Typography>

            <Typography variant="body2" color="text.secondary">
                📍 {location}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                🏠 {area} m² • {rooms} rooms
            </Typography>

            <Typography
                variant="body2"
                sx={{mt: 1, color: "text.secondary"}}
            >
                {description}
            </Typography>

            {/* CONTACT */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    mt: 2
                }}
            >
                <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                    <PhoneIcon fontSize="small"/>
                    <Typography variant="caption">{phone}</Typography>
                </Box>

                <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                    <EmailIcon fontSize="small"/>
                    <Typography variant="caption">{email}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default InfoSection;