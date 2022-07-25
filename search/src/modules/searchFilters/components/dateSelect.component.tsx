import React from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {IconButton, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {OnDateChange} from "../types/methods.type";
import CloseIcon from "@mui/icons-material/Close";
import {FormControl} from "./formControl.component";

export const dateSelectHack:{[i:number|string]:OnDateChange} = {};

export function DateSelect({value,onChange,disabled,i}:{value:string|null,onChange:OnDateChange,disabled?:boolean,i:number|string}) {
    dateSelectHack[i] = onChange;
    return <div className='dateSelectRoot'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl>
            <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={(d)=>onChange(d)}
                disabled={disabled}
                renderInput={(params) =><TextField {...params} variant='standard' inputProps={Object.assign({'data-testid':`filterValue_${i}`},params?.inputProps)}/>}
            />
            </FormControl>
        </LocalizationProvider>
        <IconButton onClick={()=>onChange(null)} color="inherit" disabled={disabled}>
            <CloseIcon />
        </IconButton>
    </div>
}