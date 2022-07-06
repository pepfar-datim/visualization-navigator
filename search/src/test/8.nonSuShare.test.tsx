import {addFilter, renderSearch, search, setFilter} from "./lib/shared.testLib";
import {camelCaseToWords} from "../modules/searchPage/services/textFormat.service";
import {FilterProperty} from "../modules/searchFilters/types/searchFilters.type";
import datimApi from "@pepfar-react-lib/datim-api";
import {click, textsWait} from "@pepfar-react-lib/testwrap";
import React from "react";
import {ShareSettings} from "../modules/sharing/types/sharing.types";
import {clickByText, texts} from "@pepfar-react-lib/testwrap/jsbuild";
jest.mock('@dhis2/app-runtime-adapter-d2',()=>({
    D2Shim: ({children}:{children:any})=> {
        return children({d2:true});
    }
}));
jest.mock("@dhis2/d2-ui-sharing-dialog",()=>({onRequestClose}:{onRequestClose:any})=><div>Sharing settings<div onClick={()=>onRequestClose(testShareSettings)}>Close</div></div>);
const testShareSettings:ShareSettings = {
    publicAccess: '--------',
    userGroupAccesses: [],
    userAccesses:[],
    externalAccess:false
}

let searchUrl:string = `/sqlViews/VisNavgSrch/data?paging=false&var=uid:_,favoriteName:_,user:_,visualizationType:_,minViewCount:-1,maxViewCount:9223372036854776000,lastViewedMinDate:1969-01-01,lastViewedMaxDate:2100-01-01,limitViewsMinDate:1969-01-01,limitViewsMaxDate:2100-01-01,limit:100,includeNeverViewed:1`
let searchResponse = {
    "listGrid": {
        "rows": [
            [
                "testVisu1",
                "test visualization 1",
                1,
                "2022-01-01",
                "chart",
                "",
                "enhanced"
            ],
            [
                "testVisu2",
                "test visualization 1",
                1,
                "2022-01-01",
                "chart",
                "",
                "enhanced"
            ]
        ]
    }
}

test(`8 > Non SuperUser share`, async ()=>{
    renderSearch();
    datimApi.registerGetMock(searchUrl,searchResponse)
    search();
    await textsWait(['test']);
    click(`checkbox_selectAll`)
    click('updateSharingButton_testVisu1');
    await textsWait([`Sharing settings`])
    clickByText('Close');
    texts(['Apply updated sharing to all selected items?'])
    let p1 = datimApi.registerSendMock('/sharing?type=visualization&id=testVisu1',{});
    let p2 = datimApi.registerSendMock('/sharing?type=visualization&id=testVisu2',{},false);
    clickByText('Confirm');
    await p1;
    await p2;
    await textsWait([`Succeeded with 1 items, but failed with 1 items`])
})
