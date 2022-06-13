import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";

export function SearchSettingsDialog({open, close, searchSettings, updateSettings}:{open: boolean, close:()=>void, searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    return <Dialog onClose={close} open={open}>
        <DialogTitle>Search settings</DialogTitle>
    </Dialog>
}