import { memo, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { enGB } from 'date-fns/locale';
import { parse, format, isValid } from 'date-fns';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {defaultLabelFromName} from "../../functions/generalFunctions";
import {timeInputFormatWithSeconds} from "../../../constants/formatConstants";

const toDateFromHHmm = (hhmm) => {
    if (!hhmm) return null;
    const d = parse(hhmm, timeInputFormatWithSeconds, new Date());
    return isValid(d) ? d : null;
};

const toHHmmString = (d) => (d && isValid(d) ? format(d, timeInputFormatWithSeconds) : '');

const SimpleTimeFilterFormik = memo(
    ({
        name,
        label,
        value, // optional controlled value (HH:mm)
        onChange, // optional: (name, value, dayjsValue)
        onBlur,
        required,
        size = 'small',
        variant = 'outlined',
        sx = {},
        parentSx = {},
        disabled = false,
        extraProps
    }) => {
        const [field, meta, helpers] = useField(name);

        const resolvedLabel = useMemo(() => {
            if (label) return label;
            return defaultLabelFromName(name);
        }, [label, name]);

        const resolvedValue = value !== undefined ? value : (field.value ?? '');

        const timeValue = useMemo(() => toDateFromHHmm(resolvedValue), [resolvedValue]);

        const showError = Boolean(meta.touched && meta.error);

        const handleChange = useCallback(
            (newValue) => {
                const fixValue = toHHmmString(newValue);

                if (onChange) onChange(name, fixValue, newValue);

                helpers.setValue(fixValue);
            },
            [name, onChange, helpers]
        );

        const handleBlur = useCallback(
            (event) => {
                if (onBlur) onBlur(event);
                helpers.setTouched(true);
                field.onBlur(event);
            },
            [onBlur, helpers, field]
        );

        const textFieldSx = useMemo(
            () => ({
                width: 231,
                '& .MuiInputBase-root': { height: 36 },
                ...sx
            }),
            [sx]
        );

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                <TimePicker
                    {...extraProps}
                    disabled={disabled}
                    sx={{ ...parentSx }}
                    label={resolvedLabel}
                    value={timeValue}
                    onChange={handleChange}
                    onAccept={handleChange} // βοηθάει σε κάποια flows (mobile/ok)
                    slotProps={{
                        textField: {
                            id: `field-${name}`,
                            name,
                            size,
                            variant,
                            required,
                            onBlur: handleBlur,
                            error: showError,
                            helperText: showError ? meta.error : undefined,
                            sx: textFieldSx
                        }
                    }}
                />
            </LocalizationProvider>
        );
    },
    (prev, next) => prev.name === next.name && prev.value === next.value && prev.label === next.label && prev.disabled === next.disabled
);

export default SimpleTimeFilterFormik;
