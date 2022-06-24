import {TextField} from "@mui/material";
import React from "react";
import {ChangeFilterValue, OnDateChange} from "../types/methods.type";
import {FilterProperty} from "../types/searchFilters.type";
import {FormControl} from "./formControl.component";
import {DateSelect} from "./dateSelect.component";
import {VisualizationTypeFilterSelect} from "./visualizationTypeFilterSelect.component";
import {VisualizationType} from "../../searchPage/types/visualization.type";


const fc = (label:boolean|null,c:JSX.Element)=><FormControl>
    {c}
</FormControl>

function onChange(changeFilterValue:ChangeFilterValue){
    return (e:any)=>{
        changeFilterValue(e?.target?.value);
    }
}

export function FilterValueInput({filterProperty,filterValue, changeFilterValue,i}:{filterProperty:FilterProperty|null, filterValue:string|null, changeFilterValue:ChangeFilterValue,i:number}) {
    switch (filterProperty){
        case FilterProperty.name:
        case FilterProperty.owner:
            return fc(!filterValue,<TextField variant="standard" value={filterValue||''} onChange={onChange(changeFilterValue)} inputProps={{'data-testid':`filterValue_${i}`}}/>)
        case FilterProperty.views:
            return fc(!filterValue,<TextField variant="standard" value={filterValue||''} type='number' onChange={onChange(changeFilterValue)} inputProps={{'data-testid':`filterValue_${i}`}}/>)
        case FilterProperty.lastViewed:
            return fc(false,<DateSelect value={filterValue} onChange={changeFilterValue as OnDateChange} i={i}/>)
        case FilterProperty.type:
            return fc(!filterValue,<VisualizationTypeFilterSelect visualizationType={filterValue as VisualizationType} changeVisualizationType={onChange(changeFilterValue)} i={i}/>)
    }
    return null;
}