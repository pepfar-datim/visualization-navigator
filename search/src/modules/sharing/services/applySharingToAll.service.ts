import {BulkSharingStatus, ShareSettings} from "../types/sharing.types";
import {Visualization, VisualizationType} from "../../searchPage/types/visualization.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {getDhis2Type} from "./getDhis2SharingType.service";

const query = (id:string,type:VisualizationType,payload:any)=>datimApi.putJson(`/sharing?type=${getDhis2Type(type)}&id=${id}`,payload).catch(()=>({success:false}))

//TODO: Return Message instead
export async function applySharingToAll(shareSettings:ShareSettings,visualizations:Visualization[]):Promise<BulkSharingStatus>{
    let {publicAccess,userGroupAccesses,userAccesses,externalAccess} = shareSettings;
    let payload = {
        object:{
            publicAccess,
            userGroupAccesses,
            userAccesses,
            externalAccess
        }
    }
    //TODO: Collect statuses of sharing operation
    let queries = await Promise.all(visualizations.map(({id,type})=>query(id,type,payload)));
    // let success:boolean = queries.map(({success})=>success).every(s=>s);
    let successCount = queries.filter(({success})=>success).length;
    let errorCount = queries.filter(({success})=>!success).length;
    return {success:errorCount===0, successCount, errorCount}
}