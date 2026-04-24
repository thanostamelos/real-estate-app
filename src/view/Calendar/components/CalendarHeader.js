import {Fab, Grid, IconButton, Stack, Typography} from "@mui/material";
import React from "react";
import SimpleButton from "../../../utils/Buttons/SimpleButton";
import {IconChevronLeft, IconChevronRight, IconPlus} from "@tabler/icons-react";
import {format} from "date-fns";
import {useTheme} from "@mui/material/styles";

const CalendarHeader = ({onClickToday, handleAddClick, date, onClickNext, onClickPrev, isAuthorized}) => {
    const theme = useTheme();

    return (
        <Grid
            container
            alignItems="stretch"
            justifyContent="space-between"
            spacing={1.5}
            sx={{p: {xs: 1, sm: 1.5}}}
        >
            <Grid
                item
                xs={12}
                lg={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography fontSize={{xs: 18, sm: 20, md: 26}} fontWeight={500}>
                    Calendar
                </Typography>

                <Fab
                    color="primary"
                    onClick={handleAddClick}
                    size="small"
                    sx={{display: {xs: "inline-flex", lg: "none"}, ml: 1}}
                >
                    <IconPlus size={18}/>
                </Fab>
            </Grid>

            <Grid
                item
                xs={12}
                lg={4}
                display="flex"
                justifyContent={{xs: "space-between", lg: "center"}}
                alignItems="center"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={{xs: 1, sm: 2}}
                    sx={{width: "100%", maxWidth: {lg: 320}}}
                >
                    <IconButton onClick={onClickPrev} size="small">
                        <IconChevronLeft/>
                    </IconButton>

                    <Typography
                        fontSize={{xs: 16, sm: 18, md: 24}}
                        fontWeight={500}
                        textAlign="center"
                        sx={{
                            flex: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {format(date, 'MMMM yyyy')}
                    </Typography>

                    <IconButton onClick={onClickNext} size="small">
                        <IconChevronRight/>
                    </IconButton>
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                lg={4}
                display="flex"
                justifyContent={{xs: "space-between", lg: "flex-end"}}
                alignItems="center"
                gap={1}
            >
                <SimpleButton
                    name="Today"
                    backgroundColor={theme.palette?.calendar?.cardColors?.[3]}
                    color={theme.palette?.text?.default}
                    onClick={onClickToday}
                />

                {isAuthorized &&
                    <Fab
                        color="primary"
                        onClick={handleAddClick}
                        size="small"
                        sx={{display: {xs: "none", lg: "inline-flex"}}}
                    >
                        <IconPlus/>
                    </Fab>
                }
            </Grid>
        </Grid>
    );
};

export default CalendarHeader;