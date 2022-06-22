import {BarChart, Code, Dashboard, GridOn, InfoOutlined, LocationOn, Public, Share} from "@mui/icons-material";
import { IconButton, Link, Tooltip } from "@mui/material";
import React, {useState} from "react";
import {VisualizationType} from "../../searchPage/types/visualization.type";
import {SharingDialog} from "../../sharing/components/sharingDialog.component";
import {getViewUrl} from "../../../config/config";
import {ApplySharingToAll} from "../../sharing/types/sharing.types";

function ActionLink({link,icon,tooltip}:{link:string,icon:any,tooltip:string}){
    return <div className={`actionButton`}>
        <Tooltip title={tooltip}>
            <IconButton href={link} target={'_blank'} size={'small'}>
                {icon}
            </IconButton>
        </Tooltip>
    </div>
}

function getCustomAppLink(visualizationId:string,type:VisualizationType){
    switch (type){
        case VisualizationType.pivot:
            return <ActionLink
                tooltip={`Open in visualizer`}
                link={`../../../dhis-web-data-visualizer/index.html#/${visualizationId}`}
                icon={<GridOn/>}
            />
        case VisualizationType.chart:
            return <ActionLink
                tooltip={`Open in visualizer`}
                link={`../../../dhis-web-data-visualizer/index.html#/${visualizationId}`}
                icon={<BarChart/>}
            />
        case VisualizationType.map:
            return <ActionLink
                tooltip={`Open in maps`}
                link={`../../../dhis-web-maps/index.html?id=${visualizationId}`}
                icon={<Public/>}
            />
        case VisualizationType.dashboard:
            return <ActionLink
                tooltip={`Open in maps`}
                link={`../../../dhis-web-dashboard/#/${visualizationId}`}
                icon={<Dashboard/>}
            />
    }
}

const dhis2TypeMap = {
    [VisualizationType.map]:'maps',
    [VisualizationType.dashboard]:'dashboards',
    [VisualizationType.chart]:'visualizations',
    [VisualizationType.pivot]:'visualizations',
}

export function ResultActionsComponent({visualizationId,type,applySharingToAll,areMultipleSelected}:{
    visualizationId:string,
    type:VisualizationType,
    applySharingToAll:ApplySharingToAll,
    areMultipleSelected:boolean
}) {
    return <>
        <ActionLink
            tooltip={`Show details`}
            link={getViewUrl(visualizationId)}
            icon={<InfoOutlined/>}
        />
        {getCustomAppLink(visualizationId,type)}
        <ActionLink
            tooltip={`Open in API`}
            link={`/api/${dhis2TypeMap[type]}/${visualizationId}`}
            icon={<Code/>}
        />
    </>;
}

export const ResultActions = React.memo(ResultActionsComponent,(newProps,oldProps)=>true);