import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  IconSearch16,
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
} from "@dhis2/ui";
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
  let extractedDimensions = [];
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
  let datDimensions = [];
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

  let userOrganisationUnit = metadata.userOrganisationUnit
    ? [
        {
          type: "Organisation Units",
          name: "Relative",
          item: "User Org Unit",
          uid: "",
        },
      ]
    : [];

  let programIndicatorDimensions = metadata.programIndicatorDimensions.map(
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
    ...organisationUnitGroupSetDimensions,
  ];
};

const ContentTable = ({ metadata }) => {
  const headers = ["type", "name", "item", "uid", "used elsewhere"];
  return (
    <>
      <div className="contentTableContainer">
        <h3>{i18n.t("Dimensions")}</h3>
        <Table>
          <TableHead>
            <TableRowHead>
              {headers.map((h) => (
                <TableCellHead>{i18n.t(h)}</TableCellHead>
              ))}
            </TableRowHead>
          </TableHead>
          <TableBody>
            {transformData(metadata).map((d) => (
              <TableRow>
                {headers
                  .filter((h) => h !== "used elsewhere")
                  .map((h) => (
                    <TableCell>{d[h]}</TableCell>
                  ))}
                <TableCell>
                  <Button icon={<IconSearch16 />}>
                    Other favorites using this item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <style jsx>{`
        .contentTableContainer {
          width: 95%;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default ContentTable;
