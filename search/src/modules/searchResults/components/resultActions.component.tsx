import {BarChart, Code } from "@mui/icons-material";
import { IconButton, Link, Tooltip } from "@mui/material";
import React from "react";

function ActionLink({link,icon,tooltip}:{link:string,icon:any,tooltip:string}){
    return <div className={`actionButton`}>
        <Tooltip title={tooltip}>
            <IconButton href={link} target={'_blank'}>
                {icon}
            </IconButton>
        </Tooltip>
    </div>
}

export function ResultActions({visualizationId}:{visualizationId:string}) {
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
    </>;
}