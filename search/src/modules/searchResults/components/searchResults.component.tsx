import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Visualization, VisualizationType} from "../../searchPage/types/visualization.type";
import "../style/searchResults.css"
import {Checkbox, TableFooter} from "@mui/material";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {StyledTableCell, StyledTableRow} from './styledTable.component';
import {SelectVisualization} from "../../searchPage/types/methods.type";
import {Trigger} from "../../shared/types/shared.types";
import {areAllSelected} from "../../searchPage/services/selectVisualizations.service";
import {SearchResultRow} from "./searchResultRow.component";


export function SearchResults({visualizations,sqlViewVersion,selectVisualization,selectAll}:{
    visualizations:Visualization[],
    sqlViewVersion:SqlViewVersion,
    selectVisualization:SelectVisualization,
    selectAll:Trigger
}) {
    let withUsers:boolean = sqlViewVersion===SqlViewVersion.withUsers;
    return (
        <TableContainer component={Paper} className={`searchResultsRoot appear`}>
            <Table sx={{}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className={'nowrap zeroPadding'}><Checkbox className={'selectAllCheckbox'} size={'small'} onClick={()=>selectAll()} checked={areAllSelected(visualizations)} inputProps={{'data-testid':'checkbox_selectAll'}as any}/></StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Views</StyledTableCell>
                        <StyledTableCell className={'nowrap'}>Last Viewed</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        {withUsers&&<StyledTableCell>Owner</StyledTableCell>}
                        <StyledTableCell className={'nowrap actionsThead'}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visualizations.map((visualization:Visualization,i:number) => {
                        let {selected, id} = visualization;
                        return <StyledTableRow key={id}>
                            <StyledTableCell className={'nowrap zeroPadding'}>
                                <Checkbox checked={selected}
                                    size={'small'}
                                    onClick={() => selectVisualization(id)}
                                    disabled={visualization.type===VisualizationType.dashboard}
                                    inputProps={{'data-testid': `checkbox_${i}`} as any}/>
                            </StyledTableCell>
                            <SearchResultRow visualization={visualization} withUsers={withUsers}/>
                        </StyledTableRow>
                    })}
                </TableBody>
                <TableFooter><TableRow><TableCell></TableCell><TableCell>Displaying visualizations 1 - {visualizations.length}</TableCell></TableRow></TableFooter>
            </Table>
        </TableContainer>
    );
}
