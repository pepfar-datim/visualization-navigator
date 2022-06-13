import { MockService } from "./mock.service";
let sendMockService = new MockService();
export function registerSendMock(url, response) {
    return new Promise((resolve) => {
        sendMockService.registerMockedResponse(url, { response, resolve });
    });
}
export function mockSendingData(url, payload) {
    if (!isSendMocked(url))
        throw new Error(`POST/PUT mock not in place`);
    let { resolve, response } = sendMockService.getMockedResponse(url);
    resolve(payload);
    return Promise.resolve({ responseBody: response, success: true, rawResponse: null });
}
export function isSendMocked(url) {
    return sendMockService.isMocked(url);
}
//# sourceMappingURL=sendMock.service.js.map