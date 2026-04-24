import {Box, Paper, useMediaQuery} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";
import {useCallback, useEffect} from "react";
import CrudBodyMobile from "./CrudBodyMobile";
import {useWindowSize} from "../../../../hooks/useWindowSize";

const paginationModel = {page: 0, pageSize: 50};

const desktopStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: 'background.default'
};

const CrudDataBody = (
    {
        listData = [],
        isLoading = false,
        columnsDefs = [],
        clearSelectedItem,
        setSelectedItem,
        selectedItem,
        idName,
        renderMobileItem,
        emptyText
    }
) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const {size} = useWindowSize();

    const setSelectItem = useCallback((value) => {
        if (!value) {
            clearSelectedItem?.();
            return;
        }
        setSelectedItem?.(value);
    }, [clearSelectedItem, setSelectedItem]);

    useEffect(() => {
        if (isDesktop) {
            setSelectItem(null);
        }
    }, [isDesktop, setSelectItem]);

    const handleRowSelection = (newModel) => {
        const ids = newModel?.ids ? [...newModel?.ids] : []

        if (ids.length !== 1) {
            setSelectItem(null);
            return;
        }
        if (ids[0]) {
            const selectedItem = listData.find((item) => item?.[idName] === ids[0])
            setSelectItem(selectedItem);
        }
    }

    return (
        <Paper
            sx={{
                width: "100%",
                height: {xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 253px)'},
                overflow: "hidden",
                borderRadius: {xs: 1.5, sm: 2}
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    ...(isDesktop ? desktopStyle : {}),
                    overflowY: {xs: 'auto', md: 'hidden'},
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {isDesktop ? (
                    <DataGrid
                        rows={listData}
                        columns={columnsDefs}
                        getRowId={(row) => row?.[idName]}
                        loading={isLoading}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowSelectionModelChange={handleRowSelection}
                        pageSizeOptions={[5, 10]}
                        initialState={{pagination: {paginationModel}}}
                        sx={{
                            border: 0,
                            width: '100%',
                            maxWidth: size,
                            height: "100%",
                            backgroundColor: "background.paper",
                            "& .MuiDataGrid-virtualScroller": {
                                overflow: "auto"
                            }
                        }}
                    />
                ) : (
                    <CrudBodyMobile
                        listData={listData}
                        isLoading={isLoading}
                        selectedItem={selectedItem}
                        idName={idName}
                        emptyText={emptyText}
                        renderItem={renderMobileItem}
                        onItemClick={(row) => setSelectItem(row)}
                    />
                )}
            </Box>
        </Paper>
    )
}

export default CrudDataBody;