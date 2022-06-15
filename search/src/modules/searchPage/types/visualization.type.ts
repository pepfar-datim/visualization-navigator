import {SqlViewVersion} from "./appState.type";

export enum VisualizationType {
    pivot='pivot',
    dashboard='dashboard',
    chart='chart',
    map='map'
}

export const visualizationTypeList = Object.keys(VisualizationType);


export type Visualization = {
    type: VisualizationType,
    name: string,
    views: number,
    lastViewed: string,
    owner: string,
    sql: SqlViewVersion
}

export type ServerResponse = {
    listGrid:{
        rows: string[]
    }
}