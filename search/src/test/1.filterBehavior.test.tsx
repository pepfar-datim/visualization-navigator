import React from "react";
import {render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {checkSelectValue, click, notToExistList, select} from "@pepfar-react-lib/testwrap";
import {addFilter} from "./lib/shared.testLib";

export function setFilter(i:number,property:string,expectedOperator:string){
    select(`filterProperty_${i}`,property);
    checkSelectValue(`filterOperator_${i}`,expectedOperator)
}

test(`1 > Search filter behavior`, async ()=>{
    render(<SearchPage/>);
    addFilter();
    setFilter(0,'Name','contains')
    addFilter();
    setFilter(1,'Views','greaterThan')
    setFilter(1,'Last Viewed','before')
    click(`deleteFilter_1`)
    notToExistList(['deleteFilter_1','filterProperty_1'])
    setFilter(0,'Type','is')
})

