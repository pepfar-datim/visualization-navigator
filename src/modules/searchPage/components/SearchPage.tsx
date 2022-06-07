import {useDataEngine, useDataQuery} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  CircularLoader,
  IconSettings24,
} from "@dhis2/ui";
import React, { useState } from "react";
import { sqlQuery } from "../../../queries/queries";
import FavoritesTable from "../../searchResults/components/FavoritesTable";
import FilterSelections from "./FilterSelections";
import SettingsModal from "../../../components/SettingsModal";
import {WarningMessage} from "./warningMessage.component";
import "../styles/searchPage.style.css"
import {getAllFilters} from "../const/searchFilterList.const";
import {filterDefinitionOptions} from "../const/filterDefinitionOptions.const";
import {parameterizeVariables} from "../services/parametrizeVariables.service";
import {appConfig} from "../../../app.config";
// import { appConfig } from "../../../app.config.js";
import { generateUID } from "../../../services/helpers";


const SearchPage = ({usersTablePresent}) => {
    const engine = useDataEngine();
  const [viewCountRange, setViewCountRange] = useState({
    restrictRange: false,
    startDate: null,
    endDate: null,
  });
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [countLimit, setCountLimit] = useState("100");
  const [countLimitUsed, setCountLimitUsed] = useState("100");
  const { data, loading, error, refetch } = useDataQuery(sqlQuery, {
    lazy: true,
    onComplete: () => {
      setCountLimitUsed(countLimit);
    },
  });



    const [filters, setFilters] = useState([]);
    const searchFilterList = getAllFilters(usersTablePresent);
    const maxFilters = searchFilterList.reduce((maxFilters, filt) => {
        return maxFilters + filt.count;
    }, 0);
    const addFilter = () => {
        if (filters.length < maxFilters) {
            setFilters([...filters, { id: generateUID(6), prop: null, text: null }]);
        }
    };
    const updateFilter = ({ uid, object }) => {
        const copyFilters = [...filters];
        const index = copyFilters.map((i) => i.id).indexOf(uid);
        if (index > -1) {
            copyFilters[index] = object;
            setFilters(copyFilters);
        }
    };
    const deleteFilter = (uid) => {
        setFilters(filters.filter((f) => f.id !== uid));
    };

    const variableString = parameterizeVariables({
        filters,
        viewCountRange,
        countLimit,
    });

    const triggerSearch = ()=>{

        refetch({
            id: appConfig.sqlViewId,
            queryVariables: variableString,
        });
    }


  const updateViewCountRange = (newObj) => {
    setViewCountRange({ ...viewCountRange, ...newObj });
  };

  // @ts-ignore
    return (
    <>
      {settingsModalOpen && (
        <SettingsModal
          viewCountRange={viewCountRange}
          updateViewCountRange={updateViewCountRange}
          setSettingsModalOpen={setSettingsModalOpen}
          countLimit={countLimit}
          setCountLimit={setCountLimit}
        />
      )}
      <div className="containerSearch">
            <Button
                className={'settingsButton'}
              onClick={() => {
                setSettingsModalOpen(true);
              }}
              icon={<IconSettings24 />}
            />
          {data && <a href={`${engine.link.baseUrl}/${engine.link.apiPath}/sqlViews/${appConfig.sqlViewId}/data.xls?paging=false&var=${variableString.join(",")}`}><Button className='downloadResults'>Download results</Button></a>}
        {refetch && viewCountRange && (
          <FilterSelections
            filters={filters}
            triggerSearch={triggerSearch}
            usersTablePresent={usersTablePresent}
            deleteFilter={deleteFilter}
            updateFilter={updateFilter}
            addFilter={addFilter}
          />
        )}
        {error && (
          <div className="statusContainer">
            <WarningMessage
              messageText={i18n.t("Could not execute search")}
              infoMessage={false}
            />
          </div>
        )}
         <div className='clear'/>
          {loading && (
              <div className="loading">
                  <CircularLoader/>
                  <br/>
                  Loading...
              </div>
          )}
        {data && (
          <>
            {(data.sqlData.listGrid?.rows?.length || 0) ===
              parseInt(countLimitUsed) && (
              <WarningMessage
                messageText={i18n.t(
                  "Limited to {{limit}} results. Refine search or update settings to see all matching results.",
                  {
                    limit: countLimitUsed,
                  }
                )}
                infoMessage={true}
              />
            )}
            <FavoritesTable data={data.sqlData.listGrid} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
