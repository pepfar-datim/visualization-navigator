import {VisualizationType} from "../../searchPage/types/visualization.type";

export const getDhis2Type = (type:VisualizationType)=>{
    switch(type){
        case VisualizationType.pivot:
        case VisualizationType.chart:
            return 'visualization'
        case VisualizationType.dashboard:
            return 'dashboard'
        case VisualizationType.map:
            return 'map'
    }
}