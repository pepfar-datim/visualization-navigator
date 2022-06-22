import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {Button, Dialog, DialogActions, DialogContent, Divider, Typography} from "@mui/material";
import {BoolTrigger} from "../types/sharing.types";

export function ShareAllDialog({onClose}:{onClose:BoolTrigger}) {
    return <Dialog onClose={()=>{}} open={true} className={'shareAllDialog'} maxWidth={'md'}>
        <DialogTitle>
            Apply updated sharing to all selected items?
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <Typography>To apply the sharing settings that you updated for 0001_KBC_TX_CURR_ARTDISP_3 TO 5 months to all selected items, click confirm below.</Typography>
            <br/>
            <Typography>If you do not wish to apply these updated sharing settings to other selected items, click cancel.</Typography>
        </DialogContent>
        <Divider/>
        <DialogActions>
            <Button autoFocus onClick={()=>onClose(false)}>
                Cancel
            </Button>
            <Button onClick={()=>onClose(true)}>Ok</Button>
        </DialogActions>
    </Dialog>
}