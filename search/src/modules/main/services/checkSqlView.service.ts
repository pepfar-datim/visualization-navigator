import datimApi from "@pepfar-react-lib/datim-api";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {config} from "../../../config/config";
import {Visualization} from "../../searchPage/types/visualization.type";
import {searchVisualizations} from "../../searchPage/services/searchVisualizations.service";

export async function checkSqlView():Promise<SqlViewVersion>{
    try {
        let visualization: Visualization[] = await searchVisualizations([], {limit: 1} as any)
        return visualization[0].sql;
    }catch(e){
        await datimApi.postJson('/sqlViews',config.createSqlViewQuery);
        return Promise.resolve(SqlViewVersion.withoutUsers)
    }
}