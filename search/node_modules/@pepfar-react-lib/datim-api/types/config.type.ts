export enum Environment {
    test='test',
    production='production',
    development='development'
}
export type Config = {
    environment: Environment,
    baseUrl:string,
    testUsername:string,
    authorization:string,
}