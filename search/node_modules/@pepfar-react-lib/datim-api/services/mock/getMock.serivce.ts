import {MockService} from "./mock.service";

let getMockService = new MockService();

export function registerGetMock(url:string, response:any){
    getMockService.registerMockedResponse(url,response);
}

export function getMockedResponse(url:string){
    return {json: ()=>getMockService.getMockedResponse(url)};
}

export function isGetMocked(url:string):boolean{
    return getMockService.isMocked(url);
}