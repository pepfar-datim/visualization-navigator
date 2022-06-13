import {config, getAuthorization, getFullUrl, isTestEnv} from "../config.service";
import {getMockedResponse, isGetMocked} from "../mock/getMock.serivce";
import {getCachedResponse, isResponseCached, saveResponseToCache} from "../cache/getCache.service";
import {ContentType} from "../../types/http.types";

const mergeOptions = (options:RequestInit,acceptType:string)=>Object.assign({headers:{Accept: acceptType}},options);

export async function getJson(endpointUrl:string,options?:RequestInit):Promise<any>{
    let response = await getData(endpointUrl,mergeOptions(options,ContentType.json)).then(r=>r.json()).catch(error=>{
        console.error(`Request failed`,endpointUrl,error);
        throw error;
    });
    if (isTestEnv()&&!isGetMocked(endpointUrl)) saveResponseToCache(config.testUsername,endpointUrl,response);
    return response;
}

export function getText(endpointUrl:string, options?:RequestInit):Promise<any>{
    return getData(endpointUrl,mergeOptions(options,ContentType.text)).then(r=>r.text());
}

function getData(endpointUrl, options?:RequestInit):Promise<any>{
    if (isTestEnv()&&isGetMocked(endpointUrl)) return Promise.resolve(getMockedResponse(endpointUrl));
    if (isTestEnv()&&isResponseCached(config.testUsername,endpointUrl)) return Promise.resolve(getCachedResponse(config.testUsername,endpointUrl))
    if (isTestEnv()) options.headers['authorization'] = getAuthorization();
    if (isTestEnv()) console.log(`Request not cached ${endpointUrl}`)
    return fetch(getFullUrl(endpointUrl),{credentials: 'include', ...options})
}