import { useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  IconAddCircle16,
  IconDownload16,
  IconSearch16,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { appConfig } from "../../../app.config.js";
import { generateUID } from "../../../services/helpers";
import {parameterizeVariables} from "../services/parametrizeVariables.service";
import {getAllFilters} from "../const/searchFilterList.const";
import {Filter} from "./filter.component";
import {filterDefinitionOptions} from "../const/filterDefinitionOptions.const";
import "../styles/filterSelections.style.css"


const FilterSelections = ({fetchData, viewCountRange, countLimit, usersTablePresent}) => {
  const engine = useDataEngine();
  const [downloadURL, setDownloadURL] = useState(null);

  const searchFilterList = getAllFilters(usersTablePresent);

  const maxFilters = searchFilterList.reduce((maxFilters, filt) => {
    return maxFilters + filt.count;
  }, 0);

  const filterMap = searchFilterList.reduce((fMap, filt) => {
    fMap[filt.prop] = {
      type: filt.type,
      options: filterDefinitionOptions[filt.type],
      allowedValues: filt.allowedValues,
    };
    return fMap;
  }, {});

  const [filters, setFilters] = useState([]);

  const getAvailableFilters = (filtSelection) => {
    const usedFilters = searchFilterList.reduce((fCount, filt) => {
      fCount[filt.prop] = 0;
      return fCount;
    }, {});
    filters.forEach((filt) => {
      usedFilters[filt.prop] += 1;
    });
    return searchFilterList.filter(
      (f) => f.prop === filtSelection.prop || usedFilters[f.prop] < f.count
    );
  };

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

  const handleDownload = () => {
    window.open(downloadURL);
  };

  return (
    <div className="filterSelections">
      <div>
        {filters.map((f) => (
          <Filter
            key={`filter_${f.id}`}
            filterInfo={f}
            filterMap={filterMap}
            availableFilters={getAvailableFilters(f)}
            deleteFilter={deleteFilter}
            updateFilter={updateFilter}
          />
        ))}
      </div>
      <div><div className="filterControls">
        <ButtonStrip>
          <Button
            dataTest={`addFilter`}
            className={'addFilter'}
            disabled={filters.length >= maxFilters}
            icon={<IconAddCircle16 />}
            onClick={() => {
              addFilter();
            }}
          >
            {i18n.t("Add filter")}
          </Button>
          <Button
            icon={<IconSearch16 />}
            primary
            dataTest={`executeSearch`}
            onClick={() => {
              const variableString = parameterizeVariables({
                filters,
                viewCountRange,
                countLimit,
              });
                setDownloadURL(
                    // @ts-ignore
                `${engine.link.baseUrl}/${engine.link.apiPath}/sqlViews/${
                  appConfig.sqlViewId
                }/data.xls?paging=false&var=${variableString.join(",")}`
              );
              fetchData({
                id: appConfig.sqlViewId,
                queryVariables: variableString,
              });
            }}
          >
            {filters.length===0?i18n.t("Show all"):i18n.t("Search")}
          </Button>
            {downloadURL &&
                    <Button
                        onClick={() => {
                            handleDownload();
                        }}
                        icon={<IconDownload16 />}
                    >
                        {i18n.t("Download results")}
                    </Button>
            }
        </ButtonStrip>
      </div>
      </div>
    </div>
  );
};

FilterSelections.propTypes = {
  countLimit: PropTypes.string,
  fetchData: PropTypes.func,
  viewCountRange: PropTypes.object,
};

export default FilterSelections;
