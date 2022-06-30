import datimApi from "@pepfar-react-lib/datim-api";
import {DhisUser, User} from "../types/initState.type";

export async function getUser():Promise<User>{
    let dhisUser:DhisUser = await datimApi.getJson(`/me?fields=authorities,userCredentials[username]`);
    return {
        superUser: dhisUser.authorities.includes('ALL'),
        username: dhisUser.userCredentials.username
    }
}