import {FilterProperty, SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";

export function includeNeverViewed(searchFilters:SearchFilter[],searchSettings:SearchSettings):boolean{
    let usedFilterProps:(FilterProperty|null)[] = searchFilters.map(({filterProperty})=>filterProperty)
    return !usedFilterProps.includes(FilterProperty.lastViewed)
            && !usedFilterProps.includes(FilterProperty.views)
            && !searchSettings.limitedViewRange
}