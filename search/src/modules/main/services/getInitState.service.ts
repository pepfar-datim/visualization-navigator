import {InitState} from "../types/initState.type";
import {getUser} from "./getUser.service";
import {checkSqlView} from "./checkSqlView.service";
import {SqlViewVersion} from "../../searchPage/types/appState.type";

export async function getInitState():Promise<InitState>{
    let [user, sqlViewVersion] = await Promise.all([getUser(), checkSqlView()])
    return {
        user,
        includeUsers:sqlViewVersion===SqlViewVersion.withUsers,
        fetched:true
    };
}