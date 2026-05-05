import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { enGB } from 'date-fns/locale';
import { TextField } from '@mui/material';
import { useCallback } from 'react';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {dateTimeInputFormat} from "../../constants/formatConstants";

const SimpleDateTimeFilter = ({
    name,
    label,
    value = new Date(),
    onChange,
    formik,
    size = 'small',
    variant = 'outlined',
    width,
    sx,
    disabled = false,
    parentSx,
    inputFormat = dateTimeInputFormat
}) => {

    const handleChange = useCallback(
        (value) => {
            if (onChange) {
                onChange(name, value);
            }
            if (formik && formik.setFieldValue) {
                formik.setFieldValue(name, value);
            }
        },
        [name, onChange, formik]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <DateTimePicker
                sx={{ ...parentSx }}
                label={label}
                value={value}
                inputFormat={inputFormat}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                disabled={disabled}
                slotProps={{
                    field: { clearable: true, onClear: () => onChange(name, null) },
                    textField: {
                        size: size,
                        variant: variant,
                        error: formik?.touched[name] && Boolean(formik?.errors[name]),
                        helperText: formik?.touched[name] && formik?.errors[name],
                        InputProps: {
                            sx: {
                                width: width ? width : 231,
                                height: 36,
                                '& .MuiInputBase-input': {
                                    padding: variant === 'outlined' ? '8px 14px' : '4px 0 5px'
                                },
                                ...sx
                            }
                        },
                        InputLabelProps: label ? { shrink: true } : undefined
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default SimpleDateTimeFilter;
