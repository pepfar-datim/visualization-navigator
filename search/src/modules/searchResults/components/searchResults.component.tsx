import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Visualization} from "../../searchPage/types/visualization.type";
import "../style/searchResults.css"
import {Checkbox, TableFooter} from "@mui/material";
import {StyledTableCell} from './styledTable.component';
import {PostMessage, SelectVisualization} from "../../searchPage/types/methods.type";
import {Trigger} from "../../shared/types/shared.types";
import {areAllSelected, getSelectedVisualizations} from "../../searchPage/services/selectVisualizations.service";
import {SearchResultRow} from "./searchResultRow.component";
import {ApplySharingToAll} from "../../sharing/types/sharing.types";
import {InitState} from "../../main/types/initState.type";
import {NotFound} from "../../searchPage/components/notFound.component";


export function SearchResults({visualizations,selectVisualization,selectAll,applySharingToAll,initState,postMessage}:{
    visualizations:Visualization[],
    selectVisualization:SelectVisualization,
    selectAll:Trigger,
    applySharingToAll:ApplySharingToAll,
    initState:InitState,
    postMessage:PostMessage
}) {
    let {includeUsers,user} = initState;
    let areMultipleSelected:boolean=getSelectedVisualizations(visualizations).length>0;
    if (visualizations.length===0) return <NotFound/>
    return (
        <TableContainer component={Paper} className={`searchResultsRoot appear`}>
            <Table sx={{}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className={'nowrap zeroPadding'}><Checkbox className={'selectAllCheckbox'} size={'small'} onClick={()=>selectAll()} checked={areAllSelected(visualizations)} inputProps={{'data-testid':'checkbox_selectAll'}as any}/></StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell className={'alignRight'}>Views</StyledTableCell>
                        <StyledTableCell className={'nowrap alignCenter'}>Last Viewed</StyledTableCell>
                        <StyledTableCell className={'alignCenter zeroLeftPadding'}>Type</StyledTableCell>
                        {includeUsers&&<StyledTableCell>Owner</StyledTableCell>}
                        <StyledTableCell className={'nowrap actionsThead'}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visualizations.map((visualization:Visualization,i:number)=><SearchResultRow
                        visualization={visualization}
                        selectVisualization={selectVisualization}
                        selected={visualization.selected}
                        applySharingToAll={applySharingToAll}
                        areMultipleSelected={areMultipleSelected}
                        key={i}
                        i={i}
                        initState={initState}
                        postMessage={postMessage}
                    />)}
                </TableBody>
                <TableFooter><TableRow><TableCell></TableCell><TableCell>Displaying visualizations 1 - {visualizations.length}</TableCell></TableRow></TableFooter>
            </Table>
        </TableContainer>
    );
}
