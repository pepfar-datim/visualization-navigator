import React, {useState} from "react";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {Button, CircularProgress, FormControl} from "@mui/material";
import {Download} from "@mui/icons-material";
import {filtersToUrl} from "../../searchFilters/types/filtersToUrl.service";
import {settingsToUrl} from "../../searchSettings/services/settingsToUrl.service";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {getSearchParams} from "../services/getSearchParams.service";

var fileDownload = require('js-file-download');

async function download(searchFilters:SearchFilter[],searchSettings:SearchSettings,setDownloading:(value:boolean)=>void) {
    setDownloading(true);
    let data:Blob = await datimApi.getBlob(`/sqlViews/VisNavgSrch/data.xls?${getSearchParams(searchFilters,searchSettings)}`);
    fileDownload(data, 'searchResults.xls');
    setDownloading(false);
}

export function DownloadResults({searchFilters,searchSettings}:{searchFilters:SearchFilter[],searchSettings:SearchSettings}) {
    let [downloading,setDownloading] = useState<boolean>(false)
    return <div className='searchTopBarButton'>
        <FormControl>
            <Button
                onClick={()=>download(searchFilters,searchSettings,setDownloading)}
                variant='outlined'
                data-testid={`downloadResultsButton`}
                startIcon={downloading?<CircularProgress size={18}/>:<Download/>}
            >
                Download results
            </Button>
        </FormControl>
    </div>;
}