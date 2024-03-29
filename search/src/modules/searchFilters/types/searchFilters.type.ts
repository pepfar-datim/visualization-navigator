export enum FilterProperty{
    name='name',
    type='type',
    owner='owner',
    views='views',
    lastViewed='lastViewed',
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

export const allFilterProperties:FilterProperty[] = Object.values(FilterProperty);

export type SearchFilter = {
    filterProperty:FilterProperty|null,
    value:string|null,
    operator: FilterOperator|null
}