import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {memo, useCallback} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const dateInputFormatDashed = 'DD-MM-YYYY';

const SimpleDateFilter = memo(
    ({
         name,
         label,
         value,
         onChange,
         formik,
         required,
         size = 'small',
         variant = 'outlined',
         sx,
         parentSx,
         inputFormat = dateInputFormatDashed,
         views = ['day', 'month', 'year']
     }) => {

        const safeValue = value ? dayjs(value) : null;

        const handleChange = useCallback(
            (dayjsValue) => {
                formik?.setFieldTouched?.(name, true, false);

                if (!dayjsValue || !dayjsValue.isValid()) {
                    onChange?.(name, null);
                    formik?.setFieldValue?.(name, null);
                    return;
                }

                const resultDate = dayjsValue.toDate();
                resultDate.setHours(0, 0, 0, 0);

                onChange?.(name, resultDate);
                formik?.setFieldValue?.(name, resultDate);
            },
            [name, onChange, formik]
        );

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{...parentSx}}
                    label={required ? `${label} *` : label}
                    value={safeValue}
                    onChange={handleChange}
                    views={views}
                    format={inputFormat}
                    slotProps={{
                        textField: {
                            size,
                            variant,
                            error: formik?.touched[name] && Boolean(formik?.errors[name]),
                            helperText: formik?.touched[name] && formik?.errors[name],
                            InputProps: {
                                sx: {width: 231, height: 36, ...sx}
                            }
                        },
                        field: {
                            clearable: true,
                            onClear: () => {
                                onChange?.(name, null);
                                formik?.setFieldTouched?.(name, true, false);
                                formik?.setFieldValue?.(name, null);
                            }
                        }
                    }}
                />
            </LocalizationProvider>
        );
    },
    (prevProps, nextProps) =>
        prevProps.value === nextProps.value &&
        prevProps.name === nextProps.name &&
        prevProps.formik === nextProps.formik
);

export default SimpleDateFilter;