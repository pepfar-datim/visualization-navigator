// @ts-ignore
import React from "react";
import {renderSearch, search} from "./lib/shared.testLib";
import {click, textsWait} from "@pepfar-react-lib/testwrap";
import {ShareSettings} from "../modules/sharing/types/sharing.types";
import {clickByText, texts} from "@pepfar-react-lib/testwrap/jsbuild";
import datimApi from "@pepfar-react-lib/datim-api";

jest.mock('@dhis2/app-runtime-adapter-d2',()=>({
    D2Shim: ({children})=> {
        return children({d2:true});
    }
}));

const testShareSettings:ShareSettings = {
    publicAccess: '--------',
    userGroupAccesses: [],
    userAccesses:[],
    externalAccess:false
}

jest.mock("@dhis2/d2-ui-sharing-dialog",()=>({onRequestClose})=><div>Sharing settings<div onClick={()=>onRequestClose(testShareSettings)}>Close</div></div>);

test(`7 > Multi-share`, async ()=>{
    renderSearch()
    search();
    await textsWait(['0001_KBC_TX_CURR_ARTDISP_3 TO 5 months'],1e4);
    click(`checkbox_1`)
    click(`checkbox_2`)
    click('updateSharingButton_XFjvfUkYdp1');
    await textsWait([`Sharing settings`])
    clickByText('Close');
    texts(['Apply updated sharing to all selected items?'])
    let p1 = datimApi.registerSendMock('/sharing?type=visualization&id=Dtnms6vh11P',{});
    let p2 = datimApi.registerSendMock('/sharing?type=visualization&id=XFjvfUkYdp1',{});
    clickByText('Confirm');
    let [query1,query2] = await Promise.all([p1,p2]);
    expect(query1).toStrictEqual({object: testShareSettings});
})