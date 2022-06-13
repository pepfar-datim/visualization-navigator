import {InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {ChangeFilterType} from "../types/methods.type";
import {FilterProperty} from "../types/searchFilters.type";
import {FormControl} from "./formControl.component";
import {camelCaseToCapitalized, capitalize} from "../../searchPage/services/textFormat.service";

export function FilterPropertySelect({filterProperty, changeFilterType,availableFilters, i}:{filterProperty:FilterProperty|null, changeFilterType: ChangeFilterType, availableFilters:FilterProperty[], i:number}) {
    return <FormControl className='filterPropertySelect'>
        <Select
            value={filterProperty}
            onChange={(e)=>changeFilterType(e.target.value as FilterProperty)}
            data-testid={`filterProperty_${i}`}
            renderValue={(v:any)=><>{camelCaseToCapitalized(v)}</>}
        >
            {availableFilters.map(f=><MenuItem value={f} key={f}>{camelCaseToCapitalized(f)}</MenuItem>)}
        </Select>
    </FormControl>;
}