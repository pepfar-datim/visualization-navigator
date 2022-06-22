import React from "react";
import {Visualization} from "../../searchPage/types/visualization.type";

export function BulkShareButton({visualizations}:{visualizations:Visualization[]}) {
    return null;
    // let [shareAllDialogOpen, setShareAllDialogOpen] = useState<boolean>(false);
    // let selected:Visualization[] = visualizations.filter(({selected})=>selected)
    // if (selected.length===0) return null;
    // let shareSettings:ShareSettings;
    // function onShareDialogClose(newShareSettings:ShareSettings){
    //     setShareAllDialogOpen(true);
    //     shareSettings = newShareSettings;
    // }
    // function onShareAllQuestionClose(applyToAllAnswer:boolean){
    //     setShareAllDialogOpen(false);
    //     if (applyToAllAnswer) applySharingToAll(shareSettings,selected);
    // }
    // return <div className='searchTopBarButton'>
    //     <SharingDialog
    //         id={selected[0].id}
    //         type={selected[0].type}
    //         tooltip={`Update sharing (selected items)`}
    //         onClose={onShareDialogClose}
    //     />
    //     {shareAllDialogOpen&&<ShareAllDialog onClose={onShareAllQuestionClose}/>}
    // </div>
}