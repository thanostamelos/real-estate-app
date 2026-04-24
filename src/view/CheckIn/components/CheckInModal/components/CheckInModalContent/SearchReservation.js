import {Card, CardContent, CircularProgress, DialogContent, Stack, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {renderItems} from "./renderItems";
import {selectReservationById, selectReservationByIdLoading} from "../../../../selectors/CheckInSelectors";
import {useSelector} from "react-redux";

const SearchReservation = ({listData, isLoading, selected, setSelected, wasLoadingOnce, setWasLoadingOnce}) => {

    const reservationById = useSelector(selectReservationById);
    const reservationByIdLoading = useSelector(selectReservationByIdLoading);

    useEffect(() => {
        if (reservationByIdLoading) {
            setWasLoadingOnce(true);
        }
    }, [reservationByIdLoading, setWasLoadingOnce]);

    const chooseReservation = (row) => {
        if (listData?.length < 2) return;
        setSelected(row?.reservationId || null);
    }

    const isSelected = (row) => {
        return selected && row?.reservationId === selected;
    };

    const RenderItems = () => {
        return (
            <Card
                key={reservationById?.['reservationId']}
                variant="outlined"
                elevation={3}
                sx={{
                    borderRadius: 2,
                    backgroundColor: 'transparent',
                    boxShadow: '0 0 0 2px #fff',
                }}
            >
                <CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}}}>
                    {renderItems(reservationById)}
                </CardContent>
            </Card>
        );
    }

    return (
        <DialogContent sx={{p: {xs: 2, sm: 4, md: 6}}}>
            {isLoading || reservationByIdLoading ?
                <CircularProgress/>
                :
                <Stack spacing={1.25} sx={{p: 1.5}}>
                    {!wasLoadingOnce && listData?.length === 0 &&
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                            <Typography fontWeight={400} fontSize={16}>No Reservations</Typography>
                        </div>
                    }
                    {listData?.length > 0 && !wasLoadingOnce &&
                        listData?.map((row) => (
                            <Card
                                key={row?.['reservationId']}
                                variant="outlined"
                                onClick={() => chooseReservation(row)}
                                elevation={isSelected(row) ? 3 : 0}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isSelected(row) ? '#82abcc' : 'transparent',
                                    boxShadow: isSelected(row) ? '0 0 0 2px #fff' : 'none',
                                }}
                            >
                                <CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}}}>
                                    {renderItems?.(row)}
                                </CardContent>
                            </Card>
                        ))
                    }
                    {wasLoadingOnce &&
                        <RenderItems/>
                    }
                </Stack>
            }
        </DialogContent>
    )
}

export default SearchReservation;