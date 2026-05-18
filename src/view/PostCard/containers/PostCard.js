import {Paper} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import ImageSection from "../components/ImageSection";
import InfoSection from "../components/InfoSection";

const PostCard = ({listing, onClick}) => {
    const theme = useTheme();
    const accent = "#3fb129";

    const {property, owner, rating, views, datePosted} = listing;

    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                width: 320,
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${theme.palette.divider}`,
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 16px 40px ${alpha(accent, 0.2)}`
                }
            }}
        >
            <ImageSection accent={accent} property={property} rating={rating}/>
            <InfoSection
                property={property}
                owner={owner}
                views={views}
                datePosted={datePosted}
            />
        </Paper>
    );
};

export default PostCard;
