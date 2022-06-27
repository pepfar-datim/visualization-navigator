import datimApi from "@pepfar-react-lib/datim-api";
import {ShareSettings} from "../types/sharing.types";
import {getDhis2Type} from "./getDhis2SharingType.service";
import {VisualizationType} from "../../searchPage/types/visualization.type";

export function getSharing(type:VisualizationType,id:string):Promise<ShareSettings>{
    return datimApi.getJson(`/sharing?type=${getDhis2Type(type)}&id=${id}`).then(r=>r.object);
}