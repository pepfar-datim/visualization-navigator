export type SearchSettings = {
    limitViewsMinDate:string|null,
    limitViewsMaxDate:string|null,
    limitedViewRange:boolean,
    limit:number|string,
}

export type UpdateSearchSettings = (settings:SearchSettings)=>void;