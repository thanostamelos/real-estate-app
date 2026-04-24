import {IconButton} from "@mui/material";
import React from "react";
import {IconEye, IconEyeOff} from "@tabler/icons-react";


const EndAdornment = ({fieldType, setFieldType}) => {
    const icon = fieldType ? <IconEye/> : <IconEyeOff/>;

    const showPassword = () => {
        setFieldType(prev => !prev);
    }

    return (
        <IconButton onClick={showPassword}>{icon}</IconButton>
    )
}

export default EndAdornment;