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

const transformFromCamelCase = (camelString) => {
  let normalStrings = camelString
    .replace(/([0-9].)/, " " + "$1")
    .split(/(?=[A-Z])/g);
  normalStrings = normalStrings.map(
    (ns) => ns.charAt(0).toUpperCase() + ns.slice(1)
  );
  return normalStrings.join(" ");
};

const extractDataDimensions = ({ dimMetadata, groupSet, dimGroups, type }) => {
  const extractedDimensions = [];
  dimMetadata.forEach((dimSet) => {
    dimSet[dimGroups].forEach((dimGroup) => {
      extractedDimensions.push({
        type,
        name: dimSet[groupSet].name,
        item: dimGroup.name,
        uid: dimGroup.id,
      });
    });
  });
  return extractedDimensions;
};

const transformData = ({ metadata, type, baseUrl, setText }) => {
  switch (type) {
    case "map":
      return transformDataStandard(metadata.mapViews[0]);
    case "dashboard":
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
    dashboardItems.push(dItem);
  });
  return dashboardItems;
};

const transformDataStandard = (metadata) => {
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
  }));

  let periods = [];
  periods = metadata.periods.map((pe) => ({
    type: "Periods",
    name: "Exact",
    item: pe.name,
    uid: "",
  }));

  let organisationUnitLevels = [];
  organisationUnitLevels = metadata.organisationUnitLevels.map((oul) => ({
    type: "Organisation Units",
    name: "Level",
    item: oul,
    uid: "",
  }));

  let organisationUnitGroups = [];
  organisationUnitGroups = metadata.itemOrganisationUnitGroups.map((oug) => ({
    type: "Organisation Units",
    name: "Group",
    item: oug.name,
    uid: oug.id,
  }));

  let organisationUnits = [];
  organisationUnits = metadata.organisationUnits.map((ou) => ({
    type: "Organisation Units",
    name: "Org Unit",
    item: ou.name,
    uid: ou.id,
  }));

  const relativeOrgUnitTemplate = {
    type: "Organisation Units",
    name: "Relative",
    item: "",
    uid: "",
  };

  const userOrganisationUnit = metadata.userOrganisationUnit
    ? [{ ...relativeOrgUnitTemplate, item: "User Org Unit" }]
    : [];

  const userOrganisationUnitChildren = metadata.userOrganisationUnitChildren
    ? [{ ...relativeOrgUnitTemplate, item: "User Org Unit Children" }]
    : [];

  const userOrganisationUnitGrandchildren =
    metadata.userOrganisationUnitGrandchildren
      ? [{ ...relativeOrgUnitTemplate, item: "User Org Unit Grandchildren" }]
      : [];

  const programIndicatorDimensions = metadata.programIndicatorDimensions.map(
    (pi) => ({
      type: "Data",
      name: "Program Indicator",
      item: `${pi.program.name}: ${pi.name}`,
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
  const headers = ["type", "name", "item", "uid"];
  return (
    <>
      {text && <TextDetailModal setText={setText} text={text} />}
      <div className="contentTableContainer">
        <h3>
          {type === "dashboard"
            ? i18n.t("Dashboard items")
            : i18n.t("Dimensions")}
        </h3>
        <Table>
          <TableHead>
            <TableRowHead>
              {headers.map((h) => (
                <TableCellHead key={`header_${h}`}>{i18n.t(h)}</TableCellHead>
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