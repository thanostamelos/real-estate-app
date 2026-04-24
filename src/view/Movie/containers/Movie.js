import {Box, Stack, Typography} from "@mui/material";
import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    asyncDeleteMovie,
    asyncGetAllMovies,
    clearSelectedMovie,
    setSelectedMovie
} from "../../../store/slices/data_movies";
import {selectListData, selectListDataLoading, selectSelectedMovie} from "../selectors/MovieSelectors";
import {columnsDefs} from "../fields/columnDefs";
import CrudComponent from "../../../utils/ReusableComponents/CrudComponent/containers/CrudComponent";
import {openSnackbar} from "../../../store/slices/data_snackbar";

const MovieCrudModal = lazy(() => import("../components/MovieCrudModal"));

const Movie = () => {
    const dispatch = useDispatch();
    const listData = useSelector(selectListData);
    const isLoading = useSelector(selectListDataLoading);
    const selectedItem = useSelector(selectSelectedMovie);
    const movieId = selectedItem?.movieId;

    const [open, setOpen] = useState({state: false, action: ''});

    useEffect(() => {
        if (!dispatch || !asyncGetAllMovies) return;
        dispatch(asyncGetAllMovies());
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
        if (!movieId) {
            showSelectOneError();
            return;
        }
        dispatch(asyncDeleteMovie(movieId));
    }, [dispatch, movieId, showSelectOneError]);

    const handleSelectItem = useCallback((v) => {
        dispatch(setSelectedMovie(v))
    }, [dispatch])

    const handleClearItem = useCallback(() => {
        dispatch(clearSelectedMovie())
    }, [dispatch])

    return (
        <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
            <CrudComponent
                title={'Movies'}
                setOpen={setOpen}
                handleDeleteItem={handleDelete}
                listData={listData}
                isLoading={isLoading}
                columnsDefs={columnsDefs}
                clearSelectedItem={handleClearItem}
                setSelectedItem={handleSelectItem}
                selectedItem={selectedItem}
                idName={'movieId'}
                renderMobileItem={
                    (row) => {
                        return (
                            <Stack spacing={0.5} sx={{minWidth: 0}}>
                                <Typography
                                    fontWeight={700}
                                    fontSize={16}
                                    sx={{
                                        whiteSpace: 'normal',
                                        overflowWrap: 'anywhere',
                                        wordBreak: 'break-word',
                                        lineHeight: 1.25
                                    }}
                                >
                                    {row?.title ?? '—'}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', minWidth: 0}}>
                                    <Typography variant="caption" color="text.secondary" sx={{minWidth: 0}}>
                                        Genre: <b style={{whiteSpace: 'normal'}}>{row?.genre ?? '—'}</b>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{minWidth: 0}}>
                                        Language: <b style={{whiteSpace: 'normal'}}>{row?.language ?? '—'}</b>
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', minWidth: 0}}>
                                    <Typography variant="caption" color="text.secondary" sx={{minWidth: 0}}>
                                        Duration: <b>{row?.durationMinutes ?? '—'}</b> min
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{minWidth: 0}}>
                                        Rating: <b>{row?.rating ?? '—'}</b>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{minWidth: 0}}>
                                        Active: <b>{row?.active ? 'Yes' : 'No'}</b>
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', minWidth: 0}}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{minWidth: 0, whiteSpace: 'normal', overflowWrap: 'anywhere'}}
                                    >
                                        Director: <b>{row?.director ?? '—'}</b>
                                    </Typography>
                                </Stack>

                                {row?.actors ? (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            whiteSpace: 'normal',
                                            overflowWrap: 'anywhere',
                                            wordBreak: 'break-word'
                                        }}
                                        color="text.secondary"
                                    >
                                        {row.actors}
                                    </Typography>
                                ) : null}

                                {row?.description ? (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            whiteSpace: 'normal',
                                            overflowWrap: 'anywhere',
                                            wordBreak: 'break-word'
                                        }}
                                        color="text.secondary"
                                    >
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
                    <MovieCrudModal open={open} handleClose={() => setOpen({state: false, action: ''})}/>
                </Suspense>
            }
        </Box>
    )
}

export default Movie;