import {FilterOperator, FilterProperty, SearchFilter} from "../modules/searchFilters/types/searchFilters.type";
import {filtersToUrl} from "../modules/searchFilters/types/filtersToUrl.service";
import {defaultFilters as d} from "../modules/searchFilters/const/defaultFilters.const"
import {render} from "@testing-library/react";
import {SearchPage} from "../modules/searchPage/components/searchPage.component";
import {addFilter, search, setFilter} from "./lib/shared.testLib";
import React from "react";
import {camelCaseToCapitalized, camelCaseToWords} from "../modules/searchPage/services/textFormat.service";
import {debug, pause, select} from "@pepfar-react-lib/testwrap";
import {get, textsWait} from "@pepfar-react-lib/testwrap/jsbuild";

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
},{
    name:'view count',
    filters:[
        {filterProperty:FilterProperty.views,operator: FilterOperator.greaterThan,value:'100'},
        {filterProperty:FilterProperty.views,operator: FilterOperator.lessThan,value:'110'}
    ],
    toFind:['2020 All MER Results_ BYSubCity','Chiredzi PVLS_D&N']
},{
    name:'chart',
    filters:[
        {filterProperty:FilterProperty.type,operator: FilterOperator.is,value:'Chart'},
    ],
    toFind:['<15 HTS 15+ YIELD','18237: HTS_TST (By Modalities)-Chart']
},{
    name:'last viewed',
    filters:[
        {filterProperty:FilterProperty.lastViewed,operator: FilterOperator.after,value:'2022-01-01'},
        {filterProperty:FilterProperty.lastViewed,operator: FilterOperator.before,value:'2022-01-05'},
    ],
    toFind:['COP22 Spectrum input data - PMTCT_ART_Already _15-18','EGPAF_Index_TST_District_FY21']
}];

testCases.forEach(({name,filters,toFind}:TestCase)=>{
    test(`3 > Search > ${name}`,async ()=>{
        render(<SearchPage/>);
        filters.forEach(({filterProperty,operator,value}:SearchFilter,i:number)=>{
            if (!filterProperty||!operator||!value) return;
            addFilter();
            setFilter(i,filterProperty,camelCaseToWords(operator),value);
        })
        search();
        await textsWait(toFind)
    })
})