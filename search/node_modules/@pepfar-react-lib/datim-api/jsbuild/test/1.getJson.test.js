import datimApi from "../index";
import { testCredentials } from "./testCredentials.const";
import fetch from "node-fetch";
import { Environment } from "../types/config.type";
// @ts-ignore
global.fetch = fetch;
test(`1 > getJson`, async () => {
    datimApi.register(Environment.test, testCredentials.url);
    datimApi.setTestUsername(testCredentials.username, testCredentials.auth);
    let response = await datimApi.getJson(`/me`);
    expect(response.id.length).toBe(11);
});
//# sourceMappingURL=1.getJson.test.js.map