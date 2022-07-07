import React from 'react';
import {Visualization} from "../types/visualization.type";
import {AppState} from "../types/appState.type";
import {FilterOperator, FilterProperty, SearchFilter} from "../../searchFilters/types/searchFilters.type";
import {SearchFilters} from '../../searchFilters/components/searchFilters.component';
import {searchVisualizations} from "../services/searchVisualizations.service";
import {SearchResults} from "../../searchResults/components/searchResults.component";
import "../style/searchPage.css"
import {Loading} from "./loading.component";
import {SearchSettingsComponent} from '../../searchSettings/components/searchSettings.component';
import {SearchSettings} from "../../searchSettings/types/searchSettings.type";
import {SelectVisualization} from "../types/methods.type";
import {Trigger} from "../../shared/types/shared.types";
import {areAllSelected, getSelectedVisualizations, selectAll} from '../services/selectVisualizations.service';
import {ApplySharingToAll, BulkSharingStatus, ShareSettings} from "../../sharing/types/sharing.types";
import {applySharingToAll} from "../../sharing/services/applySharingToAll.service";
import {MessageBox} from "../../message/components/messageBox.component";
import {Message} from "../../message/types/message.type";
import {getBulkSharingMessage} from "../../sharing/services/getBulkSharingMessage.service";
import {FullscreenLoading} from '../../sharing/components/fullscreenLoading.components';
import {DownloadResults} from "./downloadResults.component";
import {InitState} from "../../main/types/initState.type";
import {registerEnterKey} from "../services/searchOnEnter.service";

export class SearchPage extends React.Component<{initState:InitState}, {
    visualizations:Visualization[],
    appState: AppState,
    searchFilters: SearchFilter[],
    searchSettings: SearchSettings,
    message?: Message
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
            message: undefined
        };
        registerEnterKey(this.triggerSearch)
    }

    updateFilters = (searchFilters:SearchFilter[])=>this.setState({searchFilters})
    updateSettings = (searchSettings:SearchSettings)=>this.setState({searchSettings});
    triggerSearch = ()=>{
        this.setState({appState:AppState.searching})
        searchVisualizations(this.state.searchFilters,this.state.searchSettings).then(visualizations=>this.setState({visualizations, appState: AppState.results}))
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
    applySharingToAll:ApplySharingToAll = async (shareSettings:ShareSettings)=>{
        this.setState({appState: AppState.bulkSharePending});
        let status:BulkSharingStatus = await applySharingToAll(shareSettings,getSelectedVisualizations(this.state.visualizations));
        this.setState({
            appState: AppState.results,
            message: getBulkSharingMessage(status)
        })
        setTimeout(this.closeMessage,5*1000)
    }
    closeMessage:Trigger = ()=>this.setState({message:undefined});
    postMessage = (message:Message)=>{
        this.setState({message})
        setTimeout(this.closeMessage,5*1000)
    }

    render() {
        return <>
            <SearchSettingsComponent searchSettings={this.state.searchSettings} updateSettings={this.updateSettings}/>
            {this.state.appState===AppState.results&&<DownloadResults searchFilters={this.state.searchFilters} searchSettings={this.state.searchSettings}/>}
            <SearchFilters
                searchFilters={this.state.searchFilters}
                updateFilters={this.updateFilters}
                triggerSearch={this.triggerSearch}
                initState={this.props.initState}
            />
            {this.state.appState===AppState.searching&&<Loading/>}
            {[AppState.results,AppState.bulkSharePending].includes(this.state.appState)&&<SearchResults
                visualizations={this.state.visualizations}
                selectVisualization={this.selectVisualization}
                selectAll={this.selectAll}
                applySharingToAll={this.applySharingToAll}
                initState={this.props.initState}
                postMessage={this.postMessage}
            />}
            {this.state.appState===AppState.bulkSharePending&&<FullscreenLoading/>}
            <MessageBox message={this.state.message} closeMessage={this.closeMessage}/>
        </>
    }
}

