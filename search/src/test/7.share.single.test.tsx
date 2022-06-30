import React from "react";
import {renderSearch, search} from "./lib/shared.testLib";
import {click, textsWait} from "@pepfar-react-lib/testwrap";
import {render} from "@testing-library/react";
import {ThemeWrapper} from "../modules/searchPage/components/themeWrapper.component";
import {InitWrapper} from "../modules/main/components/initWrapper.component";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {DatimWrapper} from "../modules/main/components/datimWrapper.component";
import {D2Shim} from "@dhis2/app-runtime-adapter-d2";
import {default as SD} from "@dhis2/d2-ui-sharing-dialog";

jest.mock('@dhis2/app-runtime-adapter-d2',()=>({
    D2Shim: ({children})=> {
        return children({d2:true});
    }
}));

jest.mock("@dhis2/d2-ui-sharing-dialog",()=>()=><div>Sharing settings</div>);

test(`7 > Sharing > single`, async ()=>{
    render(<DatimWrapper>
        <ThemeWrapper>
            <InitWrapper SearchPage={SearchPage}/>
        </ThemeWrapper>
    </DatimWrapper>)
    // renderSearch()
    search();
    await textsWait(['0001_KBC_TX_CURR_ARTDISP_3 TO 5 months'],1e4);
    click('updateSharingButton_XFjvfUkYdp1');
    await textsWait([`Sharing settings`])
})