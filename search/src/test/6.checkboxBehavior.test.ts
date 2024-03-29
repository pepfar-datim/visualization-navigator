import {renderSearch, search} from "./lib/shared.testLib";
import {click} from "@pepfar-react-lib/testwrap";
import {getCheckboxValue, textsWait} from "@pepfar-react-lib/testwrap/jsbuild";

function checkAllSelected(){
    let rows = document.querySelectorAll(`tbody tr`);
    let sharedValue = true;
    rows.forEach(row=>{
        let c;
        if (!row || row?.textContent?.includes('dashboard')) return;
        else c = row.querySelector("[data-testid^='checkbox_']");
        // @ts-ignore
        sharedValue = sharedValue && c.checked;
    })
    expect(sharedValue).toBeTruthy();
}

test(`6 > Checkbox behavior`, async ()=>{
    renderSearch();
    search();
    await textsWait(['0001_KBC_TX_CURR_ARTDISP_3 TO 5 months'],1e4);
    click(`checkbox_selectAll`)
    checkAllSelected();
    click(`checkbox_0`)
    expect(getCheckboxValue(`checkbox_selectAll`)).toBeFalsy();
    click(`checkbox_selectAll`)
    checkAllSelected();
})