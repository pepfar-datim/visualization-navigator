import React, {useState} from "react";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {SearchSettingsDialog} from "./searchSettingsDialog.component";
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";
import "../style/searchSettings.css";
import {TopBarButton} from "../../searchPage/components/topBarButton.component";
import {Trigger} from "../../shared/types/shared.types";

export function SearchSettingsComponent({searchSettings, updateSettings}:{searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    let [open,setOpen] = useState(false);
    return <div className='searchTopBarButton'>
        <FormControl>
            <Tooltip title='Settings'>
                <IconButton component="span" onClick={()=>setOpen(true)} data-testid={`searchSettingsButton`}>
                    <Settings />
                </IconButton>
            </Tooltip>
        </FormControl>
        {open && <SearchSettingsDialog searchSettings={searchSettings} updateSettings={updateSettings} close={()=>setOpen(false)} open={open}/>}
    </div>
}



// export function SearchSettingsComponent({searchSettings, updateSettings}:{searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
//     function SD({open,close}:{close:Trigger,open:boolean}){
//         return <SearchSettingsDialog open={open} close={close} searchSettings={searchSettings} updateSettings={updateSettings} />
//     }
//     return <TopBarButton tooltip={'Settings'} testid={'searchSettingsButton'} Content={SD} icon={<Settings />}/>
// }