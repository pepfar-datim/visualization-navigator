import React, {useState} from "react";
import {SqlViewVersion} from "../../searchPage/types/appState.type";
import {checkSqlView} from "../services/checkSqlView.service";
import {checkSuperUser} from "../services/checkSuperUser.service";

export function InitWrapper({SearchPage}:{SearchPage:React.ComponentType<{sqlViewVersion:SqlViewVersion,isSuperUser:boolean}>}) {
    let [sqlViewVersion, setSqlViewVersion] = useState<SqlViewVersion>(SqlViewVersion.withUsers);
    let [isSuperUser, setSuperUser] = useState<boolean>(true);
    checkSqlView().then((v:SqlViewVersion)=>setSqlViewVersion(v))
    checkSuperUser().then(s=>setSuperUser(s));
    return <SearchPage sqlViewVersion={sqlViewVersion} isSuperUser={isSuperUser}/>;
}