import { useDataQuery } from "@dhis2/app-runtime";
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


const SearchPage = ({usersTablePresent}) => {
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
        {refetch && viewCountRange && (
          <FilterSelections
            viewCountRange={viewCountRange}
            fetchData={refetch}
            countLimit={countLimit}
            usersTablePresent={usersTablePresent}
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
