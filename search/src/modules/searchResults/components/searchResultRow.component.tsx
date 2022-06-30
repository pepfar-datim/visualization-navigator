import React from "react";
import {StyledTableCell, StyledTableRow} from "./styledTable.component";
import {Checkbox} from "@mui/material";
import {ResultActions} from "./resultActions.component";
import {Visualization} from "../../searchPage/types/visualization.type";
import {ApplySharingToAll} from "../../sharing/types/sharing.types";
import {SharingDialog} from "../../sharing/components/sharingDialog.component";
import {SelectVisualization} from "../../searchPage/types/methods.type";
import {VisualizationDataRow} from "./visualizationDataRow.component";
import {InitState} from "../../main/types/initState.type";

function SearchResultRowComponent({visualization,selectVisualization,selected, applySharingToAll,areMultipleSelected,i,initState}:{
    visualization:Visualization,
    selectVisualization:SelectVisualization,
    selected:boolean,
    applySharingToAll:ApplySharingToAll,
    areMultipleSelected:boolean,
    i:number,
    initState:InitState
}) {
    let {id,type} = visualization;
    let {user,includeUsers} = initState;
    return <StyledTableRow>
        {user.superUser&&<StyledTableCell className={'nowrap zeroPadding'}>
            <Checkbox checked={selected}
                      size={'small'}
                      onClick={() => selectVisualization(id)}
                      inputProps={{'data-testid': `checkbox_${i}`} as any}/>
        </StyledTableCell>}
        <VisualizationDataRow visualization={visualization} withUsers={includeUsers}/>
        <StyledTableCell className={'nowrap zeroPadding'}>
            <ResultActions visualizationId={id} type={type}/>
            {user.superUser&&<SharingDialog id={id} type={type} applySharingToAll={applySharingToAll} areMultipleSelected={areMultipleSelected}/>}
        </StyledTableCell>
    </StyledTableRow>
}

export const SearchResultRow = React.memo(SearchResultRowComponent,(prev, next)=>{
    return prev.areMultipleSelected===next.areMultipleSelected
        &&prev.selected===next.selected
        &&prev.initState.fetched===next.initState.fetched
});