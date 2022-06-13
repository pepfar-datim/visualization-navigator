import React from "react";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import {Settings} from "@mui/icons-material";

export function SearchSettings({}:{}) {
    return <div id='searchSettingsButton'>
        <FormControl>
            <Tooltip title='Settings'>
                <IconButton component="span">
                    <Settings />
                </IconButton>
            </Tooltip>
        </FormControl>
    </div>
}