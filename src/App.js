import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import i18n from "@dhis2/d2-i18n";
import "./locales";
import { CssVariables } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./modules/searchPage/components/SearchPage";
import ViewPage from "./components/ViewPage";
import {checkSqlView} from "./services/checkSqlView.service";

const App = () => {
  const d2Config = {
    schemas: [
      "chart",
      "map",
      "report",
      "reportTable",
      "eventChart",
      "eventReport",
      "dashboard",
      "organisationUnit",
      "userGroup",
    ],
  };

  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    setTimeout(() => setDelayed(false), 5000);
  }, []);

  return (
    <>
      <CssVariables colors spacers />
      <D2Shim d2Config={d2Config} i18nRoot="./i18n">
        {({ d2 }) => {
          if (!d2 && !delayed) {
            <p>{i18n.t("App encountered errors on d2 initialization")}</p>;
          }
          checkSqlView(d2);
          const usersTablePresent = d2?.system?.systemInfo?.instanceBaseUrl?.includes(`datim`);
          return (
            <Router>
              <Switch>
                <Route path="/view/:id" component={ViewPage} />
                <Route>
                  <SearchPage usersTablePresent={usersTablePresent}/>
                </Route>
              </Switch>
            </Router>
          );
        }}
      </D2Shim>
    </>
  );
};

export default App;
