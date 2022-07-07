import datimApi from "@pepfar-react-lib/datim-api";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {config} from "../../../config/config";
import {getSearchParams} from "../../searchPage/services/getSearchParams.service";

// export async function checkSqlView():Promise<SqlViewVersion>{
//     try {
//         let visualization: Visualization[] = await searchVisualizations([], {limit: 1} as any)
//         if (!visualization[0].sql) throw new Error(`Cannot determine SQL version`)
//         return visualization[0].sql;
//     }catch(e){
//         await datimApi.postJson('/sqlViews',config.createSqlViewQuery);
//         return Promise.resolve(SqlViewVersion.withoutUsers)
//     }
// }

export async function checkSqlView():Promise<SqlViewVersion>{
    try {
        let fullUrl:string = `/sqlViews/VisNavgSrch/data?${getSearchParams([],{limit:1} as any)}`
        let response:any = await datimApi.getJson(fullUrl)
        if (response.listGrid.headers[5].name==='username') return SqlViewVersion.withUsers
        else return SqlViewVersion.withoutUsers;
    }catch(e){
        await datimApi.postJson('/sqlViews',config.createSqlViewQuery);
        return Promise.resolve(SqlViewVersion.withoutUsers)
    }
}