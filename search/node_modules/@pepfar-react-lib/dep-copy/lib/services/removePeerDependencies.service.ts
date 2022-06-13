import {rmdir} from "fs";
import {PackageJson} from "../types/package.type";
import {getLocalPath} from "./path.service";
import {splitPackageName} from "./getPackageName.service";

export function removePeerDependencies(packageJson:PackageJson){
    if (!packageJson.peerDependencies) return console.log(`No peer dependencies found`)
    let peerDependencies:string[] = Object.keys(packageJson.peerDependencies);
    peerDependencies.forEach((depName:string)=>{
        let packagePath = getLocalPath(splitPackageName(packageJson.name))+'/node_modules/'+depName;
        rmdir(packagePath,{recursive: true}, function(){
            console.log(`Deleted ${packagePath}`);
        })
    })
}