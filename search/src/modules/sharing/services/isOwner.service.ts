import datimApi from "@pepfar-react-lib/datim-api";

type Response = {
    user: {username:string}
}

export async function isOwner(id:string,username:string):Promise<boolean>{
    try {
        let response: Response = await datimApi.getJson(`/identifiableObjects/${id}.json?fields=user[username]`);
        return response.user.username === username;
    }catch(e){
        return false;
    }
}