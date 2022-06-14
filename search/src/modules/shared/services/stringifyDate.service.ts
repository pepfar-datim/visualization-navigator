export function stringifyDate(jsDate:string):string{
    return new Date(jsDate).toISOString().split('T')[0]
}