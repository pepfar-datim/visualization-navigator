import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {InitWrapper} from "../modules/main/components/initWrapper.component";
// @ts-ignore
import React from "react";
import {act, render} from "@testing-library/react";
import datimApi from "@pepfar-react-lib/datim-api";
import {search} from "./lib/shared.testLib";
import {noTextWait, pause, textsWait, textWait} from "@pepfar-react-lib/testwrap";

const checkSqlQuery = `/sqlViews/VisNavgSrch/data?paging=false&var=uid:_,favoriteName:_,user:_,visualizationType:_,minViewCount:-1,maxViewCount:9223372036854776000,lastViewedMinDate:1969-01-01,lastViewedMaxDate:2100-01-01,limitViewsMinDate:1969-01-01,limitViewsMaxDate:2100-01-01,limit:1,includeNeverViewed:1`;

enum Header {
    username='username',
    userid='userid'
}

export const sqlDetectResponse = (header:Header) => ({
    listGrid: {
        "headers": [
            {"name": "uid"},
            {"name": "name"},
            {"name": "view_count"},
            {"name": "date"},
            {"name": "type"},
            {"name": header}
        ],
        "rows": [
            [
                "n0CaxnRk0Pn",
                "0001_KBC_TX_CURR_ARTDISP_3 TO 5 months",
                1,
                "2022-06-27",
                "pivot",
                "Sschmidt"
            ]
        ]
    }
});

const userProof = ['Owner','Sschmidt'];

const generateTest = async (header:Header)=> {
    datimApi.registerGetMock(checkSqlQuery,sqlDetectResponse(header))
    render(<InitWrapper SearchPage={SearchPage}/>)
    await act(async ()=> {await pause(1000);
        search();
    })
    if (header===Header.username) await textsWait(userProof,12*1000)
    else {
        await textWait('0001_KBC_TX_CURR_ARTDISP_3 TO 5 months');
        await noTextWait('Owner')
    }
    act(()=>document.querySelector('body *')?.remove())
};

test(`5 > Sql version`,async ()=>{
    await generateTest(Header.username);
    await generateTest(Header.userid);
});



