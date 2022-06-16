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

export class SearchPage extends React.Component<{sqlViewVersion:SqlViewVersion}, {
    visualizations:Visualization[],
    selectedVisualizations:string[],
    appState: AppState,
    searchFilters: SearchFilter[],
    searchSettings: SearchSettings,
}>{
    constructor(props:any) {
        super(props);
        this.state = {
            visualizations: [],
            selectedVisualizations:[],
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
        // let visualizations:Visualization[] = this.state.visualizations;
        // let visualization = visualizations.filter(({id})=>id===visualizationId)[0];
        // visualization.selected = !visualization.selected;
        // this.setState({visualizations});
        let selectedVisualizations = this.state.selectedVisualizations;
        let i:number = selectedVisualizations.indexOf(visualizationId);
        if (i===-1) selectedVisualizations.push(visualizationId)
        else selectedVisualizations.splice(i,1);
        this.setState({selectedVisualizations})
    }
    selectAll:Trigger = ()=>{
        let allSelected:boolean = areAllSelected(this.state.selectedVisualizations, this.state.visualizations);
        let selectedVisualizations:string[];
        if (allSelected) selectedVisualizations = [];
        else selectedVisualizations = this.state.visualizations.map(v=>v.id);
        // let visualizations;
        // if (allSelected) visualizations = selectAll(this.state.visualizations,false)
        // else visualizations = selectAll(this.state.visualizations,true)
        this.setState({selectedVisualizations})
    }

    render() {
        return <>
            <SearchSettingsComponent searchSettings={this.state.searchSettings} updateSettings={this.updateSettings}/>
            <SearchFilters
                searchFilters={this.state.searchFilters}
                updateFilters={this.updateFilters}
                triggerSearch={this.triggerSearch}
                sqlViewVersion={this.props.sqlViewVersion}
            />
            {this.state.appState===AppState.searching&&<Loading/>}
            {this.state.appState===AppState.success&&<SearchResults
                visualizations={this.state.visualizations}
                selectedVisualizations={this.state.selectedVisualizations}
                sqlViewVersion={this.props.sqlViewVersion}
                selectVisualization={this.selectVisualization}
                selectAll={this.selectAll}
            />}
        </>
    }
}

