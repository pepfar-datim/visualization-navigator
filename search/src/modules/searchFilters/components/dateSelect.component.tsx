import React from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

export function DateSelect({value,onChange,i}:{value:string|null,onChange:any,i:number}) {
    return <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} variant='standard' inputProps={{'data-testid':`filterValue_${i}`}}/>}
    /></LocalizationProvider>;
}