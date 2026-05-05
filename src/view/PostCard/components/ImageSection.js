import {Box, IconButton} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ImageSection = ({images, accent, price}) => {

    return (
        <Box
            sx={{
                height: 180,
                backgroundImage: `url(${images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                }}
            />

            <IconButton
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "rgba(255,255,255,0.85)"
                }}
            >
                <FavoriteBorderIcon/>
            </IconButton>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    bgcolor: accent,
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 600
                }}
            >
                €{price} / month
            </Box>
        </Box>
    )
}

export default ImageSection;