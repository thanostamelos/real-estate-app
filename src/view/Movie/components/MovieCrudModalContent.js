import {DialogContent, Grid} from "@mui/material";
import {FormikProvider} from "formik";
import SimpleTextFilterFormik
    from "../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import React from "react";
import CustomCheckbox from "../../../utils/filters/formikProvider/CustomCheckbox";
import SimpleDateFilterFormik
    from "../../../utils/filters/formikProvider/SimpleDateFilterFormik";
import {dateInputFormat} from "../../../constants/formatConstants";
import ImageUploader from "../../../utils/general/ImageUploader";

const MovieCrudModalContent = ({formik}) => {
    const {values, setFieldValue} = formik;

    return (
        <DialogContent sx={{p: {xs: 2, sm: 4, md: 6}, mt: {xs: 0.5, sm: 2}}}>
            <FormikProvider value={formik}>
                <Grid
                    container
                    spacing={{xs: 1.5, sm: 2}}
                    alignItems="flex-start"
                    sx={{mt: {xs: 0.5, sm: 1}}}
                >
                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="title"/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleDateFilterFormik
                            name="releaseDate"
                            inputFormat={dateInputFormat}
                            views={['day', 'month', 'year']}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="genre"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="language"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="country"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="durationMinutes" type="number"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="rating" type="number"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="director"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="actors"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="trailerUrl"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik name="description"/>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                        <CustomCheckbox
                            label="Active"
                            checked={values?.active}
                            onClick={() => setFieldValue('active', !values.active)}
                            sx={{width: 231}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ImageUploader
                            title="Movie image"
                            message="Upload poster or cover image."
                            fieldName="photo"
                            contentTypeFieldName="photoContentType"
                            shape="rounded"
                            height={{xs: 180, sm: 240}}
                        />
                    </Grid>
                </Grid>
            </FormikProvider>
        </DialogContent>
    )
}

export default MovieCrudModalContent;