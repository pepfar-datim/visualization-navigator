import {BulkSharingStatus, ShareSettings} from "../types/sharing.types";
import {Visualization} from "../../searchPage/types/visualization.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {getDhis2Type} from "./getDhis2SharingType.service";

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
    let queries = await Promise.all(visualizations.map(({id,type})=>datimApi.putJson(`/sharing?type=${getDhis2Type(type)}&id=${id}`,payload)));
    let success:boolean = queries.map(({success})=>success).every(s=>s);
    return {success,targetCount:visualizations.length}
}