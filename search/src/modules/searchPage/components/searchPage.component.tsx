import React from 'react';
import {Visualization} from "../types/visualization.type";
import {AppState, SqlViewVersion} from "../types/appState.type";
import {SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {SearchFilters} from '../../searchFilters/components/searchFilters.component';
import {searchVisualizations} from "../services/searchVisualizations.service";
import {SearchResults} from "../../searchResults/components/searchResults.component";
import {CircularProgress} from "@mui/material";
import "../style/searchPage.css"
import {Loading} from "./loading.component";
import { SearchSettingsComponent } from '../../searchSettings/components/searchSettings.component';
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import {SelectVisualization} from "../types/methods.type";
import {Trigger} from "../../shared/types/shared.types";
import {areAllSelected, selectAll} from '../services/selectVisualizations.service';
import {BulkShareButton} from "./bulkShareButton.component";

export class SearchPage extends React.Component<{sqlViewVersion:SqlViewVersion}, {
    visualizations:Visualization[],
    appState: AppState,
    searchFilters: SearchFilter[],
    searchSettings: SearchSettings,
}>{
    constructor(props:any) {
        super(props);
        this.state = {
            visualizations: [],
            appState: AppState.ready,
            searchFilters: [],
            searchSettings: {
                limit: 100,
                limitedViewRange: false,
                limitViewsMaxDate: null,
                limitViewsMinDate: null
            },
        };
    }

    updateFilters = (searchFilters:SearchFilter[])=>this.setState({searchFilters})
    updateSettings = (searchSettings:SearchSettings)=>this.setState({searchSettings});
    triggerSearch = ()=>{
        this.setState({appState:AppState.searching})
        searchVisualizations(this.state.searchFilters,this.state.searchSettings).then(visualizations=>this.setState({visualizations, appState: AppState.success}))
    }
    selectVisualization:SelectVisualization = (visualizationId:string)=>{
        let visualizations:Visualization[] = this.state.visualizations;
        let visualization = visualizations.filter(({id})=>id===visualizationId)[0];
        visualization.selected = !visualization.selected;
        this.setState({visualizations});
    }
    selectAll:Trigger = ()=>{
        let allSelected:boolean = areAllSelected(this.state.visualizations);
        let visualizations;
        if (allSelected) visualizations = selectAll(this.state.visualizations,false)
        else visualizations = selectAll(this.state.visualizations,true)
        this.setState({visualizations})
    }

    render() {
        return <>
            <SearchSettingsComponent searchSettings={this.state.searchSettings} updateSettings={this.updateSettings}/>
            <BulkShareButton visualizations={this.state.visualizations}/>
            <SearchFilters
                searchFilters={this.state.searchFilters}
                updateFilters={this.updateFilters}
                triggerSearch={this.triggerSearch}
                sqlViewVersion={this.props.sqlViewVersion}
            />
            {this.state.appState===AppState.searching&&<Loading/>}
            {this.state.appState===AppState.success&&<SearchResults
                visualizations={this.state.visualizations}
                sqlViewVersion={this.props.sqlViewVersion}
                selectVisualization={this.selectVisualization}
                selectAll={this.selectAll}
            />}
        </>
    }
}

