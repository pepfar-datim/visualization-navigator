import {IconButton} from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {FormControl} from "./formControl.component";
import {Trigger} from "../../shared/types/shared.types";

export function DeleteFilter({deleteFilter,i}:{deleteFilter:Trigger,i:number}) {
    return <FormControl width={42}>
        <IconButton onClick={deleteFilter} color="inherit" data-testid={`deleteFilter_${i}`}>
            <CloseIcon />
        </IconButton>
    </FormControl>;
}