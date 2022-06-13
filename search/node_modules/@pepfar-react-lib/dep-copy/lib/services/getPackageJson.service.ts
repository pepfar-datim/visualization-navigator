import {PackageJson} from "../types/package.type";
const jsonfile = require("jsonfile");

export async function getPackageJson(path:string):Promise<PackageJson>{
    return await jsonfile.readFile(path+'/package.json');
}