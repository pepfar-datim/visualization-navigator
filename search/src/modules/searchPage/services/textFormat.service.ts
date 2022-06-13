export function camelCaseToCapitalized(camelCase:string):string{
    let match = camelCase.match(/^[a-z]+|[A-Z][a-z]*/g);
    if (!match) return '';
    return match.map(function(x){
        return x[0].toUpperCase() + x.substr(1).toLowerCase();
    }).join(' ');
}

export function camelCaseToWords(camelCase:string):string{
    let match = camelCase.match(/^[a-z]+|[A-Z][a-z]*/g);
    if (!match) return '';
    return match.map(function(x){
        return x.toLowerCase();
    }).join(' ');
}