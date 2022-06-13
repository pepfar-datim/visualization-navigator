import {InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {ChangeFilterType} from "../types/methods.type";
import {allFilters, FilterProperty} from "../types/searchFilters.type";
import {FormControl} from "./formControl.component";
import {camelCaseToHuman} from "../../searchPage/services/textFormat.service";

export function FilterPropertySelect({filterProperty, changeFilterType,i}:{filterProperty:FilterProperty|null, changeFilterType: ChangeFilterType,i:number}) {
    return <FormControl className='filterPropertySelect'>
        <Select
            value={filterProperty}
            onChange={(e)=>changeFilterType(e.target.value as FilterProperty)}
            data-testid={`filterProperty_${i}`}
        >
            {allFilters.map(f=><MenuItem value={f} key={f}>{camelCaseToHuman(f)}</MenuItem>)}
        </Select>
    </FormControl>;
}