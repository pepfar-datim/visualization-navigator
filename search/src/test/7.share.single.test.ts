import {renderSearch, search} from "./lib/shared.testLib";
import {click, textsWait} from "@pepfar-react-lib/testwrap";


test(`7 > Sharing > single`, async ()=>{
    renderSearch()
    search();
    await textsWait(['0001_KBC_TX_CURR_ARTDISP_3 TO 5 months'],1e4);
    click('updateSharingButton_XFjvfUkYdp1');
    await textsWait([`Sharing settings`])
})