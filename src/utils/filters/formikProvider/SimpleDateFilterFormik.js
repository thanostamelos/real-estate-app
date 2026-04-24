import { memo, useCallback, useMemo } from 'react';
import { useField, useFormikContext } from 'formik';
import { Tooltip } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { enGB } from 'date-fns/locale';
import {dateTimeInputFormat} from "../../../constants/formatConstants";
import {defaultLabelFromName} from "../../functions/generalFunctions";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const SimpleDateFilterFormik = memo(
    ({
        name,
        label,
        value,
        onChange,
        onBlur,
        size = 'small',
        variant = 'outlined',
        sx = {},
        disabled = false,
        tooltip,
        required,
        inputFormat = dateTimeInputFormat,
        extraProps,
        parentSx,
        clearable = true
    }) => {
        const [field, meta, helpers] = useField(name);
        const { setFieldTouched } = useFormikContext();

        const resolvedLabel = useMemo(() => {
            if (label) return label;
            return defaultLabelFromName(name);
        }, [label, name]);

        const sxStyles = useMemo(
            () => ({
                width: 231,
                '& .MuiInputBase-root': { height: 36 },
                ...sx
            }),
            [sx]
        );

        const rawValue = value !== undefined ? value : field.value;
        const resolvedValue = rawValue != null && rawValue !== '' && !isNaN(new Date(rawValue).getTime()) ? rawValue : null;
        const showError = Boolean(meta.touched && meta.error);

        const handleChange = useCallback(
            (newValue, keyboardInputValue) => {
                if (onChange) onChange(name, newValue, keyboardInputValue);
                helpers.setValue(newValue);
            },
            [name, onChange, helpers]
        );

        const handleBlur = useCallback(
            (event) => {
                if (onBlur) onBlur(event);
                setFieldTouched(name, true, true);
                field.onBlur(event);
            },
            [name, onBlur, setFieldTouched, field]
        );

        const handleClear = useCallback(() => {
            if (onChange) onChange(name, null, null);
            helpers.setValue(null);
            setFieldTouched(name, true, false);
        }, [name, onChange, helpers, setFieldTouched]);

        return (
            <Tooltip title={tooltip || ''} placement="top" disableHoverListener={!tooltip}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                        <DatePicker
                            {...extraProps}
                            sx={{ ...parentSx }}
                            label={resolvedLabel || undefined}
                            value={resolvedValue}
                            format={inputFormat} // MUI X v6+
                            onChange={handleChange}
                            disabled={disabled}
                            slotProps={{
                                field: clearable ? { clearable: true, onClear: handleClear } : undefined,
                                textField: {
                                    id: `field-${name}`,
                                    name,
                                    required,
                                    size,
                                    variant,
                                    onBlur: handleBlur,
                                    error: showError,
                                    helperText: showError ? meta.error : undefined,
                                    sx: sxStyles,
                                    InputLabelProps: label ? { shrink: true } : undefined
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Tooltip>
        );
    }
);

export default SimpleDateFilterFormik;
