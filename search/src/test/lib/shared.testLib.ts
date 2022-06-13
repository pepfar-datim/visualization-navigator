import {checkSelectValue, click, select} from "@pepfar-react-lib/testwrap";
import {camelCaseToHuman} from "../../modules/searchPage/services/textFormat.service";
import {FilterProperty} from "../../modules/searchFilters/types/searchFilters.type";
import {type} from "@pepfar-react-lib/testwrap";

export function setFilter(i:number,property:FilterProperty,operator:string,value:string){
    select(`filterProperty_${i}`,camelCaseToHuman(property));
    select(`filterOperator_${i}`,operator);
    switch(property){
        case FilterProperty.name:
        case FilterProperty.owner:
            type(`filterValue_${i}`,value)
            break;
        case FilterProperty.views:
            break;
        case FilterProperty.lastViewed:
            break;
        case FilterProperty.type:
            break;
        case FilterProperty.viewsMinDate:
            break;
        case FilterProperty.viewsMaxDate:
            break;

    }
}

export function addFilter(){
    click('addFilter');
}

export function search(){
    click('searchButton')
}