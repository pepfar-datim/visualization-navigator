import datimApi from "../index";
import { Environment } from "../types/config.type";
import { testCredentials } from "./testCredentials.const";
test(`2 > Get Mock`, async () => {
    datimApi.register(Environment.test, '');
    datimApi.setTestUsername(testCredentials.username, testCredentials.auth);
    datimApi.registerGetMock(`/users/test`, { name: 'test' });
    let response = await datimApi.getJson(`/users/test`);
    expect(response).toStrictEqual({ name: 'test' });
});
//# sourceMappingURL=2.getMock.test.js.map