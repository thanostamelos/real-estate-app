import {Autocomplete, TextField} from '@mui/material';
import React, {useRef} from 'react';

const AutoCompleteFilter = ({
                                changeHandler,
                                name,
                                label,
                                value,
                                minWidth,
                                required,
                                formik,
                                disabled,
                                options,
                                multiple,
                                width,
                                sx,
                                variant,
                                loading,
                                title
                            }) => {
    const textFieldRef = useRef(null);

    return (
        <Autocomplete
            title={title}
            limitTags={1}
            id={`id-${name}`}
            multiple={multiple}
            options={options ? options : []}
            size="small"
            freeSolo
            ref={textFieldRef}
            loading={loading}
            autoSelect
            disabled={disabled}
            value={value || formik.values[name] || (multiple ? [] : null)}
            onChange={(e, v) => {
                changeHandler && changeHandler(name, v);
                formik?.setFieldValue(name, v);
            }}
            name={name}
            width={width ? width : 300}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    variant={variant ? variant : 'outlined'}
                    label={label}
                    size="small"
                    required={required ? required : false}
                    helperText={formik ? formik.touched[name] && formik?.errors[name] : ''}
                    error={formik ? formik.touched[name] && Boolean(formik?.errors[name]) : false}
                    disabled={disabled}
                    sx={{
                        minWidth: minWidth ? minWidth : 300,
                        width: width ? width : 300,
                        '& .MuiInputBase-root': {
                            minHeight: 36,
                            maxHeight: 36,
                            fontSize: '13px',
                            overflow: 'hidden',
                            paddingRight: '60px !important'
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '4px 8px'
                        },
                        '& .MuiInputBase-root:focus-within': {
                            minHeight: 36,
                            maxHeight: 'none'
                        },
                        marginTop: '1px',
                        ...sx
                    }}
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />
    );
};

export default AutoCompleteFilter;
