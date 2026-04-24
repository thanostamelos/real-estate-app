import {Box, Stack, Typography} from "@mui/material";

export const entryLogMobileView = (row) => {
    const photoSrc =
        row?.photo && row?.photoContentType
            ? `data:${row.photoContentType};base64,${row.photo}`
            : null;

    return (
        <Stack spacing={0.75}>
            {photoSrc && (
                <Box
                    component="img"
                    src={photoSrc}
                    alt={"no-picture"}
                    sx={{
                        width: 60,
                        height: 85,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 0.5,
                    }}
                />
            )}

            <Typography variant="caption" color="text.secondary">
                First Name: <b>{row?.firstName ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Last Name: <b>{row?.lastName ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Email: <b>{row?.email ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Phone: <b>{row?.phone ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Entry Log Id: <b>{row?.entryLogId ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Enter Time: <b>{row?.enterTime ?? "—"}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Notes: <b>{row?.notes ?? "—"}</b>
            </Typography>
        </Stack>
    );
};