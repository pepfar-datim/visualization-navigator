import { useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  IconAddCircle16,
  IconDelete16,
  IconDownload16,
  IconSearch16,
  InputField,
  SingleSelectField,
  SingleSelectOption,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { appConfig } from "../app.config.js";
import { generateUID } from "../services/helpers";

const FilterInputFields = ({ filterInfo, updateFilter, filterMap }) => {
  switch (filterMap[filterInfo.prop].type) {
    case "date":
      if (filterInfo.filterDefinitionOption === "nev") {
        return <></>;
      }
      return (
        <InputField
          type="date"
          dense
          value={filterInfo.text}
          onChange={(e) => {
            updateFilter({
              uid: filterInfo.id,
              object: { ...filterInfo, text: e.value },
            });
          }}
        />
      );
    case "enum":
      return (
        <SingleSelectField
          selected={filterInfo.text}
          onChange={({ selected }) => {
            updateFilter({
              uid: filterInfo.id,
              object: { ...filterInfo, text: selected },
            });
          }}
        >
          {filterMap[filterInfo.prop].allowedValues.map((av) => (
            <SingleSelectOption
              key={`filtValue_${filterInfo.id}_${av.value}`}
              value={av.value}
              label={av.label}
            />
          ))}
        </SingleSelectField>
      );
    default:
      return (
        <InputField
          value={filterInfo.text}
          onChange={(e) => {
            updateFilter({
              uid: filterInfo.id,
              object: { ...filterInfo, text: e.value },
            });
          }}
        />
      );
  }
};

FilterInputFields.propTypes = {
  filterInfo: PropTypes.object,
  filterMap: PropTypes.object,
  updateFilter: PropTypes.func,
};

const Filter = ({
  filterInfo,
  filterMap,
  availableFilters,
  deleteFilter,
  updateFilter,
}) => {
  return (
    <>
      <div className="filterButtons" data-test={`searchFilterItem`}>
        <div className="selectWrapper">
          <SingleSelectField

            label={i18n.t("Filter")}
            selected={filterInfo.prop || ""}
            onChange={(e) => {
              updateFilter({
                uid: filterInfo.id,
                object: {
                  ...filterInfo,
                  text: "",
                  prop: e.selected,
                  filterDefinitionOption:
                    filterMap[e.selected].options[0].value,
                },
              });
            }}
          >
            {availableFilters.map((f) => (
              <SingleSelectOption
                key={`filtProp_${filterInfo.id}_${f.prop}`}
                label={f.displayName}
                value={f.prop}
              />
            ))}
          </SingleSelectField>
        </div>
        {filterInfo.prop && (
          <>
            <SingleSelectField
              selected={filterInfo.filterDefinitionOption || ""}
              disabled={filterMap[filterInfo.prop].options.length === 1}
              onChange={({ selected }) => {
                updateFilter({
                  uid: filterInfo.id,
                  object: { ...filterInfo, filterDefinitionOption: selected },
                });
              }}
            >
              {filterMap[filterInfo.prop].options.map((opt) => (
                <SingleSelectOption
                  key={`${filterInfo.prop}_${opt.value}`}
                  value={opt.value}
                  label={opt.label}
                />
              ))}
            </SingleSelectField>
            <FilterInputFields
              filterInfo={filterInfo}
              updateFilter={updateFilter}
              filterMap={filterMap}
            />
          </>
        )}

        <div>
          <Button
            icon={<IconDelete16 />}
            onClick={() => deleteFilter(filterInfo.id)}
          />
        </div>
      </div>
      <style jsx>
        {`
          .filterButtons {
            display: flex;
            align-items: flex-end;
            margin-top: var(--spacers-dp8);
          }
          .selectWrapper {
            min-width: 160px;
          }
        `}
      </style>
    </>
  );
};

Filter.propTypes = {
  availableFilters: PropTypes.array,
  deleteFilter: PropTypes.func,
  filterInfo: PropTypes.object,
  filterMap: PropTypes.object,
  updateFilter: PropTypes.func,
};

const parameterizeVariables = ({ filters, viewCountRange, countLimit }) => {
  // rethink approach this to make more generalizable
  const variables = {
    uid: "_",
    favoriteName: "_",
    minViewCount: -1,
    maxViewCount: 9223372036854775807,
    user: "_",
    lastViewedMinDate: "1969-01-01",
    lastViewedMaxDate: "2100-01-01",
    includeNeverViewed: 1,
    visualizationType: "_",
    limitViewsMinDate: "1969-01-01",
    limitViewsMaxDate: "2100-01-01",
    limit: 100,
  };

  const variableNameMap = {
    name: {
      contains: "favoriteName",
    },
    view_count: {
      gt: "minViewCount",
      gte: "minViewCount",
      lt: "maxViewCount",
      lte: "maxViewCount",
      nev: "isNever",
    },
    user: {
      contains: "user",
    },
    last_viewed: {
      gt: "lastViewedMinDate",
      lt: "lastViewedMaxDate",
    },
    type: {
      eq: "visualizationType",
    },
  };

  variables.limit = countLimit;
  if (countLimit !== "ALL") {
    variables.limit = parseInt(countLimit);
  }

  const neverPresent =
    filters.filter((f) => {
      return f.prop === "last_viewed" && f.filterDefinitionOption === "nev";
    }).length > 0;
  const datePresent =
    filters.filter((f) => {
      return (
        f.prop === "last_viewed" &&
        ["gt", "lt"].includes(f.filterDefinitionOption)
      );
    }).length > 0;
  filters.forEach((filt) => {
    if (
      variableNameMap[filt.prop] &&
      variableNameMap[filt.prop][filt.filterDefinitionOption]
    ) {
      // move this logic to variableNameMap
      let variableVal = filt.text;
      if (filt.filterDefinitionOption === "gte") {
        variableVal = parseInt(variableVal) - 1;
      }
      if (filt.filterDefinitionOption === "lte") {
        variableVal = parseInt(variableVal) + 1;
      }

      variables[variableNameMap[filt.prop][filt.filterDefinitionOption]] =
        variableVal;
    }
  });

  // handle never logic
  if (datePresent) {
    variables.includeNeverViewed = 0;
  }
  if (neverPresent && !datePresent) {
    variables.lastViewedMaxDate = "1969-01-01";
  }

  // handle view count range restrictions
  if (viewCountRange.restrictRange) {
    if (viewCountRange.startDate) {
      variables.limitViewsMinDate = viewCountRange.startDate;
    }
    if (viewCountRange.endDate) {
      variables.limitViewsMaxDate = viewCountRange.endDate;
    }
  }

  return Object.keys(variables).reduce((allVars, currVar) => {
    return [...allVars, `${currVar}:${variables[currVar]}`];
  }, []);
};

const FilterSelections = ({fetchData, viewCountRange, countLimit, usersTablePresent}) => {
  const engine = useDataEngine();
  const [downloadURL, setDownloadURL] = useState(null);
  const allFilters = [
    { prop: "name", displayName: i18n.t("name"), type: "text", count: 1 },
    {
      prop: "view_count",
      displayName: i18n.t("view count"),
      type: "number",
      count: 2,
    },
    {
      prop: "last_viewed",
      displayName: i18n.t("last viewed"),
      type: "date",
      count: 2,
    },
    {
      prop: "type",
      displayName: i18n.t("type"),
      type: "enum",
      count: 1,
      allowedValues: [
        { label: i18n.t("chart"), value: "chart" },
        { label: i18n.t("dashboard"), value: "dashboard" },
        { label: i18n.t("map"), value: "map" },
        { label: i18n.t("pivot"), value: "pivot" },
      ],
    },
  ];

  if (usersTablePresent) {
    allFilters.push({
      prop: "user",
      displayName: i18n.t("owner"),
      type: "text",
      count: 1,
    });
  }

  const maxFilters = allFilters.reduce((maxFilters, filt) => {
    return maxFilters + filt.count;
  }, 0);

  const filterDefinitionOptions = {
    text: [{ label: i18n.t("contains"), value: "contains" }],
    textExpanded: [
      { label: i18n.t("contains"), value: "contains" },
      { label: i18n.t("is"), value: "eq" },
      { label: i18n.t("is not"), value: "neq" },
    ],
    enum: [{ label: i18n.t("is"), value: "eq" }],
    number: [
      { label: ">", value: "gt" },
      { label: ">=", value: "gte" },
      { label: "<", value: "lt" },
      { label: "<=", value: "lte" },
    ],
    date: [
      { label: i18n.t("after"), value: "gt" },
      { label: i18n.t("before"), value: "lt" },
      { label: i18n.t("never"), value: "nev" },
    ],
  };

  const filterMap = allFilters.reduce((fMap, filt) => {
    fMap[filt.prop] = {
      type: filt.type,
      options: filterDefinitionOptions[filt.type],
      allowedValues: filt.allowedValues,
    };
    return fMap;
  }, {});

  const [filters, setFilters] = useState([]);

  const getAvailableFilters = (filtSelection) => {
    const usedFilters = allFilters.reduce((fCount, filt) => {
      fCount[filt.prop] = 0;
      return fCount;
    }, {});
    filters.forEach((filt) => {
      usedFilters[filt.prop] += 1;
    });
    return allFilters.filter(
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
    <>
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
      <div className="filterControls">
        <ButtonStrip>
          <Button
            dataTest={`addFilter`}
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
            {i18n.t("Execute search")}
          </Button>
        </ButtonStrip>
        {downloadURL && (
          <div className="rightButton">
            <Button
              onClick={() => {
                handleDownload();
              }}
              icon={<IconDownload16 />}
            >
              {i18n.t("Download results")}
            </Button>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .filterControls {
            display: flex;
            margin-top: var(--spacers-dp16);
          }
          .rightButton {
            margin-left: auto;
          }
        `}
      </style>
    </>
  );
};

FilterSelections.propTypes = {
  countLimit: PropTypes.string,
  fetchData: PropTypes.func,
  viewCountRange: PropTypes.object,
};

export default FilterSelections;
