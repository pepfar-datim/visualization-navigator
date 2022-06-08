import {appConfig} from "../app.config";

export async function checkSqlView(d2:any){
    if (!d2) return;
    let baseUrl:string = d2?.Api.getApi().baseUrl;
    let response:Response = await fetch(`${baseUrl}/sqlViews/VisNavgSrch.json`,{credentials:"include"});
    if (response.status===200) return;
    await createSqlView(baseUrl);
}

async function createSqlView(baseUrl:string){
    // let response:Response = await fetch({url: `${baseUrl}/sqlViews`, method: 'POST', credentials:"include"});
    let response:Response = await fetch(`${baseUrl}/sqlViews`,{
        credentials:"include",
        method:'POST',
        body: JSON.stringify(appConfig.createSqlViewQuery),
        headers:{
            'content-type': 'application/json'
        }
    });
    console.log(await response.json())
}