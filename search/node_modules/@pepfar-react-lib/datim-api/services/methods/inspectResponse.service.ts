import {ApiResponse, ErrorType} from "../../types/http.types";

function getErrorMessage(errorType:ErrorType, apiResponse:ApiResponse):string{
    switch (errorType){
        case ErrorType.cannotParse:
            return `Unsupported server response. Cannot retrieve response body.`
        case ErrorType.silentRedirect:
            return `Wrong request. Response status ${apiResponse.rawResponse.status}, Redirected to ${apiResponse.rawResponse.url}\n\tThis likely means either wrong url or invalid authentication`
        case ErrorType.httpError:
            return `Response status ${apiResponse.rawResponse.status} ${apiResponse.rawResponse.statusText}\n\tUrl: ${apiResponse.rawResponse.url}`
        case ErrorType.alreadyExists:
            return `Object already exists. ${apiResponse.responseBody.typeReports[0].objectReports[0].errorReports[0].message}`
        case ErrorType.dhis2ErrorSpecified:
            return `Server response: ${apiResponse.responseBody.typeReports[0].objectReports[0].errorReports[0].message}`
        case ErrorType.dhis2ErrorUnspecified:
            return `Server responded with status 200 but error in response body. Cannot retrieve error message.`
    }
}

class FailService {
    apiResponse:ApiResponse;
    responseBody:any;
    constructor(apiResponse:ApiResponse) {
        this.apiResponse = apiResponse;
    }
    fail(errorType:ErrorType):ApiResponse{
        this.apiResponse.success = false;
        this.apiResponse.errorType = errorType;
        this.apiResponse.errorMessage = getErrorMessage(errorType, this.apiResponse)
        return this.apiResponse;
    }
    success():ApiResponse{
        this.apiResponse.success = true;
        return this.apiResponse;
    }
}

export async function inspectResponse(rawResponse:Response|any):Promise<ApiResponse>{
    let apiResponse:ApiResponse = {
        success: false,
        rawResponse
    }
    let failService = new FailService(apiResponse);
    if (!rawResponse.ok) return failService.fail(ErrorType.httpError);
    if (rawResponse.redirected&&rawResponse.url.includes('login')) return failService.fail(ErrorType.silentRedirect)
    if (rawResponse.status===204&&!rawResponse.redirected) return failService.success();
    try {
        let responseBody:any = JSON.parse(await rawResponse.text() as any);
        failService.apiResponse.responseBody = responseBody;
        if (responseBody.status==='ERROR') try {
            if (responseBody.typeReports[0].objectReports[0].errorReports[0].message.includes('matching')) return failService.fail(ErrorType.alreadyExists)
            else return failService.fail(ErrorType.dhis2ErrorSpecified)
        } catch(e){
            return failService.fail(ErrorType.dhis2ErrorUnspecified)
        }
    } catch (e){
        return failService.fail(ErrorType.cannotParse);
    }
    return failService.success();
}