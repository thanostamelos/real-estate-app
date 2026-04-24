export const columnsDefs = [
    {
        field: "entryLogId",
        headerName: "Entry Log Id",
        width: 200,
        type: "string",
    },
    {
        field: "firstName",
        headerName: "First Name",
        width: 130,
        type: "string",
    },
    {
        field: "lastName",
        headerName: "Last Name",
        width: 130,
        type: "string",
    },
    {
        field: "email",
        headerName: "Email",
        width: 220,
        type: "string",
        renderCell: (params) => (
            <a
                href={`mailto:${params?.value}`}
                style={{ color: "#1976d2", textDecoration: "none" }}
            >
                {params?.value}
            </a>
        ),
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 160,
        type: "string",
    },
    {
        field: "photo",
        headerName: "Photo",
        width: 110,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            if (!params.row.photo) return null;

            const src = `data:${params.row.photoContentType};base64,${params.row.photo}`;

            return (
                <img
                    src={src}
                    alt="movie"
                    style={{
                        width: 45,
                        height: 65,
                        objectFit: "cover",
                        borderRadius: 6,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                    }}
                />
            );
        },
    },
    {
        field: "enterTime",
        headerName: "Enter Time",
        width: 160,
        valueFormatter: (params) => {
            if (!params) return "";


            const date = new Date(params);

            return date.toLocaleString("el-GR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
    },
    {field: 'notes', headerName: 'Notes', width: 130},
];
