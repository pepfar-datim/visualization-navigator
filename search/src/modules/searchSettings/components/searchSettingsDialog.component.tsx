import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";
import {Button} from "@mui/material";

export function SearchSettingsDialog({open, close, searchSettings, updateSettings}:{open: boolean, close:()=>void, searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    return <Dialog onClose={close} open={open}>
        <DialogTitle>Search settings</DialogTitle>
        <Button onClick={()=>updateSettings({limit:200,limitViewsMinDate: '1978-01-01',limitViewsMaxDate: '2500-01-01'})}>test</Button>
    </Dialog>
}