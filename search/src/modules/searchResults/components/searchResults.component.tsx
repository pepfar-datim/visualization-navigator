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
import {Button, Link, TableFooter} from "@mui/material";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import { getViewUrl } from '../../../config/config';
import {StyledTableCell, StyledTableRow} from './styledTable.component';
import {ResultActions} from "./resultActions.component";





export function SearchResults({visualizations,sqlViewVersion}:{visualizations:Visualization[],sqlViewVersion:SqlViewVersion}) {
    let withUsers:boolean = sqlViewVersion===SqlViewVersion.withUsers;
    return (
        <TableContainer component={Paper} className={`searchResultsRoot appear`}>
            <Table sx={{}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Views</StyledTableCell>
                        <StyledTableCell sx={{whiteSpace:'nowrap'}}>Last Viewed</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        {withUsers&&<StyledTableCell>Owner</StyledTableCell>}
                        <StyledTableCell sx={{whiteSpace:'nowrap'}}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visualizations.map(({id, name,views,lastViewed,type,owner}:Visualization) => (
                        <StyledTableRow key={id}>
                            <StyledTableCell component="th" scope="row">
                                <Link href={getViewUrl(id)} target={'_blank'} color={'inherit'} className={`searchResultViewLink`}>{name}</Link>
                            </StyledTableCell>
                            <StyledTableCell>{views}</StyledTableCell>
                            <StyledTableCell sx={{whiteSpace:'nowrap'}}>{lastViewed}</StyledTableCell>
                            <StyledTableCell>{type}</StyledTableCell>
                            {withUsers&&<StyledTableCell>{owner}</StyledTableCell>}
                            <StyledTableCell sx={{whiteSpace:'nowrap'}}><ResultActions visualizationId={id} type={type}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter><TableRow><TableCell>Displaying visualizations 1 - {visualizations.length}</TableCell></TableRow></TableFooter>
            </Table>
        </TableContainer>
    );
}
