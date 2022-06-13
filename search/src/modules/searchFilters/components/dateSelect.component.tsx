import React from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

export function DateSelect({value,onChange}:{value:string|null,onChange:any}) {
    return <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} variant='standard'/>}
    /></LocalizationProvider>;
}