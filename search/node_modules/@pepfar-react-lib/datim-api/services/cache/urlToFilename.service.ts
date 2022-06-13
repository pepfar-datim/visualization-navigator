import md5 from "md5";

function clean(url:string):string{
    return url.replace(/^.+\/api/,"");
}

function getPrefix(url:string){
    return clean(url)
        .replace(/\?.+$/,'')
        .replace(/\//,'')
        .replace(/\//g,'_')
        .replace(".json",'')
}

export function urlToFilename(username:string, url:string):string{
    return `${getPrefix(url)}_${md5(username+clean(url))}`;
}