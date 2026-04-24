import {DialogContent, Grid} from "@mui/material";
import {FormikProvider} from "formik";
import SimpleTextFilterFormik
    from "../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import AutoCompleteFilter from "../../../utils/filters/formikProvider/AutoCompleteFilter";
import React from "react";
import CustomCheckbox from "../../../utils/filters/formikProvider/CustomCheckbox";
import ImageUploader from "../../../utils/general/ImageUploader";

const ScreenModalContent = ({formik}) => {
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
                        <SimpleTextFilterFormik name="name"/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="capacity" type="number"/>
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <AutoCompleteFilter
                            name="screenType"
                            formik={formik}
                            label="Screen Type"
                            options={[
                                {id: 1, label: 'TWO_D'},
                                {id: 2, label: 'THREE_D'},
                                {id: 3, label: 'IMAX'}
                            ]}
                            multiple={false}
                            required
                            sx={{
                                width: 231,
                                minWidth: 231,
                            }}
                        />
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

export default ScreenModalContent;