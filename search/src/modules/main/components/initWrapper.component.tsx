import React, {useState} from "react";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {getInitState} from "../services/getInitState.service";
import {InitState} from "../types/initState.type";

let start:InitState = {
    fetched: false,
    user:{
        superUser:true,
        username: ''
    },
    includeUsers: true
}

export function InitWrapper({SearchPage}:{SearchPage:React.ComponentType<{initState:InitState}>}) {
    let [initState,setInitState] = useState<InitState>(start);
    if(!initState.fetched) getInitState().then((initState:InitState)=>setInitState(initState));
    return <SearchPage initState={initState}/>;
}