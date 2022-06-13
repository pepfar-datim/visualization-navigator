export const capitalize = (str:string)=>str[0].toUpperCase() + str.substr(1).toLowerCase();

export function camelCaseToCapitalized(camelCase:string):string{
    let match = camelCase.match(/^[a-z]+|[A-Z][a-z]*/g);
    if (!match) return '';
    return match.map(capitalize).join(' ');
}

export function camelCaseToWords(camelCase:string):string{
    let match = camelCase.match(/^[a-z]+|[A-Z][a-z]*/g);
    if (!match) return '';
    return match.map(function(x){
        return x.toLowerCase();
    }).join(' ');
}