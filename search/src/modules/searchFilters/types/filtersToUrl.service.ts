import {FilterOperator, FilterProperty, SearchFilter} from "./searchFilters.type";
import {defaultFilters as d} from "../const/defaultFilters.const";
import {stringifyDate} from "../../shared/services/stringifyDate.service";

function getFilterValue(filterProperty:FilterProperty, operator: FilterOperator, searchFilters:SearchFilter[]):string|null{
    const propertyMatcher = (f:SearchFilter)=>f.filterProperty===filterProperty&&f.operator===operator
    if (!searchFilters.some(propertyMatcher)) return null;
    else return searchFilters.filter(propertyMatcher)[0].value;
}

export function filtersToUrl(searchFilters:SearchFilter[]):string{
    let favoriteName = getFilterValue(FilterProperty.name, FilterOperator.contains, searchFilters),
        user = getFilterValue(FilterProperty.owner, FilterOperator.contains, searchFilters),
        minViewCount = getFilterValue(FilterProperty.views, FilterOperator.greaterThan, searchFilters),
        maxViewCount = getFilterValue(FilterProperty.views, FilterOperator.lessThan, searchFilters),
        lastViewedMinDate = getFilterValue(FilterProperty.lastViewed, FilterOperator.after, searchFilters),
        lastViewedMaxDate = getFilterValue(FilterProperty.lastViewed, FilterOperator.before, searchFilters),
        visualizationType = getFilterValue(FilterProperty.type, FilterOperator.is, searchFilters)
    ;
    if (lastViewedMinDate) lastViewedMinDate = stringifyDate(lastViewedMinDate)
    if (lastViewedMaxDate) lastViewedMaxDate = stringifyDate(lastViewedMaxDate)
    return `uid:_,\
favoriteName:${favoriteName||'_'},\
user:${user||'_'},\
visualizationType:${visualizationType||'_'},\
includeNeverViewed:1,\
minViewCount:${minViewCount||d.minViewCount},\
maxViewCount:${maxViewCount||d.maxViewCount},\
lastViewedMinDate:${lastViewedMinDate||d.lastViewedMinDate},\
lastViewedMaxDate:${lastViewedMaxDate||d.lastViewedMaxDate}`
}