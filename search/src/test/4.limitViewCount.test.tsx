import {FilterOperator, FilterProperty, SearchFilter} from "../modules/searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../modules/searchFilters/types/filtersToUrl.service";
import {defaultFilters as d} from "../modules/searchFilters/const/defaultFilters.const"
import {render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {addFilter, search, setFilter} from "./lib/shared.testLib";
import React from "react";
import {camelCaseToCapitalized, camelCaseToWords} from "../modules/searchPage/services/textFormat.service";
import {click, debug, pause, select} from "@pepfar-react-lib/testwrap";
import {get, textsWait} from "@pepfar-react-lib/testwrap/jsbuild";
import {dateSelectHack} from "../modules/searchFilters/components/dateSelect.component";
import {SqlViewVersion} from "../modules/searchPage/types/appState.type";



test(`4 > Limit view count by date `,async ()=>{
    render(<SearchPage sqlViewVersion={SqlViewVersion.withUsers}/>);
    click(`searchSettingsButton`);
    click('limitedViewRange');
    dateSelectHack['limitViewsMinDate']('2022-06-01');
    await pause(0.2);
    dateSelectHack['limitViewsMaxDate']('2022-06-02');
    click('closeSettingsDialog')
    await pause(0.2);
    search();
    await textsWait(['PEPFAR FY20 Analytics: Clinical Cascade Achievement','PEPFAR FY20 Analytics: Clinical Cascade Snapshot Achievement','COP20 Analysis'])
})