import React from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {OnDateChange} from "../types/methods.type";

export const dateSelectHack:{[i:number|string]:OnDateChange} = {};

export function DateSelect({value,onChange,disabled,i}:{value:string|null,onChange:OnDateChange,disabled?:boolean,i:number|string}) {
    dateSelectHack[i] = onChange;
    return <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={(d)=>onChange(d)}
        disabled={disabled}
        renderInput={(params) =><TextField {...params} variant='standard' inputProps={Object.assign({'data-testid':`filterValue_${i}`},params?.inputProps)}/>}
    /></LocalizationProvider>;
}