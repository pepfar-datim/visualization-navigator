import {addTextFilter, executeSearch, getFilter, login, sel, seln, texts, textsIn} from "../lib/main.testLib";

describe(`1 > Search filters`,()=>{
    it(`Should render`, ()=>{
        login();
        texts(['Search visualization items','Add filter','Execute search'])
    })
    it(`Should have filters`, ()=>{
        cy.get(sel('addFilter')).click();
        getFilter(1).contains('Filter')

    });
    it(`Filter should have options`, ()=>{
        getFilter(1).find(`[data-test="dhis2-uicore-select"]`).click();
        textsIn(sel('dhis2-uicore-layer'),[
            `name`,
            'view count',
            'last viewed',
            'type',
            'owner'
        ])
    })
    it(`Should be able to filter by name & owner`,()=>{
        cy.get(`[data-value="name"]`).click();
        getFilter(1).find('input').type('MER');
        addTextFilter(2,'user','er')
        executeSearch();
    })
    it(`Results should be filtered`, ()=>{
        cy.get(`[data-test="dhis2-uicore-tablecell"]:nth-child(2)`).each(name=>{
            cy.wrap(name).contains('MER',{matchCase:false})
        })
        cy.get(`[data-test="dhis2-uicore-tablecell"]:nth-child(6)`).each(owner=>{
            cy.wrap(owner).contains('er',{matchCase:false})
        })
    })
})