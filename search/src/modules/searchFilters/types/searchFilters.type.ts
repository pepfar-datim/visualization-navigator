export enum FilterProperty{
    name='name',
    views='views',
    lastViewed='lastViewed',
    owner='owner',
    type='type',
    viewsMinDate='viewsMinDate',
    viewsMaxDate='viewsMaxDate'
}

export enum FilterOperatorType{
    equalTo='equalTo',
    lessThan='lessThan',
    greaterThan='greaterThan'
}

export enum FilterOperator {
    contains='contains',
    greaterThan='greaterThan',
    lessThan='lessThan',
    is='is',
    after='after',
    before='before',
    never='never'
}

export function getFilterOperators(filterType:FilterProperty|null):FilterOperator[]{
    switch (filterType){
        case FilterProperty.name:
            return [FilterOperator.contains]
        case FilterProperty.views:
            return [FilterOperator.greaterThan, FilterOperator.lessThan]
        case FilterProperty.lastViewed:
            return [FilterOperator.before, FilterOperator.after]
        case FilterProperty.owner:
            return [FilterOperator.contains]
        case FilterProperty.type:
            return [FilterOperator.is]
        default:
            return [];
    }
}

export const allFilters:string[] = Object.values(FilterProperty);

export type SearchFilter = {
    filterProperty:FilterProperty|null,
    value:string|null,
    operator: FilterOperator|null
}