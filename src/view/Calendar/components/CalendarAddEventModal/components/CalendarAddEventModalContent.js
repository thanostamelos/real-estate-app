import {DialogContent, Grid, TextField} from '@mui/material';
import {FastField, useFormikContext} from 'formik';
import React, {memo, useCallback, useMemo} from 'react';
import AutoCompleteFilter from "../../../../../utils/filters/formikProvider/AutoCompleteFilter";
import SimpleDateFilterFormik
    from "../../../../../utils/filters/formikProvider/SimpleDateFilterFormik";
import SimpleTimeFilterFormik
    from "../../../../../utils/filters/formikProvider/SimpleTimeFilterFormik";
import {dateInputFormat} from "../../../../../constants/formatConstants";
import {useSelector} from "react-redux";
import {
    selectMoviePairs,
    selectMoviePairsLoading,
    selectScreenPairs,
    selectScreenPairsLoading
} from "../../../selectors/CalendarSelectos";

const CalendarAddEventModalContent = memo(function CalendarAddEventModalContent() {
    const moviePairsLoading = useSelector(selectMoviePairsLoading);
    const moviePairs = useSelector(selectMoviePairs);
    const screenPairsLoading = useSelector(selectScreenPairsLoading);
    const screenPairs = useSelector(selectScreenPairs);

    const formik = useFormikContext();
    const {values, setFieldValue} = formik;

    const statusOptions = useMemo(() => ([
        {id: 1, label: 'AVAILABLE'},
        {id: 2, label: 'SOLD_OUT'},
        {id: 3, label: 'CANCELLED'},
        {id: 4, label: 'IN_PROGRESS'},
        {id: 5, label: 'FINISHED'}
    ]), []);

    const handleDescriptionChange = useCallback(
        (e) => {
            setFieldValue('description', e.target.value);
        },
        [setFieldValue]
    );

    return (
        <DialogContent sx={{p: 3}}>
            <Grid container spacing={2}>
                <Grid size={{md: 12, lg: 6}}>
                    <AutoCompleteFilter
                        name={'movieId'}
                        formik={formik}
                        label={'Movie'}
                        options={moviePairs}
                        loading={moviePairsLoading}
                        multiple={false}
                        required
                        width={231}
                        minWidth={231}
                        sx={{marginRight: '10px'}}
                    />
                </Grid>
                <Grid size={{md: 12, lg: 6}}>
                    <AutoCompleteFilter
                        name={'screenId'}
                        formik={formik}
                        label={'Screen'}
                        options={screenPairs}
                        loading={screenPairsLoading}
                        multiple={false}
                        required
                        width={231}
                        minWidth={231}
                        sx={{marginRight: '10px'}}
                    />
                </Grid>
                <Grid size={{md: 12, lg: 6}}>
                    <SimpleDateFilterFormik
                        name="eventDate"
                        inputFormat={dateInputFormat}
                        views={['day', 'month', 'year']}
                    />
                </Grid>
                <Grid size={{md: 12, lg: 6}}>
                    <SimpleTimeFilterFormik
                        name={'startTime'}
                        required={true}
                    />
                </Grid>
                <Grid size={{md: 12, lg: 6}}>
                    <SimpleTimeFilterFormik
                        name={'endTime'}
                        required={true}
                    />
                </Grid>
                <Grid size={{md: 12, lg: 6}}>
                    <AutoCompleteFilter
                        name={'status'}
                        formik={formik}
                        label={'Status'}
                        options={statusOptions}
                        multiple={false}
                        required
                        width={231}
                        minWidth={231}
                        sx={{marginRight: '10px'}}
                    />
                </Grid>
                <Grid size={12}>
                    <FastField name="description">
                        {({field}) => (
                            <TextField
                                multiline
                                rows={4}
                                label={'Description'}
                                {...field}
                                value={values?.description}
                                onChange={handleDescriptionChange}
                                required={true}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        paddingLeft: '8px',
                                        paddingTop: '6px'
                                    }
                                }}
                            />
                        )}
                    </FastField>
                </Grid>
            </Grid>
        </DialogContent>
    );
});

export default memo(CalendarAddEventModalContent);