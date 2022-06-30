import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {InitWrapper} from "../modules/main/components/initWrapper.component";
// @ts-ignore
import React from "react";
import {act, render} from "@testing-library/react";
import datimApi from "@pepfar-react-lib/datim-api";
import {SqlViewVersion} from "../modules/searchPage/types/appState.type";
import {search} from "./lib/shared.testLib";
import {noTextWait, pause, textsWait, textWait} from "@pepfar-react-lib/testwrap";

const checkSqlQuery = `/sqlViews/VisNavgSrch/data?paging=false&var=uid:_,favoriteName:_,user:_,visualizationType:_,minViewCount:-1,maxViewCount:9223372036854776000,lastViewedMinDate:1969-01-01,lastViewedMaxDate:2100-01-01,limitViewsMinDate:1969-01-01,limitViewsMaxDate:2100-01-01,limit:1,includeNeverViewed:1`;

export const sqlDetectResponse = (sqlType:SqlViewVersion) => ({
    "listGrid": {
        "rows": [
            [
                "n0CaxnRk0Pn",
                "-",
                22,
                "2022-04-15",
                "pivot",
                25934327,
                sqlType
            ]
        ]
    }
});

const userProof = ['Owner','Sschmidt','bkouadio'];

const generateTest = async (sqlType:SqlViewVersion)=> {
    datimApi.registerGetMock(checkSqlQuery,sqlDetectResponse(sqlType))
    render(<InitWrapper SearchPage={SearchPage}/>)
    await act(async ()=> {
        await pause(1000);
        search();
    })
    if (sqlType===SqlViewVersion.withUsers) await textsWait(userProof,12*1000)
    else {
        await textWait('0001_KBC_TX_CURR_ARTDISP_3 TO 5 months');
        await noTextWait('Owner')
    }
    act(()=>document.querySelector('body *').remove())
};

test(`5 > Sql version`,async ()=>{
    await generateTest(SqlViewVersion.withUsers);
    await generateTest(SqlViewVersion.withoutUsers);
});



