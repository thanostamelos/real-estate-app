import {Box, Stack, Typography} from "@mui/material";
import React, {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    asyncDeleteScreen,
    asyncGetAllScreens,
    clearSelectedScreen,
    setSelectedScreen
} from "../../../store/slices/data_screen";
import CrudComponent from "../../../utils/ReusableComponents/CrudComponent/containers/CrudComponent";
import {openSnackbar} from "../../../store/slices/data_snackbar";
import {selectListData, selectListDataLoading, selectSelectedScreen} from "../selectors/ScreenSelectors";
import {columnsDefs} from "../fields/columnDefs";

const ScreenModal = lazy(() => import("../components/ScreenModal"));

const Screen = () => {
    const dispatch = useDispatch();

    const listData = useSelector(selectListData);
    const isLoading = useSelector(selectListDataLoading);
    const selectedItem = useSelector(selectSelectedScreen);
    const screenId = selectedItem?.screenId;

    const [open, setOpen] = useState({state: false, action: ''});

    useEffect(() => {
        if (!dispatch || !asyncGetAllScreens) return;
        dispatch(asyncGetAllScreens());
    }, [dispatch]);

    const showSelectOneError = useCallback(() => {
        dispatch(
            openSnackbar({
                message: 'Select one item!',
                type: 'error',
                autoHideDuration: 2500
            })
        );
    }, [dispatch]);

    const handleDelete = useCallback(() => {
        if (!screenId) {
            showSelectOneError();
            return;
        }
        dispatch(asyncDeleteScreen(screenId));
    }, [dispatch, screenId, showSelectOneError]);

    const handleSelectItem = useCallback((v) => {
        dispatch(setSelectedScreen(v))
    }, [dispatch])

    const handleClearItem = useCallback(() => {
        dispatch(clearSelectedScreen())
    }, [dispatch])

    return (
        <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
            <CrudComponent
                title={'Screens'}
                setOpen={setOpen}
                handleDeleteItem={handleDelete}
                listData={listData}
                isLoading={isLoading}
                columnsDefs={columnsDefs}
                clearSelectedItem={handleClearItem}
                setSelectedItem={handleSelectItem}
                selectedItem={selectedItem}
                idName={'screenId'}
                renderMobileItem={
                    (row) => {
                        return (
                            <Stack spacing={0.5}>
                                <Typography fontWeight={700} fontSize={16} noWrap>
                                    {row?.name ?? '—'}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                                    <Typography variant="caption" color="text.secondary">
                                        Type: <b>{row?.screenType ?? '—'}</b>
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
                                    <Typography variant="caption" color="text.secondary">
                                        Capacity: <b>{row?.capacity ?? '—'}</b>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Active: <b>{row?.active ? 'Yes' : 'No'}</b>
                                    </Typography>
                                </Stack>

                                {row?.description ? (
                                    <Typography variant="body2" sx={{mt: 0.5}} color="text.secondary" noWrap>
                                        {row.description}
                                    </Typography>
                                ) : null}
                            </Stack>
                        )
                    }
                }
            />
            {open.state &&
                <Suspense>
                    <ScreenModal open={open} handleClose={() => setOpen({state: false, action: ''})}/>
                </Suspense>
            }
        </Box>
    )
}

export default Screen;