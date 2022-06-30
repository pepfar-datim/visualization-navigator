import {hackDateSelect, renderSearch, search} from "./lib/shared.testLib";
import {click, pause} from "@pepfar-react-lib/testwrap";
import {textsWait} from "@pepfar-react-lib/testwrap/jsbuild";


test(`4 > Limit view count by date `,async ()=>{
    renderSearch()
    click(`searchSettingsButton`);
    click('limitedViewRange');
    hackDateSelect('limitViewsMinDate','2022-06-01');
    await pause(0.2);
    hackDateSelect('limitViewsMaxDate','2022-06-02');
    click('closeSettingsDialog')
    await pause(0.2);
    search();
    await textsWait(['PEPFAR FY20 Analytics: Clinical Cascade Achievement','PEPFAR FY20 Analytics: Clinical Cascade Snapshot Achievement','COP20 Analysis'])
})