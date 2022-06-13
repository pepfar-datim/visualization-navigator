import { Environment } from "../types/config.type";
export let config = {
    environment: null,
    baseUrl: null,
    testUsername: null,
    authorization: null,
};
export function register(environment, baseUrl) {
    if (!['production', 'development', 'test'].includes(environment))
        throw new Error(`Incorrect environment provided: ${environment}`);
    config.environment = environment;
    if (config.environment === Environment.production)
        config.baseUrl = `../../../`;
    else
        config.baseUrl = baseUrl;
}
export function setTestUsername(testUsername, authorization) {
    config.testUsername = testUsername;
    config.authorization = authorization;
}
export function getAuthorization() {
    return config.authorization;
}
export function isTestEnv() {
    if (!config.environment)
        throw new Error(`Environment not provided`);
    return config.environment === Environment.test;
}
export function getBaseUrl() {
    if (!config.baseUrl)
        throw new Error(`baseUrl not set`);
    return config.baseUrl;
}
export function getFullUrl(endpoint) {
    return `${getBaseUrl()}api${endpoint}`;
}
//# sourceMappingURL=config.service.js.map