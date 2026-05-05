import {Paper} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import ImageSection from "../components/ImageSection";
import InfoSection from "../components/InfoSection";

const PostCard = ({
                      images = [],
                      title,
                      price,
                      location,
                      area,
                      rooms,
                      description,
                      phone,
                      email
                  }) => {
    const theme = useTheme();
    const accent = "#3fb129";

    return (
        <Paper
            elevation={0}
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

            <ImageSection accent={accent} images={images} price={price}/>

            <InfoSection
                title={title}
                area={area}
                description={description}
                email={email}
                location={location}
                phone={phone}
                rooms={rooms}
            />
        </Paper>
    );
};

export default PostCard;