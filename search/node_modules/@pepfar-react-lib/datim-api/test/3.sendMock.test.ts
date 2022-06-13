import datimApi from "../index";
import {Environment} from "../types/config.type";
import {testCredentials} from "./testCredentials.const";

test(`3 > Send mock > mock invite`, async ()=>{
    datimApi.register(Environment.test, '');
    datimApi.setTestUsername(testCredentials.username,testCredentials.auth);
    let payloadPromise = datimApi.registerSendMock(`/users/invite`,{response: 'success'});
    let response = await datimApi.postJson(`/users/invite`,{request: 'user'});
    expect(response.responseBody).toStrictEqual({response: 'success'});
    expect(await payloadPromise).toStrictEqual({request: 'user'});
});

test(`3 > Send mock > error: not mocked in test`, async ()=>{
    datimApi.register(Environment.test, '');
    datimApi.setTestUsername(testCredentials.username,testCredentials.auth);
    await expect(async ()=>datimApi.postJson(`/users/123`,{request: 'user'})).rejects.toThrow();
});