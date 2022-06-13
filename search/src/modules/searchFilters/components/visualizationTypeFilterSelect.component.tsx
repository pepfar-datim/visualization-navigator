import React from "react";
import {MenuItem, Select} from "@mui/material";
import {VisualizationType, visualizationTypeList} from "../../searchPage/types/visualization.type";
import {ChangeVisualizationType} from "../types/methods.type";
import {camelCaseToCapitalized} from "../../searchPage/services/textFormat.service";

export function VisualizationTypeFilterSelect({visualizationType, changeVisualizationType,i}:{visualizationType:VisualizationType,changeVisualizationType:ChangeVisualizationType,i:number}) {
    return <Select
        value={visualizationType}
        onChange={(e)=>changeVisualizationType(e)}
        data-testid={`visualizationTypeSelect_${i}`}
    >
        {visualizationTypeList.map(f=><MenuItem value={f}>{camelCaseToCapitalized(f)}</MenuItem>)}
    </Select>;
}