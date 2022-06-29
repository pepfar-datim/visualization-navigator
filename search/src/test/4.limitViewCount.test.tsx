import {render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {hackDateSelect, search} from "./lib/shared.testLib";
import React from "react";
import {click, pause} from "@pepfar-react-lib/testwrap";
import {textsWait} from "@pepfar-react-lib/testwrap/jsbuild";
// import {dateSelectHack} from "../modules/searchFilters/components/dateSelect.component";
import {SqlViewVersion} from "../modules/searchPage/types/appState.type";


test(`4 > Limit view count by date `,async ()=>{
    render(<SearchPage sqlViewVersion={SqlViewVersion.withUsers} isSuperUser={true}/>);
    click(`searchSettingsButton`);
    click('limitedViewRange');
    // dateSelectHack['limitViewsMinDate']('2022-06-01');
    hackDateSelect('limitViewsMinDate','2022-06-01');
    await pause(0.2);
    // dateSelectHack['limitViewsMaxDate']('2022-06-02');
    hackDateSelect('limitViewsMaxDate','2022-06-02');
    click('closeSettingsDialog')
    await pause(0.2);
    search();
    await textsWait(['PEPFAR FY20 Analytics: Clinical Cascade Achievement','PEPFAR FY20 Analytics: Clinical Cascade Snapshot Achievement','COP20 Analysis'])
})