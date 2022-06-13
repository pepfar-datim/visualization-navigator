import {Config, Environment} from "../types/config.type";

export let config:Config={
    environment: null,
    baseUrl:null,
    testUsername: null,
    authorization: null,
};

export function register(environment:string,baseUrl?:string){
    if (!['production','development','test'].includes(environment)) throw new Error(`Incorrect environment provided: ${environment}`)
    config.environment = environment as Environment;
    if (config.environment===Environment.production) config.baseUrl = `../../../`;
    else config.baseUrl = baseUrl;
}

export function setTestUsername(testUsername:string,authorization:string){
    config.testUsername = testUsername;
    config.authorization = authorization;
}

export function getAuthorization():string{
    return config.authorization;
}

export function isTestEnv():boolean{
    if (!config.environment) throw new Error(`Environment not provided`);
    return config.environment===Environment.test;
}

export function getBaseUrl():string{
    if (!config.baseUrl) throw new Error(`baseUrl not set`);
    return config.baseUrl;
}

export function getFullUrl(endpoint:string):string{
    return `${getBaseUrl()}api${endpoint}`;
}