import { memo, useCallback, useMemo, forwardRef } from 'react';
import { useField } from 'formik';
import { IMaskInput } from 'react-imask';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import {defaultLabelFromName} from "../../functions/generalFunctions";

const PhoneMaskInput = forwardRef(function PhoneMaskInput(props, ref) {
    const { onChange, name, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="0000 0000000000"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name, value } })}
            overwrite
        />
    );
});

const SimplePhoneFilterFormik = memo(
    ({
        name,
        label,
        value,
        onChange,
        onBlur,
        variant = 'outlined',
        size = 'small',
        sx = {},
        disabled = false,
        startAdornment = null,
        endAdornment = null,
        tooltip,
        onEnterPress,
        required,
        extraProps
    }) => {
        const [field, meta, helpers] = useField(name);

        const handleChange = useCallback(
            (event) => {
                const raw = event.target.value;
                if (onChange) onChange(name, raw, event);
                helpers.setValue(raw, false);
            },
            [name, onChange, helpers]
        );

        const handleBlur = useCallback(
            (event) => {
                if (onBlur) onBlur(event);
                field.onBlur(event);
            },
            [onBlur, field]
        );

        const resolvedLabel = useMemo(() => {
            if (label) return label;
            return defaultLabelFromName(name);
        }, [label, name]);

        const InputProps = useMemo(() => {
            const props = {
                inputComponent: PhoneMaskInput
            };

            if (startAdornment) {
                props.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
            }
            if (endAdornment) {
                props.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
            }

            return props;
        }, [startAdornment, endAdornment]);

        const sxStyles = useMemo(
            () => ({
                width: 231,
                '& .MuiInputBase-root': {
                    height: 36
                },
                ...sx
            }),
            [sx, variant]
        );

        const resolvedValue = value !== undefined ? value : (field.value ?? '');
        const showError = Boolean(meta.touched && meta.error);
        return (
            <Tooltip
                title={'4 digit country code and 10 digit number. Example 0030 6981234567' || ''}
                placement={'top'}
                disableHoverListener={!tooltip}
            >
                <TextField
                    id={`field-${name}`}
                    {...extraProps}
                    name={name}
                    label={resolvedLabel || undefined}
                    value={resolvedValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={onEnterPress}
                    variant={variant}
                    required={required}
                    size={size}
                    sx={sxStyles}
                    disabled={disabled}
                    slotProps={{
                        input: InputProps
                    }}
                    error={showError}
                    helperText={showError ? meta.error : undefined}
                />
            </Tooltip>
        );
    }
);

export default SimplePhoneFilterFormik;
