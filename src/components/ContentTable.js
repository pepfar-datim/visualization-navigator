import { useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import TextDetailModal from "./TextDetailModal";
import { MAP, DASHBOARD } from "./visualizationTypes";

const transformFromCamelCase = (camelString) => {
  let normalStrings = camelString
    .replace(/([0-9].)/, " " + "$1")
    .split(/(?=[A-Z])/g);
  normalStrings = normalStrings.map(
    (ns) => ns.charAt(0).toUpperCase() + ns.slice(1)
  );
  return normalStrings.join(" ");
};

const extractDataDimensionsGenerator = (getPosition) => {
  const extractDataDimensions = ({
    dimMetadata,
    groupSet,
    dimGroups,
    type,
  }) => {
    const extractedDimensions = [];
    dimMetadata.forEach((dimSet) => {
      dimSet[dimGroups].forEach((dimGroup) => {
        extractedDimensions.push({
          type,
          name: dimSet[groupSet].name,
          item: dimGroup.name,
          uid: dimGroup.id,
          position: getPosition({
            id: dimSet[groupSet].id,
            dimensionType: "dx",
          }),
        });
      });
    });
    return extractedDimensions;
  };
  return extractDataDimensions;
};

const transformData = ({ metadata, type, baseUrl, setText }) => {
  switch (type) {
    case MAP:
      return transformDataStandard(metadata.mapViews[0]);
    case DASHBOARD:
      return transformDataDashboard(metadata, baseUrl, setText);
    default:
      return transformDataStandard(metadata);
  }
};

const transformDataDashboard = (metadata, baseUrl, setText) => {
  const dashboardItems = [];
  metadata.dashboardItems.forEach((di) => {
    const dItem = {};
    dItem.type = di.type.toLowerCase();
    dItem.name = di?.visualization?.name || di?.map?.name || "";
    dItem.uid = di?.visualization?.id || di?.map?.id || di.id;
    dItem.item = (
      <Button
        onClick={() => {
          window.open(`#/view/${dItem.uid}`, "_blank");
        }}
      >
        {i18n.t("Open details")}
      </Button>
    );
    if (dItem.type.toLowerCase() === "text") {
      dItem.name = "";
      dItem.uid = di.id;
      dItem.item = (
        <Button
          onClick={() => {
            setText(di.text);
          }}
        >
          {i18n.t("Display text")}
        </Button>
      );
    }
    if (dItem.type.toLowerCase() === "app") {
      dItem.item = (
        <Button
          onClick={() => {
            window.open(`${baseUrl}/api/dashboardItems/${di.id}`, "_blank");
          }}
        >
          {i18n.t("API details")}
        </Button>
      );
    }
    dashboardItems.push(dItem);
  });
  return dashboardItems;
};

const getPositionGenerator = ({ rows, columns, filterDims, isPivot }) => {
  const getPosition = ({ id, dimensionType }) => {
    if (rows.includes(id)) {
      return isPivot ? "row" : "category";
    }
    if (columns.includes(id)) {
      return isPivot ? "column" : "series";
    }
    if (filterDims.includes(id)) {
      return "filter";
    }
    if (rows.includes(dimensionType)) {
      return isPivot ? "row" : "category";
    }
    if (columns.includes(dimensionType)) {
      return isPivot ? "column" : "series";
    }
    if (filterDims.includes(dimensionType)) {
      return "filter";
    }
    return "";
  };
  return getPosition;
};

const transformDataStandard = (metadata) => {
  const rows = metadata.rows.map((r) => r.id);
  const columns = metadata.columns.map((c) => c.id);
  const filterDims = metadata.filters.map((f) => f.id);
  const isPivot = metadata?.type === "PIVOT_TABLE";
  const getPosition = getPositionGenerator({
    rows,
    columns,
    filterDims,
    isPivot,
  });
  const extractDataDimensions = extractDataDimensionsGenerator(getPosition);

  let catOptGroups = [];
  catOptGroups = extractDataDimensions({
    dimMetadata: metadata.categoryOptionGroupSetDimensions,
    groupSet: "categoryOptionGroupSet",
    dimGroups: "categoryOptionGroups",
    type: "Category Option Group Set",
  });

  let catDimensions = [];
  catDimensions = extractDataDimensions({
    dimMetadata: metadata.categoryDimensions,
    groupSet: "category",
    dimGroups: "categoryOptions",
    type: "Category",
  });

  let organisationUnitGroupSetDimensions = [];
  organisationUnitGroupSetDimensions = extractDataDimensions({
    dimMetadata: metadata.organisationUnitGroupSetDimensions,
    groupSet: "organisationUnitGroupSet",
    dimGroups: "organisationUnitGroups",
    type: "Organisation Unit Group Set",
  });

  let dataElementGroupSets = [];
  dataElementGroupSets = extractDataDimensions({
    dimMetadata: metadata.dataElementGroupSetDimensions,
    groupSet: "dataElementGroupSet",
    dimGroups: "dataElementGroups",
    type: "Data Element Group Set",
  });

  // move these
  const dataDimensionTypes = {
    DATA_ELEMENT: { display: i18n.t("Data Element"), key: "dataElement" },
    DATA_ELEMENT_OPERAND: {
      display: "Data Element Operand",
      key: "dataElementOperand",
    },
    INDICATOR: { display: i18n.t("Indicator"), key: "indicator" },
    REPORTING_RATE: {
      display: i18n.t("Reporting Rate"),
      key: "reportingRate",
      type: "Reporting Rate",
    },
    PROGRAM_DATA_ELEMENT: {
      display: i18n.t("Data Element"),
      key: "programDataElement",
      type: "Event Data Item",
    },
  };
  const reportingRateMap = {
    REPORTING_RATE: "Reporting rates",
    REPORTING_RATE_ON_TIME: "Reporting rates on time",
    ACTUAL_REPORTS: "Actual reporting rates",
    ACTUAL_REPORTS_ON_TIME: "Actual reporting rates on time",
    EXPECTED_REPORTS: "Expected Reports",
  };
  const getUID = (ddi, ddiKey) => {
    if (ddi.dataDimensionItemType === "REPORTING_RATE") {
      return ddi[ddiKey].id + "_" + ddi[ddiKey].metric;
    }
    if (ddi.dataDimensionItemType === "PROGRAM_DATA_ELEMENT") {
      return ddi[ddiKey].dataElement.id;
    }
    return ddi[ddiKey].id;
  };
  const datDimensions = [];
  metadata.dataDimensionItems.forEach((ddi) => {
    const ddiKey = dataDimensionTypes[ddi.dataDimensionItemType].key;

    datDimensions.push({
      type: dataDimensionTypes[ddi.dataDimensionItemType]?.type || "Data",
      name: ddi[ddiKey].metric
        ? reportingRateMap[ddi[ddiKey].metric]
        : dataDimensionTypes[ddi.dataDimensionItemType].display,
      item: ddi[ddiKey].name,
      uid: getUID(ddi, ddiKey),
      position: getPosition({ id: null, dimensionType: "dx" }),
    });
  });

  let relativePeriods = Object.keys(metadata?.relativePeriods || {}).filter(
    (p) => metadata.relativePeriods[p]
  );
  relativePeriods = relativePeriods.map((p) => ({
    type: "Period",
    name: "Relative",
    item: transformFromCamelCase(p),
    uid: "",
    position: getPosition({ id: p?.id, dimensionType: "pe" }),
  }));

  let periods = [];
  periods = metadata.periods.map((pe) => ({
    type: "Periods",
    name: "Exact",
    item: pe.name,
    uid: "",
    position: getPosition({ id: pe?.id, dimensionType: "pe" }),
  }));

  let organisationUnitLevels = [];
  organisationUnitLevels = metadata.organisationUnitLevels.map((oul) => ({
    type: "Organisation Units",
    name: "Level",
    item: oul,
    uid: "",
    position: getPosition({ id: oul?.id, dimensionType: "ou" }),
  }));

  let organisationUnitGroups = [];
  organisationUnitGroups = metadata.itemOrganisationUnitGroups.map((oug) => ({
    type: "Organisation Units",
    name: "Group",
    item: oug.name,
    uid: oug.id,
    position: getPosition({ id: oug?.id, dimensionType: "ou" }),
  }));

  let organisationUnits = [];
  organisationUnits = metadata.organisationUnits.map((ou) => ({
    type: "Organisation Units",
    name: "Org Unit",
    item: ou.name,
    uid: ou.id,
    position: getPosition({ id: ou?.id, dimensionType: "ou" }),
  }));

  const relativeOrgUnitTemplate = {
    type: "Organisation Units",
    name: "Relative",
    item: "",
    uid: "",
  };

  const userOrganisationUnit = metadata.userOrganisationUnit
    ? [
        {
          ...relativeOrgUnitTemplate,
          item: "User Org Unit",
          position: getPosition({ id: null, dimensionType: "ou" }),
        },
      ]
    : [];

  const userOrganisationUnitChildren = metadata.userOrganisationUnitChildren
    ? [
        {
          ...relativeOrgUnitTemplate,
          item: "User Org Unit Children",
          position: getPosition({ id: null, dimensionType: "ou" }),
        },
      ]
    : [];

  const userOrganisationUnitGrandchildren =
    metadata.userOrganisationUnitGrandchildren
      ? [
          {
            ...relativeOrgUnitTemplate,
            item: "User Org Unit Grandchildren",
            position: getPosition({ id: null, dimensionType: "ou" }),
          },
        ]
      : [];

  const programIndicatorDimensions = metadata.programIndicatorDimensions.map(
    (pi) => ({
      type: "Data",
      name: "Program Indicator",
      item: `${pi.program.name}: ${pi.name}`,
      position: getPosition({ id: pi?.id, dimensionType: "dx" }),
    })
  );

  const returnData = [
    ...relativePeriods,
    ...periods,
    ...datDimensions,
    ...programIndicatorDimensions,
    ...catDimensions,
    ...catOptGroups,
    ...organisationUnits,
    ...organisationUnitLevels,
    ...organisationUnitGroups,
    ...userOrganisationUnit,
    ...userOrganisationUnitChildren,
    ...userOrganisationUnitGrandchildren,
    ...organisationUnitGroupSetDimensions,
    ...dataElementGroupSets,
  ];

  return returnData;
};

const ContentTable = ({ metadata, type }) => {
  const [text, setText] = useState(null);
  const engine = useDataEngine();
  const headers = ["type", "name", "item", "uid", "position"];
  const headersDashboard = ["type", "name", "item", "uid"];
  return (
    <>
      {text && <TextDetailModal setText={setText} text={text} />}
      <div className="contentTableContainer">
        <h3>
          {type === DASHBOARD
            ? i18n.t("Dashboard items")
            : i18n.t("Dimensions")}
        </h3>
        <Table>
          <TableHead>
            <TableRowHead>
              {type === DASHBOARD
                ? headersDashboard.map((h) => (
                    <TableCellHead key={`header_${h}`}>
                      {i18n.t(h)}
                    </TableCellHead>
                  ))
                : headers.map((h) => (
                    <TableCellHead key={`header_${h}`}>
                      {i18n.t(h)}
                    </TableCellHead>
                  ))}
            </TableRowHead>
          </TableHead>
          <TableBody>
            {transformData({
              metadata,
              type,
              baseUrl: engine.link.baseUrl,
              setText,
            }).map((d) => (
              <TableRow
                key={`row_${d.uid || d.item.toString().replace(/\s/g, "_")}`}
              >
                {headers
                  .filter((h) => h !== "used elsewhere")
                  .map((h) => (
                    <TableCell key={`cell_${d.uid}_${h}`}>
                      {h === "uid" ? d[h].substring(0, 11) : d[h]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <style jsx>{`
        .contentTableContainer {
          margin: var(--spacers-dp16);
        }
      `}</style>
    </>
  );
};

ContentTable.propTypes = {
  metadata: PropTypes.object,
  type: PropTypes.string,
};

export default ContentTable;
