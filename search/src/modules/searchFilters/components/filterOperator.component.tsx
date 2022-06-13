import React from "react";
import {MenuItem, Select} from "@mui/material";
import {FilterOperator as FilterOperatorType, FilterProperty, getFilterOperators} from "../types/searchFilters.type";
import {FormControl} from "./formControl.component";
import {ChangeFilterOperator} from "../types/methods.type";
import {camelCaseToWords} from "../../searchPage/services/textFormat.service";

export function FilterOperator({operator,filterProperty,changeOperator,i}:{operator:FilterOperatorType|null,filterProperty:FilterProperty|null,changeOperator:ChangeFilterOperator,i:number}) {
    return <FormControl>
        <Select
            value={operator}
            onChange={(e)=>changeOperator(e.target.value as FilterOperatorType)}
            data-testid={`filterOperator_${i}`}
        >
            {getFilterOperators(filterProperty).map(f=><MenuItem value={f}>{camelCaseToWords(f)}</MenuItem>)}
        </Select>
    </FormControl>;
}