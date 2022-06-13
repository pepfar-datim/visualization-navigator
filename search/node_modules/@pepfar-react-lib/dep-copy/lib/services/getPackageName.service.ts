import {PackageName} from "../types/package.type";

export function splitPackageName(fullName:string):PackageName{
    let tokens = fullName.split('/');
    let nameSpace = tokens[0].replace('@','');
    return {nameSpace,localName:tokens[1]}
}