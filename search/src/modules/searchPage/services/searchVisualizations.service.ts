import {ServerResponse, SqlType, Visualization, VisualizationType} from "../types/visualization.type";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../../searchFilters/types/filtersToUrl.service";
import datimApi from "@pepfar-react-lib/datim-api";

function responseToModel(response:ServerResponse):Visualization[]{
    return response.listGrid.rows.map(row=>({
        type: row[4] as VisualizationType,
        name: row[1],
        views: parseInt(row[2]),
        lastViewed: row[3],
        owner: row[5],
        sql: row[6] as SqlType
    }))
}

export function searchVisualizations(searchFilters:SearchFilter[]):Promise<Visualization[]>{
    let fullUrl:string = `/sqlViews/VisNavgSrch/data?var=${filtersToUrl(searchFilters)},limit:100`
    return datimApi.getJson(fullUrl).then(responseToModel);
}