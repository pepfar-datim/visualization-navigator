import i18n from "@dhis2/d2-i18n";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

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

const transformData = (metadata) => {
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

  const dataDimensionTypes = {
    DATA_ELEMENT: { display: i18n.t("Data Element"), key: "dataElement" },
    DATA_ELEMENT_OPERAND: {
      display: "Data Element Operand",
      key: "dataElementOperand",
    },
    INDICATOR: { display: i18n.t("Indicator"), key: "indicator" },
  };
  const datDimensions = [];
  metadata.dataDimensionItems.forEach((ddi) => {
    const ddiKey = dataDimensionTypes[ddi.dataDimensionItemType].key;

    datDimensions.push({
      type: "Data",
      name: dataDimensionTypes[ddi.dataDimensionItemType].display,
      item: ddi[ddiKey].name,
      uid: ddi[ddiKey].id,
    });
  });

  let relativePeriods = Object.keys(metadata.relativePeriods).filter(
    (p) => metadata.relativePeriods[p]
  );
  relativePeriods = relativePeriods.map((p) => ({
    type: "Period",
    name: "Relative",
    item: transformFromCamelCase(p),
    uid: "",
  }));

  let organisationUnitLevels = [];
  organisationUnitLevels = metadata.organisationUnitLevels.map((oul) => ({
    type: "Organisation Units",
    name: "Level",
    item: oul,
    uid: "",
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

  return [
    ...relativePeriods,
    ...datDimensions,
    ...programIndicatorDimensions,
    ...catDimensions,
    ...catOptGroups,
    ...organisationUnits,
    ...organisationUnitLevels,
    ...userOrganisationUnit,
    ...userOrganisationUnitChildren,
    ...userOrganisationUnitGrandchildren,
    ...organisationUnitGroupSetDimensions,
  ];
};

const ContentTable = ({ metadata }) => {
  const headers = ["type", "name", "item", "uid"];
  return (
    <>
      <div className="contentTableContainer">
        <h3>{i18n.t("Dimensions")}</h3>
        <Table>
          <TableHead>
            <TableRowHead>
              {headers.map((h) => (
                <TableCellHead key={`header_${h}`}>{i18n.t(h)}</TableCellHead>
              ))}
            </TableRowHead>
          </TableHead>
          <TableBody>
            {transformData(metadata).map((d) => (
              <TableRow key={`row_${d.uid || d.item.replace(/\s/g, "_")}`}>
                {headers
                  .filter((h) => h !== "used elsewhere")
                  .map((h) => (
                    <TableCell key={`cell_${d.uid}_${h}`}>{d[h]}</TableCell>
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

/*
                <TableCell key={`cell_${d.uid}_otherButton`}>
                  <Button icon={<IconSearch16 />}>
                    {i18n.t("Other favorites using this item")}
                  </Button>
                </TableCell>
*/

ContentTable.propTypes = {
  metadata: PropTypes.object,
};

export default ContentTable;
