import React, {useState} from "react";
import {Visualization} from "../types/visualization.type";
import {SearchSettings, UpdateSearchSettings} from "../../searchSettings/types/searchSettings.type";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import {Settings, Share} from "@mui/icons-material";
import {SearchSettingsDialog} from "../../searchSettings/components/searchSettingsDialog.component";
import {SharingDialog} from "../../searchResults/components/sharingDialog.component";

export function BulkShareButton({visualizations}:{visualizations:Visualization[]}) {
    let [open,setOpen] = useState(false);
    if (!visualizations.some(({selected})=>selected)) return null;
    return <div className='searchTopBarButton'>
        <FormControl>
            <Tooltip title='Update sharing of selected items'>
                <IconButton component="span" onClick={()=>setOpen(true)} data-testid={`bulkShareButton`}>
                    <Share />
                </IconButton>
            </Tooltip>
        </FormControl>
        {/*{open && <SharingDialog id={} type={}/>}*/}
    </div>
}