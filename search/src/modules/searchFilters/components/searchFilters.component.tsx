import React from "react";
import {allFilters, FilterProperty, getFilterOperators, SearchFilter} from "../types/searchFilters.type";
import {UpdateFilters} from "../../searchPage/types/methods.type";
import {SearchFilterComponent} from "./searchFilter.component";
import {Button} from "@mui/material";
import {Trigger} from "../types/methods.type";
import {Add, Search} from "@mui/icons-material";

const changeFilter = (i:number, searchFilter:SearchFilter, searchFilters:SearchFilter[], updateFilters:UpdateFilters)=>{
    let {filterProperty,operator,value}:SearchFilter = searchFilter;
    if (!filterProperty||!allFilters.includes(filterProperty)) throw new Error(`Cannot change filter type`);
    if (!operator) operator = getFilterOperators(filterProperty)[0];
    searchFilters[i] = {filterProperty:filterProperty as FilterProperty,value, operator}
    updateFilters(searchFilters);
}

const addFilter = (searchFilters:SearchFilter[], updateFilters:UpdateFilters)=>{
    searchFilters.push({filterProperty:null, operator: null, value:null});
    updateFilters(searchFilters);
}

const deleteFilter = (index:number, searchFilters:SearchFilter[], updateFilters:UpdateFilters)=>{
    updateFilters(searchFilters.filter((f,i)=>i!==index))
}

export function SearchFilters({searchFilters, updateFilters, triggerSearch}:{
    searchFilters:SearchFilter[],
    updateFilters:UpdateFilters,
    triggerSearch:Trigger
}) {
    const hasFilters:boolean = searchFilters.length>0;
    const width = hasFilters?560:'inherit';
    return <div style={{width}} className={'searchFiltersRoot'}>
        {searchFilters.map((f:SearchFilter, i:number)=><SearchFilterComponent
            key={i}
            searchFilter={f}
            changeFilter={(searchFilter:SearchFilter)=>{
                changeFilter(i,searchFilter,searchFilters,updateFilters)
            }}
            deleteFilter={()=>deleteFilter(i, searchFilters, updateFilters)}
            i={i}
        />)}
        <div id={`searchButtonsWrapper`}>
            <Button onClick={()=>addFilter(searchFilters,updateFilters)} variant='outlined' color='inherit' data-testid='addFilter' startIcon={<Add/>} id='addFilter'>Add filter</Button>
            <Button onClick={triggerSearch} variant='contained' data-testid='searchButton' disableElevation={true} startIcon={<Search/>}>{searchFilters.length===0?'Show all':'Search'}</Button>
        </div>
        <div className='floatclear'/>
    </div>;
}