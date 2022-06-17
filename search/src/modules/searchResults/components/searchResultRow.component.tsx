import React from "react";
import {StyledTableCell} from "./styledTable.component";
import {Link} from "@mui/material";
import {getViewUrl} from "../../../config/config";
import {ResultActions} from "./resultActions.component";
import {Visualization} from "../../searchPage/types/visualization.type";

export function SearchResultRow({visualization,withUsers}:{visualization:Visualization,withUsers:boolean}) {
    let {id, name,views,lastViewed,type,owner} = visualization;
    return <>
        <StyledTableCell component="th" scope="row">
            <Link href={getViewUrl(id)} target={'_blank'} color={'inherit'} className={`searchResultViewLink`}>{name}</Link>
        </StyledTableCell>
        <StyledTableCell className={'viewsCell'}>{views}</StyledTableCell>
        <StyledTableCell className={'nowrap'}>{lastViewed}</StyledTableCell>
        <StyledTableCell>{type}</StyledTableCell>
        {withUsers&&<StyledTableCell>{owner}</StyledTableCell>}
        <StyledTableCell className={'nowrap zeroPadding'}>
            <ResultActions visualizationId={id} type={type}/>
        </StyledTableCell>
    </>
}