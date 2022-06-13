export class MockService {
    registeredMocks = [];
    registerMockedResponse(url, response) {
        this.registeredMocks = this.registeredMocks.filter(mock => mock.url !== url);
        this.registeredMocks.push({ url, response });
    }
    getMockedResponse(url) {
        let foundMocks = this.registeredMocks.filter(m => m.url === url);
        if (foundMocks.length === 0)
            return null;
        if (foundMocks.length > 1)
            throw new Error(`Found multiple get mocks matching ${url}`);
        if (typeof foundMocks[0].response !== 'string')
            return foundMocks[0].response;
    }
    isMocked(url) {
        return this.registeredMocks.some(m => m.url === url);
    }
}
//# sourceMappingURL=mock.service.js.map