import {act, render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {SqlViewVersion} from "../modules/searchPage/types/appState.type";
import {search} from "./lib/shared.testLib";
import React from "react";
import {click, pause,debug, textsWait} from "@pepfar-react-lib/testwrap";


test(`7 > Sharing > single`, async ()=>{
    // render(<SearchPage sqlViewVersion={SqlViewVersion.withUsers}/>);
    // search();
    // await textsWait(['0001_KBC_TX_CURR_ARTDISP_3 TO 5 months'],1e4);
    // await act(async ()=> {
    //     click('updateSharingButton_XFjvfUkYdp1');
    //     // await pause(1000);
    //     // debug();
    //     await textsWait([`Sharing settings`, `0001_KBC_TX_CURR_ARTDISP_3 TO 5 months`, `KOUADIO BOITINI CHARLES`, `Public access`, `External access`])
    // });
})