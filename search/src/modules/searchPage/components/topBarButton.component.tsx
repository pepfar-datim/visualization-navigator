import React, {useState} from "react";
import {SearchSettings, UpdateSearchSettings} from "../../searchSettings/types/searchSettings.type";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {SearchSettingsDialog} from "../../searchSettings/components/searchSettingsDialog.component";
import {SqlViewVersion} from "../types/appState.type";
import {Trigger} from "../../shared/types/shared.types";

export function TopBarButton({tooltip, testid,Content, icon}:{tooltip:string,testid:string,Content:React.ComponentType<any>,icon:any}) {
    let [open,setOpen] = useState(false);
    return <div className='searchTopBarButton'>
        <FormControl>
            <Tooltip title={tooltip}>
                <IconButton component="span" onClick={()=>setOpen(true)} data-testid={testid}>
                    {icon}
                </IconButton>
            </Tooltip>
        </FormControl>
        {open && <Content close={()=>setOpen(false)} open={open}/>}
    </div>
}