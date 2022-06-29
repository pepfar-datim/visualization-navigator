import {click, select, type} from "@pepfar-react-lib/testwrap";
import {camelCaseToCapitalized} from "../../modules/searchPage/services/textFormat.service";
import {FilterProperty} from "../../modules/searchFilters/types/searchFilters.type";
import {dateSelectHack} from "../../modules/searchFilters/components/dateSelect.component";
import {act} from "@testing-library/react";

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
            act(()=>dateSelectHack[i](value))
            break;
    }
}

export function addFilter(){
    click('addFilter');
}

export function search(){
    click('searchButton')
}