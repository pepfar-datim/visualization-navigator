import React, {useState} from "react";
// @ts-ignore
import {default as SD} from "@dhis2/d2-ui-sharing-dialog";
// @ts-ignore
import {D2Shim} from "@dhis2/app-runtime-adapter-d2";
import {VisualizationType} from "../../searchPage/types/visualization.type";
import {IconButton, Tooltip} from "@mui/material";
import {Share} from "@mui/icons-material";
import {ApplySharingToAll, ShareSettings} from "../types/sharing.types";
import {ShareAllDialog} from "./shareAllDialog.component";
import {getDhis2Type} from "../services/getDhis2SharingType.service";
import datimApi from "@pepfar-react-lib/datim-api";
import {getSharing} from "../services/getSharing.service";

let shareSettings:ShareSettings;
let initialSharing:ShareSettings;

export function SharingDialog({type,id,applySharingToAll,areMultipleSelected}:{
    id:string,
    type:VisualizationType,
    applySharingToAll:ApplySharingToAll,
    areMultipleSelected:boolean
}) {
    let [singleShareOpen,setSingleShareOpen] = useState<boolean>(false);
    let [bulkShareOpen, setBulkShareOpen] = useState<boolean>(false);
    // let [shareSettings,setShareSettings] = useState<ShareSettings|null>(null)
    let dhis2Type = getDhis2Type(type);

    async function openSingleShare(){
        setSingleShareOpen(true);
        initialSharing = await getSharing(type,id);
    }

    function onSingleShareClose(newShareSettings:ShareSettings){
        setSingleShareOpen(false)
        if (!areMultipleSelected) return;
        if (JSON.stringify(initialSharing)===JSON.stringify(newShareSettings)) return;
        setBulkShareOpen(true);
        shareSettings=newShareSettings;
    }
    function onBulkShareClose(applyToAllAnswer:boolean){
        setBulkShareOpen(false);
        if (applyToAllAnswer) applySharingToAll(shareSettings);
    }

    return <>
        <div className={`actionButton`}>
            <Tooltip title={`Update sharing${areMultipleSelected?' (this and selected items)':' (this item)'}`}>
                <IconButton onClick={()=>openSingleShare()} data-testid={`updateSharingButton_${id}`}>
                    <Share/>
                </IconButton>
            </Tooltip>
        </div>
        {singleShareOpen&&<D2Shim i18nRoot={"./i18n"}>
            {({d2}:{d2:any})=>{
                if (!d2) return null;
                return <SD d2={d2} type={dhis2Type} id={id} open={true} onRequestClose={onSingleShareClose}/>
            }}
        </D2Shim>}
        {bulkShareOpen&&<ShareAllDialog onClose={onBulkShareClose}/>}
    </>
}