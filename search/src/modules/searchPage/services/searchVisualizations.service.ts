import {ServerResponse, Visualization, VisualizationType} from "../types/visualization.type";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../../searchFilters/types/filtersToUrl.service";
import datimApi from "@pepfar-react-lib/datim-api";
import {settingsToUrl} from "../../searchSettings/services/settingsToUrl.service";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import {SqlViewVersion} from "../types/appState.type";

function responseToModel(response:ServerResponse):Visualization[]{
    return response.listGrid.rows.map(row=>({
        type: row[4] as VisualizationType,
        name: row[1],
        views: parseInt(row[2]),
        lastViewed: row[3],
        owner: row[5],
        sql: row[6] as SqlViewVersion
    }))
}

export function searchVisualizations(searchFilters:SearchFilter[],searchSettings:SearchSettings):Promise<Visualization[]>{
    let fullUrl:string = `/sqlViews/VisNavgSrch/data?var=${filtersToUrl(searchFilters)},${settingsToUrl(searchSettings)}`
    return datimApi.getJson(fullUrl).then(responseToModel);
}