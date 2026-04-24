import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useTheme} from "@mui/material/styles";

const QrCodeModal = ({open, onClose}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            fullScreen={isMobile}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 3,
                    p: isMobile ? 1 : 2
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 1
                }}
            >
                QR Code
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 2
                    }}
                >
                    {open ? (
                        <Box
                            component="img"
                            src={`data:image/png;base64,${open}`}
                            alt="QR Code"
                            sx={{
                                width: "100%",
                                maxWidth: 320,
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: 2
                            }}
                        />
                    ) : (
                        <Box>No QR available</Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default QrCodeModal;