import React from "react";
import {
    FilterOperator as FilterOperatorType,
    FilterProperty,
    FilterProperty as FilterTypeType,
    SearchFilter as SearchFilterType
} from "../types/searchFilters.type";
import {FilterPropertySelect} from "./filterPropertySelect.component";
import {ChangeFilter} from "../types/methods.type";
import {FilterValueInput} from "./filterValueInput.components";
import {DeleteFilter} from "./deleteFilter.component";
import {FilterOperator} from "./filterOperator.component";
import "../style/searchFilters.css"
import {Trigger} from "../../shared/types/shared.types";

export function SearchFilterComponent({searchFilter, changeFilter, deleteFilter, availableFilters,i}:{searchFilter:SearchFilterType, changeFilter:ChangeFilter, deleteFilter:Trigger,availableFilters: FilterProperty[],i:number}) {
    const {filterProperty,value,operator} = searchFilter;
    return <div className='appear'>
        <FilterPropertySelect filterProperty={filterProperty} availableFilters={availableFilters} changeFilterType={(newType:FilterTypeType)=>changeFilter({filterProperty:newType,operator:null,value:null})} i={i}/>
        {filterProperty&&<FilterOperator filterProperty={filterProperty} operator={operator} changeOperator={(newOperator:FilterOperatorType)=>changeFilter({filterProperty, operator:newOperator,value})} i={i}/>}
        {filterProperty&&<FilterValueInput filterProperty={filterProperty} filterValue={value} changeFilterValue={(newValue:string)=>changeFilter({filterProperty, operator,value:newValue})} i={i}/>}
        <DeleteFilter deleteFilter={deleteFilter} i={i}/>
    </div>;
}