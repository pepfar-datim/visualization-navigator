import React from 'react';
import ReactDOM from 'react-dom/client';
import {SearchPage} from './modules/searchPage/components/searchPage.component';
import datimApi from "@pepfar-react-lib/datim-api"
import "./index.css";
import {DatimWrapper} from "./modules/main/components/datimWrapper.component";
import {ThemeWrapper} from './modules/searchPage/components/themeWrapper.component';
import {InitWrapper} from "./modules/main/components/initWrapper.component";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

datimApi.register(process.env.NODE_ENV,process.env.REACT_APP_BASE_URL);

root.render(<React.StrictMode>
    <DatimWrapper>
        <ThemeWrapper>
            <InitWrapper SearchPage={SearchPage}/>
        </ThemeWrapper>
    </DatimWrapper>
</React.StrictMode>);

