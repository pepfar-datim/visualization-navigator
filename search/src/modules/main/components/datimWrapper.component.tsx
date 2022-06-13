import {Provider} from "@dhis2/app-runtime";
import datimApi from "@pepfar-react-lib/datim-api";
import React, {ReactElement} from "react";
// @ts-ignore
import {HeaderBar} from "@dhis2-ui/header-bar";

export function DatimWrapper({children}:{children:ReactElement}){
    return <Provider config={{baseUrl: datimApi.getBaseUrl(), apiVersion: 36}}>
        <span id='dhis2HeaderBar'>
            <HeaderBar/>
        </span>
        {children}
    </Provider>
}