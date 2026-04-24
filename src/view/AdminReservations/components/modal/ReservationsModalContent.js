import {DialogContent, Grid} from "@mui/material";
import {FormikProvider} from "formik";
import React from "react";
import SimpleTextFilterFormik
    from "../../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import AutoCompleteFilter from "../../../../utils/filters/formikProvider/AutoCompleteFilter";
import CustomCheckbox from "../../../../utils/filters/formikProvider/CustomCheckbox";
import SimplePhoneFilterFormik
    from "../../../../utils/filters/formikProvider/SimplePhoneFilterFormik";
import {TICKET_TYPE_OPTIONS} from "../../../../constants/TICKET_TYPE";

const ReservationsModalContent = ({formik, screeningOptions = [], isLoading}) => {
    const {values, setFieldValue} = formik;

    return (
        <DialogContent sx={{p: {xs: 2, sm: 4, md: 6}, mt: {xs: 0.5, sm: 2}}}>
            <FormikProvider value={formik}>
                <Grid
                    container
                    spacing={{xs: 1.5, sm: 2}}
                    alignItems="flex-start"
                    sx={{mt: {xs: 1, sm: 1}}}
                >
                    <Grid item xs={12}>
                        <AutoCompleteFilter
                            name="selectedScreening"
                            label="Movie / Screen / Date / Time"
                            formik={formik}
                            options={screeningOptions}
                            multiple={false}
                            required
                            loading={isLoading}
                            sx={{width: 250}}
                            changeHandler={(name, option) => {
                                setFieldValue("calendarId", option?.id ? String(option.id) : "");
                            }}
                            title={values?.selectedScreening?.label || ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="customerName" label="Name" required/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="customerSurname" label="Surname" required/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimpleTextFilterFormik name="customerEmail" label="Email" required/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SimplePhoneFilterFormik name="customerPhone" label="Phone" required/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <AutoCompleteFilter
                            name="type"
                            formik={formik}
                            label="Ticket Type"
                            options={TICKET_TYPE_OPTIONS}
                            multiple={false}
                            required
                            sx={{
                                width: 231,
                                minWidth: 231,
                            }}
                            changeHandler={(name, option) => {
                                setFieldValue("type", option?.id || "");
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SimpleTextFilterFormik
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                        <CustomCheckbox
                            label="Email Notification"
                            checked={values?.wantsEmailNotifications}
                            onClick={() =>
                                setFieldValue(
                                    'wantsEmailNotifications',
                                    !values.wantsEmailNotifications
                                )
                            }
                            sx={{width: 231}}
                        />
                    </Grid>
                </Grid>
            </FormikProvider>
        </DialogContent>
    );
};

export default ReservationsModalContent;