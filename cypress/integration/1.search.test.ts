import {login, sel, texts, textsIn} from "../lib/main.testLib";

describe(`1 > Search`,()=>{
    it(`Should render`, ()=>{
        login();
        texts(['Search visualization items','Add filter','Execute search'])
    })
    it(`Should search`, ()=>{
        cy.get(sel('executeSearch')).click();
        textsIn(`.dhis2-uicore-tablecell`,[
            `0001_KBC_TX_CURR_ARTDISP_3 TO 5 months`,
            `2022-03-29`,
            `pivot`,
            `bkouadio`
        ])
    });
})