import {Visualization, VisualizationType} from "../types/visualization.type";

export const selectAll = (visualizations:Visualization[],selected:boolean)=>{
    visualizations.filter(v=>v.type!==VisualizationType.dashboard).forEach(v=>v.selected=selected)
    return visualizations;
}

export const areAllSelected = (visualizations:Visualization[])=>visualizations.filter(({selected})=>selected).length===visualizations.length;