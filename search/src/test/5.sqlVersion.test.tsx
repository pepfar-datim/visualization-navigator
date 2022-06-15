import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {SqlDetectWrapper} from "../modules/main/components/sqlDetectWrapper.component";
import React from "react";
import {render} from "@testing-library/react";
import datimApi from "@pepfar-react-lib/datim-api";
import {SqlViewVersion} from "../modules/searchPage/types/appState.type";
import {search} from "./lib/shared.testLib";
import {noTexts, textsWait} from "@pepfar-react-lib/testwrap/jsbuild";
import {pause} from "@pepfar-react-lib/testwrap";

const checkSqlQuery = `/sqlViews/VisNavgSrch/data?var=uid:_,favoriteName:_,user:_,visualizationType:_,includeNeverViewed:1,minViewCount:-1,maxViewCount:9223372036854776000,lastViewedMinDate:1969-01-01,lastViewedMaxDate:2100-01-01,limitViewsMinDate:1969-01-01,limitViewsMaxDate:2100-01-01,limit:1`;

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

const generateTest = (sqlType:SqlViewVersion)=> test(`5 > Sql version > ${sqlType}`,async ()=>{
    datimApi.registerGetMock(checkSqlQuery,sqlDetectResponse(sqlType))
    render(<SqlDetectWrapper SearchPage={SearchPage}/>)
    search();
    if (sqlType===SqlViewVersion.withUsers) await textsWait(userProof)
    else {
        await pause(1);
        noTexts(userProof)
    }
});

[SqlViewVersion.withoutUsers,SqlViewVersion.withUsers].forEach(generateTest);

