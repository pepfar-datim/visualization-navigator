export enum HttpMethod {
    post='POST',
    get='GET',
    put='PUT',
    patch='PATCH'
}

export enum ContentType {
    json = 'application/json',
    text = 'text/plain'
}

export enum ErrorType {
    cannotParse,
    silentRedirect,
    httpError,
    alreadyExists,
    dhis2ErrorSpecified,
    dhis2ErrorUnspecified
}

export type ApiResponse = {
    success:boolean,
    errorType?:ErrorType,
    errorMessage?:string,
    rawResponse:Response,
    responseBody?: any
}