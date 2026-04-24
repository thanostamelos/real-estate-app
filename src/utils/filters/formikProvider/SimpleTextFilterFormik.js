import { memo, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import {defaultLabelFromName} from "../../functions/generalFunctions";

const SimpleTextFilterFormik = memo(
    ({
        name,
        label,
        value,
        onChange, // optional: (name, value, event)
        onBlur,
        transform, // optional: (value) => transformedValue
        type = 'text',
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
                if (transform) {
                    const transformed = transform(raw);
                    if (onChange) onChange(name, transformed, event);
                    helpers.setValue(transformed, false);
                } else {
                    if (onChange) onChange(name, raw, event);
                    field.onChange(event);
                }
            },
            [name, onChange, transform, field, helpers]
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
            if (!startAdornment && !endAdornment) return undefined;

            return {
                startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null,
                endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null
            };
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
            <Tooltip title={tooltip || ''} placement={'top'} disableHoverListener={!tooltip}>
                <TextField
                    id={`field-${name}`}
                    {...extraProps}
                    name={name}
                    label={resolvedLabel || undefined}
                    value={resolvedValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={onEnterPress}
                    type={type}
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

export default SimpleTextFilterFormik;
