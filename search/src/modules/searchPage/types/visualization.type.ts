export enum VisualizationType {
    pivot='pivot',
    dashboard='dashboard',
    chart='chart',
    map='map'
}

export const visualizationTypeList = Object.keys(VisualizationType);

export enum SqlType {
    enhanced='enhanced',
    default='default'
}

export type Visualization = {
    type: VisualizationType,
    name: string,
    views: number,
    lastViewed: string,
    owner: string,
    sql: SqlType
}

export type ServerResponse = {
    listGrid:{
        rows: string[]
    }
}