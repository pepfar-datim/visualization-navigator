import { useDataQuery } from "@dhis2/app-runtime";
import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import i18n from "@dhis2/d2-i18n";
import "./locales";
import {
  Button,
  ButtonStrip,
  CssVariables,
  CircularLoader,
  IconAddCircle16,
  IconDelete16,
  IconSearch16,
  InputField,
  SingleSelectField,
  SingleSelectOption,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { appConfig, includeUser } from "./app.config.js";
import classes from "./App.module.css";
import FavoritesTable from "./FavoritesTable";
import ViewContent from "./ViewContent";

const sqlQuery = {
  sqlData: {
    resource: "sqlViews",
    id: ({ id }) => `${id}/data`,
    params: ({ queryVariables }) => ({
      var: queryVariables,
      paging: false,
    }),
  },
};

const generateUID = (idLength) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHJIKLKMNOPQRSTUVWXYZ";
  let uid = "";
  for (let i = 0; i < idLength; i++) {
    uid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uid;
};

const FilterInputFields = ({ filterInfo, updateFilter, filterMap }) => {
  switch (filterMap[filterInfo.prop].type) {
    case "date":
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
            margin-left: 16px;
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

const parameterizeVariables = ({ filters }) => {
  // rethink approach this to make more generalizable
  const variables = {
    favName: "_",
    minCount: -1,
    maxCount: 9223372036854775807,
    userName: "_",
    minDate: "1969-01-01",
    maxDate: "2100-01-01",
  };

  const variableNameMap = {
    name: {
      contains: "favName",
    },
    view_count: {
      gt: "minCount",
      lt: "maxCount",
    },
    owner: {
      contains: "userName",
    },
    last_viewed: {
      gt: "minDate",
      lt: "maxDate",
    },
  };

  filters.forEach((filt) => {
    if (
      variableNameMap[filt.prop] &&
      variableNameMap[filt.prop][filt.filterDefinitionOption]
    ) {
      variables[variableNameMap[filt.prop][filt.filterDefinitionOption]] =
        filt.text;
    }
  });

  return Object.keys(variables).reduce((allVars, currVar) => {
    return [...allVars, `${currVar}:${variables[currVar]}`];
  }, []);
};

const FilterSelections = ({ fetchData }) => {
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
        { label: "map", value: "map" },
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
              fetchData({
                id: appConfig.sqlQuery,
                queryVariables: parameterizeVariables({ filters }),
              });
            }}
          >
            {i18n.t("Execute search")}
          </Button>
        </ButtonStrip>
      </div>
      <style jsx>
        {`
          .filterControls {
            margin-top: 16px;
          }
        `}
      </style>
    </>
  );
};

FilterSelections.propTypes = {
  fetchData: PropTypes.function,
};

const SearchPage = () => {
  const { data, loading, error, refetch } = useDataQuery(sqlQuery, {
    lazy: true,
  });
  return (
    <>
      <div className={classes.containerSearch}>
        <h2>{i18n.t("Search visualization items")}</h2>
        {refetch && <FilterSelections fetchData={refetch} />}
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
          .statusContainer {
            margin: var(--spacers-dp16);
          }
        `}
      </style>
    </>
  );
};

const ViewPage = ({ match }) => {
  const id = match.params.id;
  return (
    <div className={classes.container}>
      <ViewContent id={id} />
    </div>
  );
};

ViewPage.propTypes = {
  match: PropTypes.object,
};

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

  return (
    <>
      <CssVariables colors spacers />
      <D2Shim d2Config={d2Config} i18nRoot="./i18n">
        {({ d2 }) => {
          if (!d2) {
            // TODO: Handle errors in d2 initialization
            return null;
          }
          return (
            <Router>
              <Switch>
                <Route path="/view/:id" component={ViewPage} />
                <Route>
                  <SearchPage />
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
