import {PackageName} from "../types/package.type";
import {getLocalPath} from "./path.service";
const cpx = require("cpx");

export async function fullCopy(path:string, packageName:PackageName):Promise<void>{
    return new Promise((resolve)=>{
        cpx.copy(path+'/**/*', getLocalPath(packageName), ()=>{
            resolve();
        });
    })
}