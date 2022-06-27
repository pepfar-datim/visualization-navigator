import {ServerResponse, Visualization, VisualizationType} from "../types/visualization.type";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import {SqlViewVersion} from "../types/appState.type";
import {getSearchParams} from "./getSearchParams.service";


function responseToModel(response:ServerResponse):Visualization[]{
    return response.listGrid.rows.map(row=>({
        id: row[0],
        type: row[4] as VisualizationType,
        name: row[1],
        views: parseInt(row[2])||0,
        lastViewed: row[3],
        owner: row[5],
        sql: row[6] as SqlViewVersion,
        selected: false
    }))
}

export function searchVisualizations(searchFilters:SearchFilter[],searchSettings:SearchSettings):Promise<Visualization[]>{
    let fullUrl:string = `/sqlViews/VisNavgSrch/data?${getSearchParams(searchFilters,searchSettings)}`
    return datimApi.getJson(fullUrl).then(responseToModel);
}