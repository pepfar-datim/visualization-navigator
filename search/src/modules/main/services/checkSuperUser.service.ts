import datimApi from "@pepfar-react-lib/datim-api";

export async function checkSuperUser():Promise<boolean>{
    try {
        let authorities: string[] = await datimApi.getJson(`/me?fields=authorities`).then(r => r.authorities);
        return authorities.includes('ALL')
    }catch(e){
        return true;
    }
}