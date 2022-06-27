import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {SearchSettings, UpdateSearchSettings} from "../types/searchSettings.type";
import {
    DialogContent,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography
} from "@mui/material";
import {FormControl} from '../../searchFilters/components/formControl.component';
import {DateSelect} from "../../searchFilters/components/dateSelect.component";
import {Close} from "@mui/icons-material";
import "../style/searchSettings.css"

const onSettingsChange = (
    newSettings:{limit?:string|number; limitedViewRange?:boolean; limitViewsMinDate?:string; limitViewsMaxDate?:string;},
    currentSettings: SearchSettings,
    updateSettings: UpdateSearchSettings
)=>{
    let {limit, limitedViewRange, limitViewsMinDate, limitViewsMaxDate} = newSettings;
    updateSettings({
        limit: limit || currentSettings.limit,
        limitedViewRange: limitedViewRange===undefined?currentSettings.limitedViewRange:limitedViewRange,
        limitViewsMinDate:limitViewsMinDate||currentSettings.limitViewsMinDate,
        limitViewsMaxDate:limitViewsMaxDate||currentSettings.limitViewsMaxDate
    })
}

export function SearchSettingsDialog({open, close, searchSettings, updateSettings}:{open: boolean, close:()=>void, searchSettings:SearchSettings,updateSettings:UpdateSearchSettings}) {
    return <Dialog onClose={close} open={open} className={'searchSettingsDialog'} >
        <DialogTitle>
            Search settings
            <IconButton onClick={close} className={'closeSettingsDialog'} data-testid={'closeSettingsDialog'}>
                <Close/>
            </IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography className={'searchSettingsLabel'}>Limit search results to</Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl>
                        <Select variant={'standard'} value={searchSettings.limit} onChange={(e)=>onSettingsChange({limit:e.target.value},searchSettings,updateSettings)}>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                            <MenuItem value={1000}>1000</MenuItem>
                            <MenuItem value={'ALL'}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={'searchSettingsLabel'}>Range of reported views</Typography>
                </Grid>
                <Grid item xs={8}>
                    <RadioGroup value={searchSettings.limitedViewRange} onChange={(e)=>onSettingsChange({limitedViewRange:e.target.value==='true'},searchSettings,updateSettings)}>
                        <FormControlLabel value={false} control={<Radio />} label="Include all views in view count statistic" className={'radio'}/>
                        <FormControlLabel value={true} control={<Radio />} label="Limit view counts to a specified date range" className={'radio'} data-testid={'limitedViewRange'}/>
                    </RadioGroup>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography className={`searchSettingsLabel ${searchSettings.limitedViewRange||'disabled'}`}>Start date</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl>
                                <DateSelect value={searchSettings.limitViewsMinDate} onChange={(d:string|null)=>onSettingsChange({limitViewsMinDate:d as string},searchSettings,updateSettings)} disabled={!searchSettings.limitedViewRange} i={`limitViewsMinDate`}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={`searchSettingsLabel ${searchSettings.limitedViewRange||'disabled'}`}>End date</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl>
                                <DateSelect value={searchSettings.limitViewsMaxDate} onChange={(d:string|null)=>onSettingsChange({limitViewsMaxDate:d as string},searchSettings,updateSettings)} disabled={!searchSettings.limitedViewRange} i={'limitViewsMaxDate'}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
}