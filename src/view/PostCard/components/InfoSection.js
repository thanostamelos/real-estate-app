import {Box, Chip, Divider, Typography} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InfoSection = ({property, owner, views, datePosted}) => {
    const {title, location, area, rooms, description, type, address} = property;
    const {username, phone, email, role} = owner;

    return (
        <Box sx={{p: 2}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5}}>
                <Typography fontWeight={700} sx={{flex: 1, pr: 1}}>{title}</Typography>
                <Chip label={type} size="small" variant="outlined" sx={{fontSize: 11, height: 20}}/>
            </Box>

            <Typography variant="body2" color="text.secondary">
                📍 {location}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                🏠 {area} m² • {rooms} room{rooms !== 1 ? "s" : ""}
            </Typography>

            <Typography variant="body2" sx={{mt: 1, color: "text.secondary"}} noWrap>
                {description}
            </Typography>

            <Divider sx={{my: 1.5}}/>

            {/* Owner info */}
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5}}>
                <Typography variant="caption" fontWeight={600}>
                    👤 {username}
                </Typography>
                <Chip
                    label={role}
                    size="small"
                    color={role === "Agency" ? "primary" : "default"}
                    sx={{fontSize: 10, height: 18}}
                />
            </Box>

            <Box sx={{display: "flex", gap: 1.5}}>
                <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                    <PhoneIcon fontSize="small"/>
                    <Typography variant="caption">{phone}</Typography>
                </Box>

                <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                    <EmailIcon fontSize="small"/>
                    <Typography variant="caption">{email}</Typography>
                </Box>
            </Box>

            {/* Listing meta */}
            <Box sx={{display: "flex", justifyContent: "space-between", mt: 1.5}}>
                <Typography variant="caption" color="text.disabled">
                    📅 {new Date(datePosted).toLocaleDateString("el-GR")}
                </Typography>
                <Box sx={{display: "flex", alignItems: "center", gap: 0.4}}>
                    <VisibilityIcon sx={{fontSize: 13, color: "text.disabled"}}/>
                    <Typography variant="caption" color="text.disabled">{views}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InfoSection;
