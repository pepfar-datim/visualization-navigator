import React, {useState} from "react";
// @ts-ignore
import {default as SD} from "@dhis2/d2-ui-sharing-dialog";
// @ts-ignore
import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import {VisualizationType} from "../../searchPage/types/visualization.type";
import {IconButton, Tooltip} from "@mui/material";
import {Share} from "@mui/icons-material";

const getDhis2Type = (type:VisualizationType)=>{
    switch(type){
        case VisualizationType.pivot:
        case VisualizationType.chart:
            return 'visualization'
        case VisualizationType.dashboard:
            return 'dashboard'
        case VisualizationType.map:
            return 'map'
    }
}

export function SharingDialog({type,id}:{id:string,type:VisualizationType}) {
    let [sharingOpen,setSharingOpen] = useState<boolean>(false);
    let dhis2Type = getDhis2Type(type);
    return <>
        <div className={`actionButton`}>
            <Tooltip title={'Update sharing (this item)'}>
                <IconButton onClick={()=>setSharingOpen(true)}>
                    <Share/>
                </IconButton>
            </Tooltip>
        </div>
        {sharingOpen&&<D2Shim>
            {({d2}:{d2:any})=>d2&&<SD d2={d2} type={dhis2Type} id={id} open={true} onRequestClose={()=>setSharingOpen(false)}/>}
        </D2Shim>}
        </>
}