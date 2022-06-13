import {FilterOperator, FilterProperty, SearchFilter} from "../modules/searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../modules/searchFilters/types/filtersToUrl.service";
import {defaultFilters as d} from "../modules/searchFilters/const/defaultFilters.const"
import {render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {addFilter, search, setFilter} from "./lib/shared.testLib";
import React from "react";
import {camelCaseToHuman} from "../modules/searchPage/services/textFormat.service";
import {select} from "@pepfar-react-lib/testwrap";
import {textsWait} from "@pepfar-react-lib/testwrap/jsbuild";

type TestCase = {
    name:string,
    filters:SearchFilter[],
    toFind:string[]
}

const testCases:TestCase[] = [{
    name:'name',
    filters:[
        {filterProperty:FilterProperty.name,operator: FilterOperator.contains,value:'MER'},
        {filterProperty:FilterProperty.owner,operator: FilterOperator.contains,value:'er'}
    ],
    toFind:['0. FY19_EDARP_MER_Results','18237 TB PREV (Numerator and Denominator)']
}];

testCases.forEach(({name,filters,toFind}:TestCase)=>{
    test(`3 > Search > ${name}`,async ()=>{
        render(<SearchPage/>);
        filters.forEach(({filterProperty,operator,value}:SearchFilter,i:number)=>{
            if (!filterProperty||!operator||!value) return;
            addFilter();
            setFilter(i,filterProperty,operator,value);
        })
        search();
        await textsWait(toFind)
    })
})