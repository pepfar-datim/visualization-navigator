import { config, getAuthorization, getFullUrl, isTestEnv } from "../config.service";
import { getMockedResponse, isGetMocked } from "../mock/getMock.serivce";
import { getCachedResponse, isResponseCached, saveResponseToCache } from "../cache/getCache.service";
import { ContentType } from "../../types/http.types";
const mergeOptions = (options, acceptType) => Object.assign({ headers: { Accept: acceptType } }, options);
export async function getJson(endpointUrl, options) {
    let response = await getData(endpointUrl, mergeOptions(options, ContentType.json)).then(r => r.json()).catch(e => {
        console.error(`Request failed`, endpointUrl, options);
        throw e;
    });
    if (isTestEnv() && !isGetMocked(endpointUrl))
        saveResponseToCache(config.testUsername, endpointUrl, response);
    return response;
}
export function getText(endpointUrl, options) {
    return getData(endpointUrl, mergeOptions(options, ContentType.text)).then(r => r.text());
}
function getData(endpointUrl, options) {
    if (isTestEnv() && isGetMocked(endpointUrl))
        return Promise.resolve(getMockedResponse(endpointUrl));
    if (isTestEnv() && isResponseCached(config.testUsername, endpointUrl))
        return Promise.resolve(getCachedResponse(config.testUsername, endpointUrl));
    if (isTestEnv())
        options.headers['authorization'] = getAuthorization();
    if (isTestEnv())
        console.log(`Request not cached ${endpointUrl}`);
    return fetch(getFullUrl(endpointUrl), { credentials: 'include', ...options });
}
//# sourceMappingURL=get.service.js.map