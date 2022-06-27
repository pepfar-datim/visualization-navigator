import {filtersToUrl} from "../../searchFilters/types/filtersToUrl.service";
import {settingsToUrl} from "../../searchSettings/services/settingsToUrl.service";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import {includeNeverViewed} from "./includeNeverViewed.service";

export function getSearchParams(searchFilters:SearchFilter[],searchSettings:SearchSettings):string{
    return `paging=false&var=${filtersToUrl(searchFilters)},${settingsToUrl(searchSettings)},includeNeverViewed:${includeNeverViewed(searchFilters,searchSettings)?1:0}`
}