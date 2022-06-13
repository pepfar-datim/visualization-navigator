export type SearchSettings = {
    limitViewsMinDate?:string,
    limitViewsMaxDate?:string,
    limit:number,
}

export type UpdateSearchSettings = (settings:SearchSettings)=>void;