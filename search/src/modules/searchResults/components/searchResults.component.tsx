import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Visualization} from "../../searchPage/types/visualization.type";
import "../style/searchResults.css"
import {Button, Checkbox, Link, TableFooter} from "@mui/material";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import { getViewUrl } from '../../../config/config';
import {StyledTableCell, StyledTableRow} from './styledTable.component';
import {ResultActions} from "./resultActions.component";
import {SelectVisualization} from "../../searchPage/types/methods.type";
import {Trigger} from "../../shared/types/shared.types";
import {areAllSelected} from "../../searchPage/services/selectVisualizations.service";





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
                        <StyledTableCell className={'nowrap'}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visualizations.map(({id, name,views,lastViewed,type,owner,selected}:Visualization,i:number) => (
                        <StyledTableRow key={id}>
                            <StyledTableCell className={'nowrap zeroPadding'}><Checkbox checked={selected} size={'small'} onClick={()=>selectVisualization(id)} inputProps={{'data-testid':`checkbox_${i}`} as any}/></StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Link href={getViewUrl(id)} target={'_blank'} color={'inherit'} className={`searchResultViewLink`}>{name}</Link>
                            </StyledTableCell>
                            <StyledTableCell className={'viewsCell'}>{views}</StyledTableCell>
                            <StyledTableCell className={'nowrap'}>{lastViewed}</StyledTableCell>
                            <StyledTableCell>{type}</StyledTableCell>
                            {withUsers&&<StyledTableCell>{owner}</StyledTableCell>}
                            <StyledTableCell className={'nowrap zeroPadding'}><ResultActions visualizationId={id} type={type}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter><TableRow><TableCell></TableCell><TableCell>Displaying visualizations 1 - {visualizations.length}</TableCell></TableRow></TableFooter>
            </Table>
        </TableContainer>
    );
}
