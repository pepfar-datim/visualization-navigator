import React, {useState} from "react";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {Button, CircularProgress, FormControl} from "@mui/material";
import {Download} from "@mui/icons-material";
import {filtersToUrl} from "../../searchFilters/types/filtersToUrl.service";
import {settingsToUrl} from "../../searchSettings/services/settingsToUrl.service";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import datimApi from "@pepfar-react-lib/datim-api";

var fileDownload = require('js-file-download');

async function download(downloadUrl:string,setDownloading:(value:boolean)=>void) {
    setDownloading(true);
    let data:Blob = await datimApi.getBlob(downloadUrl);
    fileDownload(data, 'searchResults.xls');
    setDownloading(false);
}

export function DownloadResults({searchFilters,searchSettings}:{searchFilters:SearchFilter[],searchSettings:SearchSettings}) {
    let [downloading,setDownloading] = useState<boolean>(false)
    let downloadUrl:string = `/sqlViews/VisNavgSrch/data.xls?paging=false&var=${filtersToUrl(searchFilters)},${settingsToUrl(searchSettings)}`
    return <div className='searchTopBarButton'>
        <FormControl>
            <Button
                onClick={()=>download(downloadUrl,setDownloading)}
                variant='outlined'
                data-testid={`downloadResultsButton`}
                startIcon={downloading?<CircularProgress size={18}/>:<Download/>}
            >
                Download results
            </Button>
        </FormControl>
    </div>;
}