import {User} from "../../main/types/initState.type";

export function canShare(user:User,owner:string){
    return user.superUser||user.username===owner;
}