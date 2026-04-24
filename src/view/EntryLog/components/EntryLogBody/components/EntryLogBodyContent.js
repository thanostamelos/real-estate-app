import {DataGrid} from "@mui/x-data-grid";
import CrudBodyMobile
    from "../../../../../utils/ReusableComponents/CrudComponent/components/CrudDataBody/CrudBodyMobile";
import {useWindowSize} from "../../../../../utils/hooks/useWindowSize";
import {selectAllEntries, selectAllEntriesLoading} from "../../../selectors/EntryLogSelectors";
import {useSelector} from "react-redux";
import {columnsDefs} from "../../../fields/columnDefs";
import {entryLogMobileView} from "./entryLogMobileView";

const paginationModel = {page: 0, pageSize: 50};

const EntryLogBodyContent = ({isDesktop}) => {
    const {size} = useWindowSize();

    const listData = useSelector(selectAllEntries);
    const isLoading = useSelector(selectAllEntriesLoading);

    return isDesktop ? (
        <DataGrid
            rows={listData}
            columns={columnsDefs}
            getRowId={(row) => row?.['entryLogId']}
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
            renderItem={entryLogMobileView}
        />
    )
}

export default EntryLogBodyContent;