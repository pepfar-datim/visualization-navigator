import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  CircularLoader,
  IconSettings24,
  IconInfo24,
  IconWarning24,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { sqlQuery } from "../queries/queries";
import FavoritesTable from "./FavoritesTable";
import FilterSelections from "./FilterSelections";
import SettingsModal from "./SettingsModal";

const WarningMessage = ({ messageText, infoMessage }) => (
  <>
    <div className={infoMessage ? "infoMessage" : "warningMessage"}>
      {infoMessage && <IconInfo24 />}
      {!infoMessage && <IconWarning24 />}
      <span>{messageText}</span>
    </div>
    <style jsx>{`
      .warningMessage,
      .infoMessage {
        display: flex;
        align-items: center;
        margin: var(--spacers-dp16) 0 var(--spacers-dp8) 0;
      }
      .warningMessage span,
      .infoMessage span {
        margin-left: var(--spacers-dp8);
      }
      .infoMessage {
        color: var(--colors-blue700);
      }
      .warningMessage {
        color: var(--colors-yellow700);
      }
    `}</style>
  </>
);

WarningMessage.propTypes = {
  infoMessage: PropTypes.bool,
  messageText: PropTypes.string,
};

const SearchPage = () => {
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
        <div className="titleContainer">
          <span className="titleText">
            {i18n.t("Search visualization items")}
          </span>
          <div className="rightButton">
            <Button
              onClick={() => {
                setSettingsModalOpen(true);
              }}
              icon={<IconSettings24 />}
            />
          </div>
        </div>
        {refetch && viewCountRange && (
          <FilterSelections
            viewCountRange={viewCountRange}
            fetchData={refetch}
            countLimit={countLimit}
          />
        )}
        {loading && (
          <div className="statusContainer">
            <CircularLoader />
          </div>
        )}
        {error && (
          <div className="statusContainer">
            <WarningMessage
              messageText={i18n.t("Could not execute search")}
              infoMessage={false}
            />
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
      <style jsx>
        {`
          .containerSearch {
            width: 95%;
            margin: auto;
            display: flex;
            flex-direction: column;
          }
          .titleContainer {
            display: flex;
            margin: var(--spacers-dp16) 0 var(--spacers-dp4) 0;
          }
          .rightButton {
            margin-left: auto;
          }
          .statusContainer {
            margin: var(--spacers-dp16);
          }
          .titleText {
            font-size: 1.8em;
            font-weight: 300;
          }
        `}
      </style>
    </>
  );
};

export default SearchPage;
