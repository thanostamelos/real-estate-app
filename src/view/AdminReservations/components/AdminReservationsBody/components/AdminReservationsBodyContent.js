import {DataGrid} from "@mui/x-data-grid";
import CrudBodyMobile
    from "../../../../../utils/ReusableComponents/CrudComponent/components/CrudDataBody/CrudBodyMobile";
import {useWindowSize} from "../../../../../utils/hooks/useWindowSize";
import {columnsDefs} from "../../../fields/columnDefs";
import {useSelector} from "react-redux";
import {selectReservations, selectReservationsLoading} from "../../../selectors/AdminReservationsSelectors";
import {renderMobileItem} from "../../renderMobileItem";

const paginationModel = {page: 0, pageSize: 50};

const AdminReservationsBodyContent = ({isDesktop}) => {
    const {size} = useWindowSize();

    const listData = useSelector(selectReservations);
    const isLoading = useSelector(selectReservationsLoading);

    return isDesktop ? (
        <DataGrid
            rows={listData}
            columns={columnsDefs}
            getRowId={(row) => row?.['reservationId']}
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
            idName={'reservationId'}
            renderItem={renderMobileItem}
        />
    )
}

export default AdminReservationsBodyContent;