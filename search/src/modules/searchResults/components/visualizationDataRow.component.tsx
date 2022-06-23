import {Visualization} from "../../searchPage/types/visualization.type";
import {StyledTableCell} from "./styledTable.component";
import {Link} from "@mui/material";
import {getViewUrl} from "../../../config/config";
import React from "react";

function VisualizationDataRowComponent({visualization, withUsers}:{visualization:Visualization,withUsers:boolean}){
    let {id, name,views,lastViewed,type,owner} = visualization;
    return <>
        <StyledTableCell component="th" scope="row">
            <Link href={getViewUrl(id)} target={'_blank'} color={'inherit'} className={`searchResultViewLink`}>{name}</Link>
        </StyledTableCell>
        <StyledTableCell className={'alignRight'}>{views}</StyledTableCell>
        <StyledTableCell className={'nowrap alignRight'}>{lastViewed}</StyledTableCell>
        <StyledTableCell>{type}</StyledTableCell>
        {withUsers&&<StyledTableCell>{owner}</StyledTableCell>}
    </>
}

export const VisualizationDataRow = React.memo(VisualizationDataRowComponent,()=>true)