import React, {useState} from "react";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {checkSqlView} from "../services/checkSqlView.service";

export function SqlDetectWrapper({SearchPage}:{SearchPage:React.ComponentType<{sqlViewVersion:SqlViewVersion}>}) {
    let [sqlViewVersion, setSqlViewVersion] = useState<SqlViewVersion>(SqlViewVersion.withoutUsers);
    checkSqlView().then((v:SqlViewVersion)=>setSqlViewVersion(v))
    return <SearchPage sqlViewVersion={sqlViewVersion}/>;
}