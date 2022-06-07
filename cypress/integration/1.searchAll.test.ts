import {executeSearch, login, sel, seln, texts, textsIn} from "../lib/main.testLib";

describe(`1 > Search all`,()=>{
    it(`Should render`, ()=>{
        login();
        texts(['Add filter','Show all'])
    })
    it(`Should search`, ()=>{
        executeSearch();
        texts([
            `Limited to 100 results. Refine search or update settings to see all matching results.`,
            `Download results`,
            `18237:HTS_INDEX (By Cascade) Naftali`,
            `mpingae-d`,
            `18237: CXCA_TX: Percentage of cervical cancer screen-positive women who are HIV-positive and on ART eligible for cryotherapy, thermocoagulation or LEEP who received cryotherapy, thermocoagulation or LEEP (Semi-Annually)`
        ])
    });
    it(`Should have correct data on line 2`,()=>{
        textsIn(seln(`dhis2-uicore-tablerow`,2),[
            `0001_KBC_TX_CURR_ARTDISP_3 TO 5 months`,
            `2022-03-29`,
            `pivot`,
            `bkouadio`
        ])
    })
})