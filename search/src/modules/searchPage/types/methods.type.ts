import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {Message} from "../../message/types/message.type";

export type UpdateFilters = (searchFilters:SearchFilter[])=>void;
export type SelectVisualization = (visualizationId:string)=>void;
export type PostMessage = (message:Message)=>void;