import React from "react";
import {StyledTableCell, StyledTableRow} from "./styledTable.component";
import {Checkbox, Link} from "@mui/material";
import {getViewUrl} from "../../../config/config";
import {ResultActions} from "./resultActions.component";
import {Visualization, VisualizationType} from "../../searchPage/types/visualization.type";
import {ApplySharingToAll} from "../../sharing/types/sharing.types";
import {SharingDialog} from "../../sharing/components/sharingDialog.component";
import {SelectVisualization} from "../../searchPage/types/methods.type";
import {VisualizationDataRow} from "./visualizationDataRow.component";

function SearchResultRowComponent({visualization,selectVisualization,selected, withUsers,applySharingToAll,areMultipleSelected,i}:{
    visualization:Visualization,
    selectVisualization:SelectVisualization,
    selected:boolean,
    withUsers:boolean,
    applySharingToAll:ApplySharingToAll,
    areMultipleSelected:boolean,
    i:number
}) {
    let {id,type} = visualization;
    return <StyledTableRow>
        <StyledTableCell className={'nowrap zeroPadding'}>
            <Checkbox checked={selected}
                      size={'small'}
                      onClick={() => selectVisualization(id)}
                      disabled={visualization.type===VisualizationType.dashboard}
                      inputProps={{'data-testid': `checkbox_${i}`} as any}/>
        </StyledTableCell>
        <VisualizationDataRow visualization={visualization} withUsers={withUsers}/>
        <StyledTableCell className={'nowrap zeroPadding'}>
            <ResultActions visualizationId={id} type={type} applySharingToAll={applySharingToAll} areMultipleSelected={areMultipleSelected}/>
            {type!==VisualizationType.dashboard&&<SharingDialog id={id} type={type} applySharingToAll={applySharingToAll} areMultipleSelected={areMultipleSelected}/>}
        </StyledTableCell>
    </StyledTableRow>
}

export const SearchResultRow = React.memo(SearchResultRowComponent,(prev, next)=>{
    return prev.areMultipleSelected===next.areMultipleSelected
        &&prev.selected===next.selected;
});