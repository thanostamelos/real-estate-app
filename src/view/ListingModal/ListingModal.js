import React, {useState} from "react";
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    Rating,
    Tooltip,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import {useDispatch} from "react-redux";
import {rateListing} from "../../store/slices/data_listings";

const STATUS_LABEL = {sale: "FOR SALE", rent: "FOR RENT"};
const STATUS_COLOR = {sale: "#e53935", rent: "#3fb129"};

const ListingModal = ({listing, onClose}) => {
    const dispatch = useDispatch();
    const [imgIndex, setImgIndex] = useState(0);
    const [userRating, setUserRating] = useState(listing.rating ?? 0);

    const {property, owner, views, datePosted, listingId} = listing;
    const images = property.images ?? [];
    const hasMultiple = images.length > 1;

    const prevImg = (e) => {
        e.stopPropagation();
        setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };
    const nextImg = (e) => {
        e.stopPropagation();
        setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };

    const handleRate = (_, value) => {
        if (!value) return;
        setUserRating(value);
        dispatch(rateListing({listingId, rating: value}));
    };

    const priceLabel = property.status === "rent"
        ? `€${property.price.toLocaleString()} / month`
        : `€${property.price.toLocaleString()}`;

    return (
        <Dialog
            open
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{sx: {borderRadius: 3, overflow: "hidden"}}}
        >
            {/* Image carousel */}
            <Box sx={{position: "relative", height: 340, bgcolor: "#000"}}>
                <Box
                    component="img"
                    src={images[imgIndex]}
                    alt={property.title}
                    sx={{width: "100%", height: "100%", objectFit: "cover", opacity: 0.92}}
                />

                {/* Status badge */}
                <Box sx={{
                    position: "absolute", top: 14, left: 14,
                    bgcolor: STATUS_COLOR[property.status] ?? "#555",
                    color: "#fff", px: 1.5, py: 0.4,
                    borderRadius: 1, fontWeight: 700, fontSize: 12, letterSpacing: 0.5
                }}>
                    {STATUS_LABEL[property.status] ?? property.status?.toUpperCase()}
                </Box>

                {/* Close button */}
                <IconButton
                    onClick={onClose}
                    sx={{position: "absolute", top: 10, right: 10, bgcolor: "rgba(0,0,0,0.5)", color: "#fff",
                        "&:hover": {bgcolor: "rgba(0,0,0,0.75)"}}}
                >
                    <CloseIcon/>
                </IconButton>

                {/* Carousel arrows */}
                {hasMultiple && (
                    <>
                        <IconButton onClick={prevImg} sx={{
                            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                            bgcolor: "rgba(0,0,0,0.45)", color: "#fff",
                            "&:hover": {bgcolor: "rgba(0,0,0,0.7)"}
                        }}>
                            <ChevronLeftIcon/>
                        </IconButton>
                        <IconButton onClick={nextImg} sx={{
                            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                            bgcolor: "rgba(0,0,0,0.45)", color: "#fff",
                            "&:hover": {bgcolor: "rgba(0,0,0,0.7)"}
                        }}>
                            <ChevronRightIcon/>
                        </IconButton>

                        {/* Dots */}
                        <Box sx={{position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                            display: "flex", gap: 0.8}}>
                            {images.map((_, i) => (
                                <Box key={i} onClick={() => setImgIndex(i)} sx={{
                                    width: i === imgIndex ? 20 : 8, height: 8,
                                    borderRadius: 4, cursor: "pointer", transition: "width 0.2s",
                                    bgcolor: i === imgIndex ? "#fff" : "rgba(255,255,255,0.5)"
                                }}/>
                            ))}
                        </Box>
                    </>
                )}

                {/* Image counter */}
                {hasMultiple && (
                    <Box sx={{position: "absolute", bottom: 12, right: 14,
                        bgcolor: "rgba(0,0,0,0.55)", color: "#fff",
                        px: 1, py: 0.2, borderRadius: 1, fontSize: 12}}>
                        {imgIndex + 1} / {images.length}
                    </Box>
                )}
            </Box>

            <DialogContent sx={{p: 3}}>
                {/* Title row */}
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1}}>
                    <Typography variant="h5" fontWeight={700} sx={{flex: 1, pr: 2}}>
                        {property.title}
                    </Typography>
                    <Chip label={property.type} variant="outlined" size="small"/>
                </Box>

                {/* Price */}
                <Typography variant="h6" fontWeight={700} color="success.main" sx={{mb: 1.5}}>
                    {priceLabel}
                </Typography>

                {/* Meta row */}
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, mb: 2}}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        <LocationOnIcon fontSize="small" color="action"/>
                        <Typography variant="body2" color="text.secondary">
                            {property.location}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        <HomeIcon fontSize="small" color="action"/>
                        <Typography variant="body2" color="text.secondary">
                            {property.area} m² • {property.rooms} room{property.rooms !== 1 ? "s" : ""}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        <CalendarTodayIcon fontSize="small" color="action"/>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(datePosted).toLocaleDateString("el-GR")}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        <VisibilityIcon fontSize="small" color="action"/>
                        <Typography variant="body2" color="text.secondary">{views} views</Typography>
                    </Box>
                </Box>

                {/* Address */}
                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                    📍 {property.address}, {property.location}
                </Typography>

                {/* Description */}
                <Typography variant="body1" sx={{mb: 2, lineHeight: 1.7}}>
                    {property.description}
                </Typography>

                <Divider sx={{mb: 2}}/>

                {/* Owner + Rating row */}
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2}}>
                    {/* Owner */}
                    <Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                            <Typography variant="subtitle2" fontWeight={700}>
                                👤 {owner.username}
                            </Typography>
                            <Chip
                                label={owner.role}
                                size="small"
                                color={owner.role === "Agency" ? "primary" : "default"}
                                sx={{fontSize: 10, height: 20}}
                            />
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: 0.5}}>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <PhoneIcon fontSize="small" color="action"/>
                                <Typography variant="body2">{owner.phone}</Typography>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <EmailIcon fontSize="small" color="action"/>
                                <Typography variant="body2">{owner.email}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Rating */}
                    <Box sx={{textAlign: "center"}}>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{mb: 0.5}}>
                            Rate this listing
                        </Typography>
                        <Tooltip title={`Your rating: ${userRating}`} placement="top">
                            <Rating
                                value={userRating}
                                onChange={handleRate}
                                precision={0.5}
                                icon={<StarIcon fontSize="inherit" sx={{color: "#fdd835"}}/>}
                                emptyIcon={<StarIcon fontSize="inherit"/>}
                                size="large"
                            />
                        </Tooltip>
                        <Typography variant="caption" color="text.secondary" display="block">
                            {userRating > 0 ? `${userRating} / 5` : "No rating yet"}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ListingModal;
