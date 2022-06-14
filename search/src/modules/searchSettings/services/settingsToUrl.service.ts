import {SearchSettings} from "../types/searchSettings.type";
import {defaultFilters as d} from "../../searchFilters/const/defaultFilters.const";
import {stringifyDate} from "../../shared/services/stringifyDate.service";

export function settingsToUrl(searchSettings:SearchSettings):string{
    let {limitViewsMinDate, limitViewsMaxDate, limit} = searchSettings;
    if (limitViewsMinDate) limitViewsMinDate = stringifyDate(limitViewsMinDate)
    if (limitViewsMaxDate) limitViewsMaxDate = stringifyDate(limitViewsMaxDate)    
    return `limitViewsMinDate:${limitViewsMinDate||d.limitViewsMinDate},limitViewsMaxDate:${limitViewsMaxDate||d.limitViewsMaxDate},limit:${limit||d.limit}`
}