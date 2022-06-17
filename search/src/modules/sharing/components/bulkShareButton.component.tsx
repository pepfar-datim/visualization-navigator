import React, {useState} from "react";
import {Visualization} from "../../searchPage/types/visualization.type";
import {SharingDialog} from "./sharingDialog.component";
import {ShareAllDialog} from "./shareAllDialog.component";
import {applySharingToAll} from "../services/applySharingToAll.service";
import {ShareSettings} from "../types/sharing.types";

export function BulkShareButton({visualizations}:{visualizations:Visualization[]}) {
    let [shareAllDialogOpen, setShareAllDialogOpen] = useState<boolean>(false);
    let selected:Visualization[] = visualizations.filter(({selected})=>selected)
    if (selected.length===0) return null;
    let shareSettings:ShareSettings;
    function onShareDialogClose(newShareSettings:ShareSettings){
        setShareAllDialogOpen(true);
        shareSettings = newShareSettings;
    }
    function onShareAllQuestionClose(applyToAllAnswer:boolean){
        setShareAllDialogOpen(false);
        if (applyToAllAnswer) applySharingToAll(shareSettings,selected);
    }
    return <div className='searchTopBarButton'>
        <SharingDialog
            id={selected[0].id}
            type={selected[0].type}
            tooltip={`Update sharing (selected items)`}
            onClose={onShareDialogClose}
        />
        {shareAllDialogOpen&&<ShareAllDialog onClose={onShareAllQuestionClose}/>}
    </div>
}