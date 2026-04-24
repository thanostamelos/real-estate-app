export const columnsDefs = [
    {field: 'name', headerName: 'Name', width: 130},
    {
        field: "photo",
        headerName: "Photo",
        width: 120,
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
                        width: 50,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 4
                    }}
                />
            );
        }
    },
    {field: 'code', headerName: 'Code', width: 130},
    {field: 'screenType', headerName: 'Screen Type', width: 130},
    {field: 'active', headerName: 'Active', type: 'boolean', width: 130},
    {
        field: 'capacity',
        headerName: 'Capacity',
        type: 'number',
        width: 90,
    },
    {field: 'description', headerName: 'Description', width: 130},
    {field: 'createdBy', headerName: 'Created By', width: 250},
    {
        field: 'createdOn',
        headerName: 'Created On',
        type: 'dateTime',
        width: 250,
        // valueGetter: (value) =>
        //     value ? new Date(value) : null
    },
    {field: 'updatedBy', headerName: 'Updated By', width: 250},
    {
        field: 'updatedOn',
        headerName: 'Updated On',
        type: 'dateTime',
        width: 250,
        // valueGetter: (value) =>
        //     value ? new Date(value) : null
    },
];