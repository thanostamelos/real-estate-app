import {Box, Paper, Stack, Typography, useTheme} from '@mui/material';
import SimpleButton from "../../../utils/Buttons/SimpleButton";
import {FormikProvider, useFormik} from "formik";
import SimpleTextFilterFormik
    from "../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import SimplePhoneFilterFormik
    from "../../../utils/filters/formikProvider/SimplePhoneFilterFormik";
import ImageUploader from "../../../utils/general/ImageUploader";
import React from "react";
import {asyncEnterCinema} from "../../../store/slices/data_entryLog";
import {initialPersonalInfo, schemaPersonalInfo} from "../helper/formik";
import {useDispatch, useSelector} from "react-redux";
import {selectEnterCinemaLoading} from "../selectors/CheckInSelectors";


const EnterPersonalDetails = ({setOpen}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isLoading = useSelector(selectEnterCinemaLoading);

    const submitPersonalInfo = (values, {resetForm}) => {
        const {photo, ...data} = values;

        const sanitizedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value === '' ? null : value]));

        const formData = new FormData();

        formData.append(
            'request',
            new Blob(
                [
                    JSON.stringify({...sanitizedData})
                ],
                {type: 'application/json'}
            )
        );

        if (photo instanceof File) {
            formData.append('image', photo);
        }

        dispatch(asyncEnterCinema(formData))
            .unwrap()
            .then(() => {
                resetForm();
                setOpen(true)
            })
            .catch(() => {
            })
    };

    const formik = useFormik({
        initialValues: initialPersonalInfo,
        validationSchema: schemaPersonalInfo,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: submitPersonalInfo
    });

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                maxWidth: 440,
                mx: 'auto',
                p: {xs: 2, sm: 4},
                borderRadius: {xs: 4, sm: 6},
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow:
                    theme.palette.mode === 'dark'
                        ? '0 12px 32px rgba(0,0,0,0.45)'
                        : '0 12px 32px rgba(0,0,0,0.06)',
            }}
        >
            <FormikProvider value={formik}>
                <Stack spacing={{xs: 2, sm: 2.5}}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: {xs: 24, sm: 30},
                                color: 'text.primary',
                                lineHeight: 1.1,
                                mb: 1,
                            }}
                        >
                            Entrance
                        </Typography>

                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: {xs: 14, sm: 15},
                                maxWidth: 320,
                                mx: 'auto',
                            }}
                        >
                            You will need to fill your personal information to enter.
                        </Typography>
                    </Box>

                    <Box sx={{textAlign: 'center'}}>
                        <SimpleTextFilterFormik name="firstName"/>
                    </Box>
                    <Box sx={{textAlign: 'center'}}>
                        <SimpleTextFilterFormik name="lastName"/>
                    </Box>
                    <Box sx={{textAlign: 'center'}}>
                        <SimpleTextFilterFormik name="email"/>
                    </Box>
                    <Box sx={{textAlign: 'center'}}>
                        <SimplePhoneFilterFormik name="phone"/>
                    </Box>

                    <Box
                        sx={{
                            pt: 1,
                        }}
                    >
                        <ImageUploader
                            title="Personal image"
                            message="Upload a personal image."
                            fieldName="photo"
                            contentTypeFieldName="photoContentType"
                            shape="rounded"
                            height={{xs: 180, sm: 220}}
                        />
                    </Box>

                    <SimpleButton
                        name="Enter"
                        onClick={formik?.handleSubmit}
                        fullWidth
                        isLoading={isLoading}
                        size="large"
                        sx={{
                            mt: 1,
                            py: {xs: 1.5, sm: 1.7},
                            borderRadius: 999,
                            fontWeight: 700,
                            fontSize: 16,
                            backgroundColor: 'primary.main',
                            color: 'primary.color',
                            transition: '0.2s ease',
                            '&:hover': {
                                backgroundColor: 'primary.hover',
                                transform: 'translateY(-1px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                    />
                </Stack>
            </FormikProvider>
        </Paper>
    );
}

export default EnterPersonalDetails;