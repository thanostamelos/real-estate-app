import {Box, CardMedia, Typography} from "@mui/material";

const NowPlayingImage = ({item}) => {

    const imageSrc = item?.moviePhoto
        ? `data:${item?.moviePhotoContentType || 'image/jpeg'};base64,${item.moviePhoto}`
        : null;

    return imageSrc ? (
        <CardMedia
            component="img"
            image={imageSrc}
            alt={item?.movieTitle || 'Movie'}
            sx={{
                height: {xs: 220, sm: 240},
                objectFit: 'cover'
            }}
        />
    ) : (
        <Box
            sx={{
                height: {xs: 220, sm: 240},
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.grey'
            }}
        >
            <Typography variant="body2" color="text.secondary">
                No image available
            </Typography>
        </Box>
    )
}

export default NowPlayingImage;