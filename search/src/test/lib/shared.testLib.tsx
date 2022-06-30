import {click, select, type} from "@pepfar-react-lib/testwrap";
import {camelCaseToCapitalized} from "../../modules/searchPage/services/textFormat.service";
import {FilterProperty} from "../../modules/searchFilters/types/searchFilters.type";
import {dateSelectHack} from "../../modules/searchFilters/components/dateSelect.component";
import {act, render} from "@testing-library/react";
import React from "react";
import {SearchPage} from "../../modules/searchPage/components/searchPage.component";

export function setFilter(i:number,property:FilterProperty,operator:string,value:string){
    select(`filterProperty_${i}`,camelCaseToCapitalized(property));
    select(`filterOperator_${i}`,operator);
    switch(property){
        case FilterProperty.name:
        case FilterProperty.owner:
        case FilterProperty.views:
            type(`filterValue_${i}`,value)
            break;
        case FilterProperty.type:
            select(`visualizationTypeSelect_${i}`,value);
            break;
        case FilterProperty.lastViewed:
            hackDateSelect(i.toString(),value)
            break;
    }
}

export function addFilter(){
    click('addFilter');
}

export function search(){
    click('searchButton')
}

export function hackDateSelect(type:string,value:string){
    act(()=>dateSelectHack[type](value))
}

export function renderSearch(){
    render(<SearchPage initState={{user:{superUser:true,username:''},includeUsers:true}}/>)
}