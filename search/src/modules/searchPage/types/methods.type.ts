import {SearchFilter} from "../../searchFilters/types/searchFilters.type";

export type UpdateFilters = (searchFilters:SearchFilter[])=>void;
export type SelectVisualization = (visualizationId:string)=>void;