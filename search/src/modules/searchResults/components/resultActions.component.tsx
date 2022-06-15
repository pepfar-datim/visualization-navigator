import {BarChart, Code, Share } from "@mui/icons-material";
import { IconButton, Link, Tooltip } from "@mui/material";
import React, {useState} from "react";
import {VisualizationType} from "../../searchPage/types/visualization.type";
import {SharingDialog} from "./sharingDialog.component";

function ActionLink({link,icon,tooltip}:{link:string,icon:any,tooltip:string}){
    return <div className={`actionButton`}>
        <Tooltip title={tooltip}>
            <IconButton href={link} target={'_blank'}>
                {icon}
            </IconButton>
        </Tooltip>
    </div>
}

export function ResultActions({visualizationId,type}:{visualizationId:string,type:VisualizationType}) {
    return <>
        <ActionLink
            tooltip={`Open in visualizer`}
            link={`../../../dhis-web-data-visualizer/index.html#/${visualizationId}`}
            icon={<BarChart/>}
        />
        <ActionLink
            tooltip={`Open in API`}
            link={`/api/visualizations/${visualizationId}`}
            icon={<Code/>}
        />
        <SharingDialog id={visualizationId} type={type}/>
    </>;
}