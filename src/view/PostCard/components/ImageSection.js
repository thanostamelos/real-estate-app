import {Box, IconButton} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

const STATUS_LABELS = {sale: "FOR SALE", rent: "FOR RENT"};
const STATUS_COLORS = {sale: "#e53935", rent: "#3fb129"};

const ImageSection = ({images, accent, property, rating}) => {
    const {images: propImages, price, status} = property;
    const displayImages = propImages ?? images ?? [];
    const statusColor = STATUS_COLORS[status] ?? accent;

    const priceLabel = status === "rent"
        ? `€${price.toLocaleString()} / mo`
        : `€${price.toLocaleString()}`;

    return (
        <Box
            sx={{
                height: 180,
                backgroundImage: `url(${displayImages[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                }}
            />

            {/* Sale / Rent badge */}
            <Box
                sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: statusColor,
                    color: "white",
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.5
                }}
            >
                {STATUS_LABELS[status] ?? status?.toUpperCase()}
            </Box>

            {/* Favorite button */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 6,
                    right: 8,
                    bgcolor: "rgba(255,255,255,0.85)"
                }}
            >
                <FavoriteBorderIcon/>
            </IconButton>

            {/* Price */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    bgcolor: "rgba(0,0,0,0.65)",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 600
                }}
            >
                {priceLabel}
            </Box>

            {/* Rating */}
            {rating && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                        bgcolor: "rgba(0,0,0,0.55)",
                        color: "#fdd835",
                        px: 1,
                        py: 0.4,
                        borderRadius: 2,
                        fontSize: 13,
                        fontWeight: 600
                    }}
                >
                    <StarIcon sx={{fontSize: 14}}/>
                    {rating.toFixed(1)}
                </Box>
            )}
        </Box>
    );
};

export default ImageSection;
