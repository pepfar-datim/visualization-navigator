import { ContentType, HttpMethod } from "../../types/http.types";
import { inspectResponse } from "./inspectResponse.service";
import { mockSendingData } from "../mock/sendMock.service";
import { getFullUrl, isTestEnv } from "../config.service";
export function postJson(url, body) {
    return sendData(HttpMethod.post, url, ContentType.json, body);
}
export function putJson(url, body) {
    return sendData(HttpMethod.put, url, ContentType.json, body);
}
export function patchJson(url, body) {
    return sendData(HttpMethod.patch, url, ContentType.json, body);
}
export function postText(url, body) {
    return sendData(HttpMethod.post, url, ContentType.text, body);
}
export function postEmpty(url) {
    return sendData(HttpMethod.post, url, ContentType.text, null);
}
function sendData(method, endpoint, contentType, payload) {
    if (isTestEnv())
        return mockSendingData(endpoint, payload);
    return fetch(getFullUrl(endpoint), {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': contentType
        },
        body: contentType === ContentType.json ? JSON.stringify(payload) : payload
    }).then(inspectResponse).then((apiResponse) => {
        if (!apiResponse.success)
            throw new Error(apiResponse.errorMessage);
        else
            return apiResponse;
    });
}
//# sourceMappingURL=sendData.service.js.map