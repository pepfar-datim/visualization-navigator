import {getLocalPath} from "./path.service";
import {PackageName} from "../types/package.type";
const cpx = require("cpx");

function setupReporter(copyHandle:any,path:string){
    copyHandle.on('copy',(e:any)=>console.log(e.srcPath.replace(path,'')));
}

export async function watchFiles(path:string, packageName:PackageName){
    return new Promise((resolve)=>{
        setupReporter(cpx.watch(path+'/**/*', getLocalPath(packageName),{initialCopy:false}),path)
    })
}