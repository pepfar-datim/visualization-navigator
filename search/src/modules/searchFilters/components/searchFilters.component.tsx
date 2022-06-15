import React from "react";
import {allFilterProperties, FilterProperty, getFilterOperators, SearchFilter} from "../types/searchFilters.type";
import {UpdateFilters} from "../../searchPage/types/methods.type";
import {SearchFilterComponent} from "./searchFilter.component";
import {Button} from "@mui/material";
import {Trigger} from "../types/methods.type";
import {Add, Search} from "@mui/icons-material";
import {getAvailableFilters} from "../services/getAvailableFilters.service";
import {SqlViewVersion} from "../../searchPage/types/appState.type";

const changeFilter = (i:number, searchFilter:SearchFilter, searchFilters:SearchFilter[], updateFilters:UpdateFilters)=>{
    let {filterProperty,operator,value}:SearchFilter = searchFilter;
    if (!filterProperty||!allFilterProperties.includes(filterProperty)) throw new Error(`Cannot change filter type`);
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

export function SearchFilters({searchFilters, updateFilters, triggerSearch,sqlViewVersion}:{
    searchFilters:SearchFilter[],
    updateFilters:UpdateFilters,
    triggerSearch:Trigger,
    sqlViewVersion:SqlViewVersion
}) {
    let availableFilters:FilterProperty[] = getAvailableFilters(searchFilters,sqlViewVersion);
    return <div className={'searchFiltersRoot'}>
        {searchFilters.map((f:SearchFilter, i:number)=><SearchFilterComponent
            key={i}
            searchFilter={f}
            changeFilter={(searchFilter:SearchFilter)=>{
                changeFilter(i,searchFilter,searchFilters,updateFilters)
            }}
            deleteFilter={()=>deleteFilter(i, searchFilters, updateFilters)}
            availableFilters={availableFilters}
            i={i}
        />)}
        <div id={`searchButtonsWrapper`}>
            <Button onClick={()=>addFilter(searchFilters,updateFilters)} variant='outlined' color='inherit' data-testid='addFilter' startIcon={<Add/>} id='addFilter'>Add filter</Button>
            <Button onClick={triggerSearch} variant='contained' data-testid='searchButton' disableElevation={true} startIcon={<Search/>}>{searchFilters.length===0?'Show all':'Search'}</Button>
        </div>
        <div className='floatclear'/>
    </div>;
}