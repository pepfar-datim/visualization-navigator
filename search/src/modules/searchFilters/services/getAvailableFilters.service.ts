import {allFilterProperties, FilterProperty, SearchFilter} from "../types/searchFilters.type";
import {SqlViewVersion} from "../../searchPage/types/appState.type";

function filterOccurences(searchFilters:SearchFilter[], property:FilterProperty):number{
    return searchFilters.filter(filter=>filter.filterProperty===property).length;
}

export function getAvailableFilters(searchFilters:SearchFilter[],sqlViewVersion:SqlViewVersion):FilterProperty[]{
    return allFilterProperties.filter((filter:FilterProperty)=>{
        if (filter===FilterProperty.owner&&sqlViewVersion===SqlViewVersion.withoutUsers) return false;
        switch (filter){
            case FilterProperty.name:
            case FilterProperty.type:
            case FilterProperty.owner:
               return filterOccurences(searchFilters,filter)===0;
            case FilterProperty.views:
            case FilterProperty.lastViewed:
                return filterOccurences(searchFilters,filter)<=1;
        }
    })
}