import {Visualization} from "../types/visualization.type";

export const selectAll = (visualizations:Visualization[],selected:boolean)=>{
    visualizations.forEach(v=>v.selected=selected)
    return visualizations;
}

export const areAllSelected = (visualizations:Visualization[])=>visualizations.filter(({selected})=>selected).length===visualizations.length;