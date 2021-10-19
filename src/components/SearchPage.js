import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { Button, CircularLoader, IconSettings24 } from "@dhis2/ui";
import React, { useState } from "react";
import { sqlQuery } from "../queries/queries";
import FavoritesTable from "./FavoritesTable";
import FilterSelections from "./FilterSelections";
import ViewCountRangeModal from "./ViewCountRangeModal";

const SearchPage = () => {
  const [viewCountRange, setViewCountRange] = useState({
    restrictRange: false,
    startDate: null,
    endDate: null,
  });
  const [viewCountRangeModalOpen, setViewCountRangeModalOpen] = useState(false);
  const { data, loading, error, refetch } = useDataQuery(sqlQuery, {
    lazy: true,
  });

  const updateViewCountRange = (newObj) => {
    setViewCountRange({ ...viewCountRange, ...newObj });
  };

  return (
    <>
      {viewCountRangeModalOpen && (
        <ViewCountRangeModal
          viewCountRange={viewCountRange}
          updateViewCountRange={updateViewCountRange}
          setViewCountRangeModalOpen={setViewCountRangeModalOpen}
        />
      )}
      <div className="containerSearch">
        <div className="titleContainer">
          <span className="titleText">
            {i18n.t("Search visualization items")}
          </span>
          {true === false && (
            <div className="rightButton">
              <Button
                onClick={() => {
                  setViewCountRangeModalOpen(true);
                }}
                icon={<IconSettings24 />}
              />
            </div>
          )}
        </div>
        {refetch && (
          <FilterSelections
            viewCountRange={viewCountRange}
            fetchData={refetch}
          />
        )}
        {loading && (
          <div className="statusContainer">
            <CircularLoader />
          </div>
        )}
        {error && (
          <div className="statusContainer">
            <h2>{i18n.t("Could not execute search")}</h2>
          </div>
        )}
        {data && <FavoritesTable data={data.sqlData.listGrid} />}
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
