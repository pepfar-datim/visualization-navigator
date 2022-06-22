import {ShareSettings} from "../types/sharing.types";
import {Visualization} from "../../searchPage/types/visualization.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {getDhis2Type} from "./getDhis2SharingType.service";

export function applySharingToAll(shareSettings:ShareSettings,visualizations:Visualization[]){
    console.log(shareSettings);
    let {publicAccess,userGroupAccesses,userAccesses,externalAccess} = shareSettings;
    let payload = {
        object:{
            publicAccess,
            userGroupAccesses,
            userAccesses,
            externalAccess
        }
    }
    visualizations.forEach(async ({id,type})=>{
        let r = await datimApi.putJson(`/sharing?type=${getDhis2Type(type)}&id=${id}`,payload);
        console.log(r);
    });
}