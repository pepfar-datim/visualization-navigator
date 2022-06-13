import React from "react";
import {MenuItem, Select} from "@mui/material";
import {VisualizationType, visualizationTypeList} from "../../searchPage/types/visualization.type";
import {ChangeVisualizationType} from "../types/methods.type";
import {camelCaseToHuman} from "../../searchPage/services/textFormat.service";

export function VisualizationTypeFilterSelect({visualizationType, changeVisualizationType}:{visualizationType:VisualizationType,changeVisualizationType:ChangeVisualizationType}) {
    return <Select
        value={visualizationType}
        onChange={(e)=>changeVisualizationType(e.target.value as VisualizationType)}
        data-testid={`visualizationTypeSelect`}
    >
        {visualizationTypeList.map(f=><MenuItem value={f}>{camelCaseToHuman(f)}</MenuItem>)}
    </Select>;
}