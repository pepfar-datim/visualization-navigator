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
import {Link, TableFooter} from "@mui/material";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import { getViewUrl } from '../../../config/config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(44, 102, 147)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visualizations.map(({id, name,views,lastViewed,type,owner}:Visualization) => (
                        <StyledTableRow key={name}>
                            <StyledTableCell component="th" scope="row">
                                <Link href={getViewUrl(id)} target={'_blank'} color={'inherit'}>{name}</Link>
                            </StyledTableCell>
                            <StyledTableCell>{views}</StyledTableCell>
                            <StyledTableCell sx={{whiteSpace:'nowrap'}}>{lastViewed}</StyledTableCell>
                            <StyledTableCell>{type}</StyledTableCell>
                            {withUsers&&<StyledTableCell>{owner}</StyledTableCell>}
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter><TableRow><TableCell>Displaying visualizations 1 - {visualizations.length}</TableCell></TableRow></TableFooter>
            </Table>
        </TableContainer>
    );
}
