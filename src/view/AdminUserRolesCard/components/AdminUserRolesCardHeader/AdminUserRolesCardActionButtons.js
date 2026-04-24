import SimpleButton from "../../../../utils/Buttons/SimpleButton";
import React from "react";

const AdminUserRolesCardActionButtons = ({formik, edit, setEdit}) => {

    return !edit ? (
        <SimpleButton name={'Edit'} onClick={() => setEdit(true)}/>
    ) : (
        <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
            <SimpleButton name={'Cancel'} onClick={() => {
                formik.resetForm();
                setEdit(false);
            }}/>
            <SimpleButton name={'Submit'} type="submit" onClick={formik?.handleSubmit} disabled={!formik?.dirty} />
        </div>
    )
}

export default AdminUserRolesCardActionButtons;