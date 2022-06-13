import {FilterProperty, SearchFilter, allFilterProperties} from "../types/searchFilters.type";

function filterOccurences(searchFilters:SearchFilter[], property:FilterProperty):number{
    return searchFilters.filter(filter=>filter.filterProperty===property).length;
}

export function getAvailableFilters(searchFilters:SearchFilter[]):FilterProperty[]{
    return allFilterProperties.filter((filter:FilterProperty)=>{
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