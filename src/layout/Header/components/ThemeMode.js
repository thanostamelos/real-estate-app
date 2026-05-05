import {IconButton, Tooltip} from "@mui/material";
import React, {useContext} from "react";
import {ColorModeContext} from "../../../theme/ThemeModeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const ThemeMode = () => {
    const colorMode = useContext(ColorModeContext);

    return (
        <Tooltip title={colorMode?.mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton onClick={colorMode.toggleColorMode} aria-label="toggle color mode">
                {colorMode?.mode === 'dark' ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/>}
            </IconButton>
        </Tooltip>
    )
}

export default ThemeMode