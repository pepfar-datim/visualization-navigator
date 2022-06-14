import React from 'react';
import {Visualization} from "../types/visualization.type";
import {AppState} from "../types/appState.type";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {SearchFilters} from '../../searchFilters/components/searchFilters.component';
import {searchVisualizations} from "../services/searchVisualizations.service";
import {SearchResults} from "../../searchResults/components/searchResults.component";
import {CircularProgress} from "@mui/material";
import "../style/searchPage.css"
import {Loading} from "./loading.component";
import { SearchSettingsComponent } from '../../searchSettings/components/searchSettings.component';
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";

export class SearchPage extends React.Component<any, {
    visualizations:Visualization[],
    appState: AppState,
    searchFilters: SearchFilter[],
    searchSettings: SearchSettings,
}>{
    constructor(props:any) {
        super(props);
        this.state = {
            visualizations:[],
            appState: AppState.ready,
            searchFilters: [],
            searchSettings: {
                limit: 100,
                limitedViewRange: false,
                limitViewsMaxDate: null,
                limitViewsMinDate: null
            }
        };
    }

    updateFilters = (searchFilters:SearchFilter[])=>this.setState({searchFilters})
    updateSettings = (searchSettings:SearchSettings)=>this.setState({searchSettings});
    triggerSearch = ()=>{
        this.setState({appState:AppState.searching})
        searchVisualizations(this.state.searchFilters,this.state.searchSettings).then(visualizations=>this.setState({visualizations, appState: AppState.success}))
    }

    render() {
        return <>
            <SearchSettingsComponent searchSettings={this.state.searchSettings} updateSettings={this.updateSettings}/>
            <SearchFilters
                searchFilters={this.state.searchFilters}
                updateFilters={this.updateFilters}
                triggerSearch={this.triggerSearch}
            />
            {this.state.appState===AppState.searching&&<Loading/>}
            {this.state.appState===AppState.success&&<SearchResults visualizations={this.state.visualizations}/>}
        </>
    }
}

