import { MockService } from "./mock.service";
let getMockService = new MockService();
export function registerGetMock(url, response) {
    getMockService.registerMockedResponse(url, response);
}
export function getMockedResponse(url) {
    return { json: () => getMockService.getMockedResponse(url) };
}
export function isGetMocked(url) {
    return getMockService.isMocked(url);
}
//# sourceMappingURL=getMock.serivce.js.map