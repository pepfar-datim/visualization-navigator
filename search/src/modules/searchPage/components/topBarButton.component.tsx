import React, {useState} from "react";
import {FormControl, IconButton, Tooltip} from "@mui/material";

export function TopBarButton({tooltip, testid,Content, icon}:{tooltip:string,testid:string,Content:React.ComponentType<any>,icon:any}) {
    let [open,setOpen] = useState(false);
    return <div className='searchTopBarButton'>
        <FormControl>
            <Tooltip title={tooltip}>
                <IconButton component="span" onClick={()=>setOpen(true)} data-testid={testid}>
                    {icon}
                </IconButton>
            </Tooltip>
        </FormControl>
        {open && <Content close={()=>setOpen(false)} open={open}/>}
    </div>
}