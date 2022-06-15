import {BarChart, Code, Share } from "@mui/icons-material";
import { IconButton, Link, Tooltip } from "@mui/material";
import React, {useState} from "react";
// @ts-ignore
// import SharingDialog from "@dhis2/d2-ui-sharing-dialog";

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
    let [sharingOpen,setSharingOpen] = useState<boolean>(false)
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
        <div className={`actionButton`}>
            <Tooltip title={'Update sharing (this item)'}>
                <IconButton onClick={()=>setSharingOpen(true)}>
                    <Share/>
                </IconButton>
            </Tooltip>
        </div>
        {/*{sharingOpen&&<SharingDialog/>}*/}
    </>;
}