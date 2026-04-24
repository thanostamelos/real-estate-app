export const columnsDefs = [
    // {field: 'movieId', headerName: 'Id', width: 130},
    {field: 'title', headerName: 'Title', width: 130},
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
    {field: 'releaseDate', headerName: 'Release Date', type: 'date', width: 130},
    {field: 'genre', headerName: 'Genre', width: 180},
    {field: 'language', headerName: 'Language', width: 130},
    {field: 'country', headerName: 'Country', width: 150},
    {field: 'durationMinutes', headerName: 'Duration Minutes', type: 'number', width: 130},
    {field: 'rating', headerName: 'Rating', type: 'number', width: 90},
    {field: 'director', headerName: 'Director', width: 250},
    {field: 'actors', headerName: 'Actors', width: 250},{
        field: 'trailerUrl',
        headerName: 'Trailer Url',
        width: 250,
        renderCell: (params) => (
            <a
                href={params.value}
                target="_blank"
                rel="noopener noreferrer"
            >
                {params.value}
            </a>
        )
    },
    {field: 'description', headerName: 'Description', width: 250},
    {field: 'active', headerName: 'Active', type: 'boolean', width: 250},
    {field: 'version', headerName: 'Version', type: 'number', width: 250},
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


