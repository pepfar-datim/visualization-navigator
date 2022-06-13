import React from "react";
import {FormControl as FC} from "@mui/material";

export function FormControl({children, width,className}:{children:any, width?:number,className?:string}) {
    return <FC variant="standard" sx={{ m: 1, width:width||150}} className={className}>{children}</FC>;
}