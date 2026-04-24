import {useEffect, useMemo, useRef, useState} from "react";
import {useFormikContext} from "formik";
import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {DeleteOutline, FileUploadOutlined, ImageOutlined} from "@mui/icons-material";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader = ({
                           title = 'Upload image',
                           message = 'PNG, JPG or WEBP up to 5MB',
                           fieldName = 'photo',
                           contentTypeFieldName = 'photoContentType',
                           shape = 'rounded',
                           height = {xs: 180, sm: 220},
                           gridSize = {xs: 12}
                       }) => {
    const theme = useTheme();
    const fileInputRef = useRef(null);
    const {values, setFieldValue, setFieldTouched} = useFormikContext();

    const [preview, setPreview] = useState(null);
    const [localError, setLocalError] = useState('');

    const imageValue = values?.[fieldName];
    const imageContentType = values?.[contentTypeFieldName];

    const borderRadius = useMemo(() => {
        return shape === 'circle' ? '50%' : 3;
    }, [shape]);

    const handleOpenFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (event) => {
        event.stopPropagation();
        setFieldValue(fieldName, null);
        if (contentTypeFieldName) {
            setFieldValue(contentTypeFieldName, null);
        }
        setFieldTouched(fieldName, true, false);
        setPreview(null);
        setLocalError('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type?.startsWith('image/')) {
            setLocalError('Please select a valid image file.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setLocalError('Image size must be up to 5MB.');
            return;
        }

        setLocalError('');
        setFieldValue(fieldName, file);
        setFieldTouched(fieldName, true, false);
    };

    useEffect(() => {
        if (!imageValue) {
            setPreview(null);
            return;
        }

        if (imageValue instanceof File) {
            const objectUrl = URL.createObjectURL(imageValue);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }

        if (typeof imageValue === "string") {
            setPreview(`data:${imageContentType || 'image/png'};base64,${imageValue}`);
        }
    }, [imageValue, imageContentType]);

    return (
        <Grid size={gridSize}>
            <Paper
                variant="outlined"
                sx={{
                    width: '100%',
                    p: {xs: 1.5, sm: 2},
                    borderRadius: 3,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: localError ? 'error.main' : 'divider',
                    backgroundColor: 'background.paper',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: localError ? 'error.main' : 'primary.main',
                        boxShadow: 3
                    }
                }}
            >
                <input
                    hidden
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <Stack spacing={1.5}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={800}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {message}
                        </Typography>
                    </Box>

                    <Box
                        onClick={handleOpenFilePicker}
                        sx={{
                            width: '100%',
                            height,
                            minHeight: {xs: 160, sm: 200},
                            borderRadius,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: `1px solid ${theme.palette.divider}`,
                            background: preview
                                ? theme.palette.background.paper
                                : `linear-gradient(135deg, ${theme.palette.primary.light}18, ${theme.palette.secondary.light}14)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        {preview ? (
                            <Box
                                component="img"
                                src={preview}
                                alt={title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        ) : (
                            <Stack spacing={1} alignItems="center" sx={{px: 2}}>
                                <ImageOutlined
                                    sx={{
                                        fontSize: {xs: 42, sm: 56},
                                        color: 'primary.main'
                                    }}
                                />
                                <Typography variant="body2" fontWeight={700} textAlign="center">
                                    Tap to upload image
                                </Typography>
                                <Typography variant="caption" color="text.secondary" textAlign="center">
                                    PNG, JPG, WEBP up to 5MB
                                </Typography>
                            </Stack>
                        )}
                    </Box>

                    <Box sx={{minWidth: 0}}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                            {imageValue instanceof File ? imageValue.name : preview ? 'Current image selected' : 'No image selected'}
                        </Typography>

                        {localError ? (
                            <Typography variant="caption" color="error.main">
                                {localError}
                            </Typography>
                        ) : (
                            <Typography variant="caption" color="text.secondary">
                                Recommended: clear and properly centered image
                            </Typography>
                        )}
                    </Box>

                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={1}
                        sx={{width: '100%'}}
                    >
                        <Button
                            variant="contained"
                            startIcon={<FileUploadOutlined/>}
                            onClick={handleOpenFilePicker}
                            fullWidth
                        >
                            {preview ? 'Change image' : 'Upload image'}
                        </Button>

                        {preview && (
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<DeleteOutline/>}
                                onClick={handleRemoveImage}
                                fullWidth
                            >
                                Remove
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ImageUploader;