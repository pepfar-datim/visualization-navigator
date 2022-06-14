import React from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {OnDateChange} from "../types/methods.type";

export function DateSelect({value,onChange,i}:{value:string|null,onChange:OnDateChange,i:number}) {
    return <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={(d)=>onChange(d)}
        renderInput={(params) =><TextField {...params} variant='standard' inputProps={Object.assign({'data-testid':`filterValue_${i}`},params?.inputProps)}/>}
    /></LocalizationProvider>;
}