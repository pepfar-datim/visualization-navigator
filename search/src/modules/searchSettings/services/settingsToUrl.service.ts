import {SearchSettings} from "../types/searchSettings.type";
import {defaultFilters as d} from "../../searchFilters/const/defaultFilters.const";

export function settingsToUrl(searchSettings:SearchSettings):string{
    let {limitViewsMinDate, limitViewsMaxDate, limit} = searchSettings;
    return `limitViewsMinDate:${limitViewsMinDate||d.limitViewsMinDate},limitViewsMaxDate:${limitViewsMaxDate||d.limitViewsMaxDate},limit:${limit||d.limit}`
}