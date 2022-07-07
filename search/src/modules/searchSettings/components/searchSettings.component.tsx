import React, {useState} from "react";
import {Button, FormControl} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {SearchSettingsDialog} from "./searchSettingsDialog.component";
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";
import "../style/searchSettings.css";

export function SearchSettingsComponent({searchSettings, updateSettings}:{searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    let [open,setOpen] = useState(false);
    return <div className='searchTopBarButton'>
        <FormControl>
            <Button onClick={()=>setOpen(true)} variant='outlined' data-testid={`searchSettingsButton`} startIcon={ <Settings />}>
                Settings
            </Button>
        </FormControl>
        {open && <SearchSettingsDialog searchSettings={searchSettings} updateSettings={updateSettings} close={()=>setOpen(false)} open={open}/>}
    </div>
}
