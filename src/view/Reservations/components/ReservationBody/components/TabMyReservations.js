import {DataGrid} from "@mui/x-data-grid";
import CrudBodyMobile
    from "../../../../../utils/ReusableComponents/CrudComponent/components/CrudDataBody/CrudBodyMobile";
import {useWindowSize} from "../../../../../utils/hooks/useWindowSize";
import {getColumnsDefs} from "../../../fields/columnDefs";
import {useSelector} from "react-redux";
import {selectMyReservations, selectMyReservationsLoading} from "../../../selectors/ReservationsSelectors";
import {useState} from "react";
import {renderMobileItem} from "../../renderMobileItem";
import QrCodeModal from "./QrCodeModal";

const paginationModel = {page: 0, pageSize: 50};

const TabMyReservations = (
    {
        selectedItem,
        idName,
        emptyText,
        isDesktop,
    }
) => {
    const {size} = useWindowSize();
    const [selectedQr, setSelectedQr] = useState(null);

    const listData = useSelector(selectMyReservations);
    const isLoading = useSelector(selectMyReservationsLoading);

    const handleOpenQr = (row) => {
        setSelectedQr(row?.qrCodeBase64 || null);
    };

    const columns = getColumnsDefs(handleOpenQr);

    return (
        <>
            {isDesktop ? (
                <DataGrid
                    rows={listData}
                    columns={columns}
                    getRowId={(row) => row?.[idName]}
                    loading={isLoading}
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
                    renderItem={(row) => renderMobileItem(row, handleOpenQr)}
                />
            )}
            {selectedQr &&
                <QrCodeModal open={selectedQr} onClose={() => setSelectedQr(null)}/>
            }
        </>
    )
}

export default TabMyReservations;