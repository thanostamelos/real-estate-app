import CrudHeader from "../components/CrudHeader";
import CrudDataBody from "../components/CrudDataBody/CrudDataBody";
import {Box} from "@mui/material";

const CrudComponent = (
    {
        title,
        setOpen,
        handleDeleteItem,
        listData,
        isLoading,
        columnsDefs,
        clearSelectedItem,
        setSelectedItem,
        selectedItem,
        idName,
        renderMobileItem,
        emptyText
    }
) => {


    return (
        <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
            <CrudHeader
                title={title}
                setOpen={setOpen}
                selectedItemId={selectedItem?.[idName]}
                handleDeleteItem={handleDeleteItem}
            />
            <CrudDataBody
                listData={listData}
                isLoading={isLoading}
                columnsDefs={columnsDefs}
                clearSelectedItem={clearSelectedItem}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                idName={idName}
                renderMobileItem={renderMobileItem}
                emptyText={emptyText}
            />
        </Box>
    )
}

export default CrudComponent;