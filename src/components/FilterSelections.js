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
import { appConfig, includeUser } from "../app.config.js";
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
      <div className="filterButtons">
        <SingleSelectField
          label={i18n.t("Filter")}
          className="select"
          selected={filterInfo.prop}
          onChange={(e) => {
            updateFilter({
              uid: filterInfo.id,
              object: {
                ...filterInfo,
                text: "",
                prop: e.selected,
                filterDefinitionOption: filterMap[e.selected].options[0].value,
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
        {filterInfo.prop && (
          <>
            <SingleSelectField
              selected={filterInfo.filterDefinitionOption}
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

        <div className="deleteContainer">
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
            margin-top: 8px;
          }
          .viewCountRange {
            display: flex;
            align-items: flex-end;
            margin: 8px 0px 0px 16px;
          }
          .deleteContainer {
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

const parameterizeVariables = ({ filters, viewCountRange }) => {
  // rethink approach this to make more generalizable
  const variables = {
    favName: "_",
    minCount: -1,
    maxCount: 9223372036854775807,
    userName: "_",
    minDate: "1969-01-01",
    maxDate: "2100-01-01",
    retrieveNevers: 1,
    visTypes: "_",
    dseLower: "1969-01-01",
    dseUpper: "2100-01-01",
  };

  const variableNameMap = {
    name: {
      contains: "favName",
    },
    view_count: {
      gt: "minCount",
      gte: "minCount",
      lt: "maxCount",
      lte: "maxCount",
      nev: "isNever",
    },
    owner: {
      contains: "userName",
    },
    last_viewed: {
      gt: "minDate",
      lt: "maxDate",
    },
    type: {
      eq: "visTypes",
    },
  };

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
    variables.retrieveNevers = 0;
  }
  if (neverPresent && !datePresent) {
    variables.maxDate = "1969-01-01";
  }

  // handle view count range restrictions
  if (viewCountRange.restrictRange) {
    if (viewCountRange.startDate) {
      variables.dseLower = viewCountRange.startDate;
    }
    if (viewCountRange.endDate) {
      variables.dseUpper = viewCountRange.endDate;
    }
  }

  return Object.keys(variables).reduce((allVars, currVar) => {
    return [...allVars, `${currVar}:${variables[currVar]}`];
  }, []);
};

const FilterSelections = ({ fetchData, viewCountRange }) => {
  const engine = useDataEngine();
  const [downloadURL, setDownloadURL] = useState(null);
  const allFilters = [
    { prop: "name", displayName: "name", type: "text", count: 1 },
    { prop: "view_count", displayName: "view count", type: "number", count: 2 },
    { prop: "last_viewed", displayName: "last viewed", type: "date", count: 2 },
    {
      prop: "type",
      displayName: "type",
      type: "enum",
      count: 1,
      allowedValues: [
        { label: "chart", value: "chart" },
        { label: "dashboard", value: "dashboard" },
        { label: "map", value: "map" },
        { label: "pivot", value: "pivot" },
      ],
    },
  ];

  if (includeUser) {
    allFilters.push({
      prop: "owner",
      displayName: "owner",
      type: "textExpanded",
      count: 2,
    });
  }

  const maxFilters = allFilters.reduce((maxFilters, filt) => {
    return maxFilters + filt.count;
  }, 0);

  const filterDefinitionOptions = {
    text: [{ label: "contains", value: "contains" }],
    textExpanded: [
      { label: "contains", value: "contains" },
      { label: "is", value: "eq" },
      { label: "is not", value: "neq" },
    ],
    enum: [{ label: "is", value: "eq" }],
    number: [
      { label: ">", value: "gt" },
      { label: ">=", value: "gte" },
      { label: "<", value: "lt" },
      { label: "<=", value: "lte" },
    ],
    date: [
      { label: "after", value: "gt" },
      { label: "before", value: "lt" },
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
            onClick={() => {
              const variableString = parameterizeVariables({
                filters,
                viewCountRange,
              });
              setDownloadURL(
                `${engine.link.baseUrl}/${engine.link.apiPath}/sqlViews/${
                  appConfig.sqlQuery
                }/data.xls?paging=false&var=${variableString.join(",")}`
              );
              fetchData({
                id: appConfig.sqlQuery,
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
              Download results
            </Button>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .filterControls {
            display: flex;
            margin-top: 16px;
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
  fetchData: PropTypes.function,
  viewCountRange: PropTypes.obj,
};

export default FilterSelections;
