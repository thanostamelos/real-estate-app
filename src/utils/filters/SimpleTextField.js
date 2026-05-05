import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';

const SimpleTextFilter = memo(
    ({
         name,
         label,
         value = '',
         onChange,
         type = 'text',
         variant = 'outlined',
         size = 'small',
         sx = {},
         disabled = false,
         startAdornment = null,
         endAdornment = null,
         tooltip,
         formik,
         onEnterPress,
         required,
         extraProps,
         error,
         helperText
     }) => {
        const handleChange = useCallback(
            (event) => {
                if (onChange) {
                    onChange(name, event.target.value, event);
                }
                if (formik && formik.handleChange) {
                    formik.handleChange(event);
                }
            },
            [name, onChange, formik]
        );

        const handleBlur = useCallback(
            (event) => {
                if (formik && formik.handleBlur) {
                    formik.handleBlur(event);
                }
            },
            [formik]
        );

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

        const derivedError = error ?? (formik?.touched?.[name] && Boolean(formik?.errors?.[name]));
        const derivedHelperText = helperText ?? (formik?.touched?.[name] ? formik?.errors?.[name] : '');

        return (
            <Tooltip title={tooltip || ''} placement={'top'} disableHoverListener={!tooltip}>
                <TextField
                    {...extraProps}
                    name={name}
                    label={label}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={onEnterPress}
                    type={type}
                    variant={variant}
                    required={required}
                    size={size}
                    sx={sxStyles}
                    disabled={disabled}
                    error={Boolean(derivedError)}
                    helperText={derivedHelperText}
                    slotProps={{
                        input: InputProps
                    }}
                />
            </Tooltip>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.value === nextProps.value &&
            prevProps.name === nextProps.name &&
            prevProps.type === nextProps.type &&
            prevProps.disabled === nextProps.disabled &&
            prevProps.error === nextProps.error &&
            prevProps.helperText === nextProps.helperText &&
            prevProps.formik === nextProps.formik
        );
    }
);

export default SimpleTextFilter;