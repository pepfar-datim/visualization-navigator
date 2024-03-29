import {FilterOperator, FilterProperty, SearchFilter} from "./searchFilters.type";

export type ChangeFilterType = (filterType:FilterProperty)=>void;
export type ChangeFilterValue = (filterType:string)=>void;
export type ChangeFilterOperator = (filterOperator:FilterOperator)=>void;
export type ChangeFilter = (searchFilter:SearchFilter)=>void;
export type ChangeVisualizationType = (e:any)=>void;
export type OnDateChange = (date:string|null)=>void;