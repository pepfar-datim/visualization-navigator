import {Visualization, VisualizationType} from "../types/visualization.type";

export const selectAll = (visualizations:Visualization[],selected:boolean)=>{
    visualizations.forEach(v=>v.selected=selected)
    return visualizations;
}

export const areAllSelected = (visualizations:Visualization[])=>{
 return visualizations
     .every(({selected})=>selected);
};

export const getSelectedVisualizations = (visualizations:Visualization[])=>visualizations.filter(v=>v.selected);