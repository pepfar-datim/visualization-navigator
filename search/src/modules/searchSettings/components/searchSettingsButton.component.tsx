import React, {useState} from "react";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {SearchSettingsDialog} from "./searchSettingsDialog.component";
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";

export function SearchSettingsButton({searchSettings, updateSettings}:{searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    let [open,setOpen] = useState(false);
    return <div id='searchSettingsButton'>
        <FormControl>
            <Tooltip title='Settings'>
                <IconButton component="span" onClick={()=>setOpen(true)}>
                    <Settings />
                </IconButton>
            </Tooltip>
        </FormControl>
        {open && <SearchSettingsDialog searchSettings={searchSettings} updateSettings={updateSettings} close={()=>setOpen(false)} open={open}/>}
    </div>
}