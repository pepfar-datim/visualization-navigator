import React, {useState} from "react";
// @ts-ignore
import {default as SD} from "@dhis2/d2-ui-sharing-dialog";
// @ts-ignore
import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import {VisualizationType} from "../../searchPage/types/visualization.type";
import {IconButton, Tooltip} from "@mui/material";
import {Share} from "@mui/icons-material";
import {ShareSettings} from "../types/sharing.types";

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

export function SharingDialog({type,id,tooltip,onClose}:{id:string,type:VisualizationType, tooltip:string,onClose?:(shareSettings:ShareSettings)=>void}) {
    let [sharingOpen,setSharingOpen] = useState<boolean>(false);
    let dhis2Type = getDhis2Type(type);
    return <>
        <div className={`actionButton`}>
            <Tooltip title={tooltip}>
                <IconButton onClick={()=>setSharingOpen(true)}>
                    <Share/>
                </IconButton>
            </Tooltip>
        </div>
        {sharingOpen&&<D2Shim i18nRoot={"./i18n"}>
            {({d2}:{d2:any})=>{
                if (!d2) return null;
                return <SD d2={d2} type={dhis2Type} id={id} open={true} onRequestClose={(shareSettings:any)=>{
                    console.log(shareSettings);
                    if (onClose) onClose(shareSettings);
                    setSharingOpen(false)
                }}/>
            }}
        </D2Shim>}
        </>
}