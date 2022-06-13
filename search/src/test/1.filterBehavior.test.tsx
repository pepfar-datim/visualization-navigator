import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {checkSelectValue, click, notToExistList, select} from "@pepfar-react-lib/testwrap";
import {addFilter} from "./lib/shared.testLib";

export function setFilter(i:number,property:string,expectedOperator:string){
    select(`filterProperty_${i}`,property);
    checkSelectValue(`filterOperator_${i}`,expectedOperator)
}

function checkPropertyAvailable(selectId:string,property:string, available:boolean) {
    fireEvent.mouseDown(screen.getByTestId(selectId).childNodes[0]);
    let modal = screen.getByRole('presentation');
    if (available) within(modal).getByText(property)
    else expect(within(modal).queryByText(property)).not.toBeInTheDocument();
}

test(`1 > Search filter behavior`, async ()=>{
    render(<SearchPage/>);
    addFilter();
    setFilter(0,'Name','contains')
    addFilter();
    checkPropertyAvailable(`filterProperty_1`,'Name', false)
    setFilter(1,'Views','greater than')
    addFilter();
    checkPropertyAvailable(`filterProperty_2`,'Views', true);
    setFilter(2,'Views','greater than')
    addFilter();
    checkPropertyAvailable(`filterProperty_3`,'Views', false);

    click(`deleteFilter_3`)
    notToExistList(['deleteFilter_3','filterProperty_3'])

})

