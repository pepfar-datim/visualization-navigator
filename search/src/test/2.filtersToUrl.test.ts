import {FilterOperator, FilterProperty, SearchFilter} from "../modules/searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../modules/searchFilters/types/filtersToUrl.service";
import {defaultFilters as d} from "../modules/searchFilters/const/defaultFilters.const"

type TestCase = {
    name:string,
    filters:SearchFilter[],
    url:string
}

const value='TEST_VALUE';

const testCases:TestCase[] = [{
    name:'name',
    filters:[{filterProperty:FilterProperty.name,operator: FilterOperator.contains,value}],
    url:`uid:_,favoriteName:${value},user:_,visualizationType:_,includeNeverViewed:1,minViewCount:${d.minViewCount},maxViewCount:${d.maxViewCount},lastViewedMinDate:${d.lastViewedMinDate},lastViewedMaxDate:${d.lastViewedMaxDate},limitViewsMinDate:${d.limitViewsMinDate},limitViewsMaxDate:${d.limitViewsMaxDate}`
},{
    name:'name,minViewCount',
    filters:[{filterProperty:FilterProperty.name,operator: FilterOperator.contains,value},{filterProperty:FilterProperty.views,operator: FilterOperator.lessThan,value}],
    url:`uid:_,favoriteName:${value},user:_,visualizationType:_,includeNeverViewed:1,minViewCount:${d.minViewCount},maxViewCount:${value},lastViewedMinDate:${d.lastViewedMinDate},lastViewedMaxDate:${d.lastViewedMaxDate},limitViewsMinDate:${d.limitViewsMinDate},limitViewsMaxDate:${d.limitViewsMaxDate}`
}];

testCases.forEach(({name,filters,url}:TestCase)=>{
    test(`2 > Filters to url > ${name}`,()=>{
        expect(filtersToUrl(filters)).toBe(url);
    })
})