import { useDataQuery, useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  Card,
  Field,
  IconArrowLeft24,
  IconCalendar16,
  IconView16,
  IconVisualizationArea16,
  Input,
  Tag,
} from "@dhis2/ui";
import React, { useState } from "react";
import { appConfig } from "./app.config.js";
import ContentTable from "./ContentTable";
import VisualizationItemPlugin from "./VisualizationItemPlugin";

const visualizationQuery = {
  visualizationDetail: {
    resource: "charts",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "name",
        "createdBy[name,username]",
        "categoryOptionGroupSetDimensions[categoryOptionGroupSet[id,name],categoryOptionGroups[id,name]]",
        "categoryDimensions[category[id,name],categoryOptions[id,name]]",
        "dataDimensionItems[dataDimensionItemType,dataElement[id,name],indicator[id,name],dataElementOperand[id,name]]",
        "relativePeriods",
        "organisationUnits[id,name]",
        "organisationUnitLevels",
        "userOrganisationUnit",
        "organisationUnitGroupSetDimensions[organisationUnitGroupSet[id,name],organisationUnitGroups[id,name]]",
        "programIndicatorDimensions[id,name,program[id,name]]",
        "dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]]",
      ],
    },
  },
  visualizationViews: {
    resource: "sqlViews",
    id: ({ sqlViewCountID }) => `${sqlViewCountID}/data`,
    params: ({ id }) => ({
      var: `uid:${id}`,
      paging: false,
    }),
  },
};

const DetailField = ({ k, value, disabled }) => {
  return (
    <>
      <div className="fieldContainer">
        <Field label={k}>
          <Input disabled={disabled ? true : false} value={value} />
        </Field>
      </div>
      <style jsx>
        {`
          .fieldContainer {
            margin: 8px;
            width: 500px;
          }
        `}
      </style>
    </>
  );
};

const ItemDetails = ({ id, metadata }) => {
  return (
    <>
      <div className="cardContainer">
        <Card>
          <div className="topInnerContainer">
            <div>
              <DetailField k="name" value={metadata.name} />
              <DetailField
                k="owner"
                disabled
                value={`${metadata.createdBy.name} (${metadata.createdBy.username})`}
              />
            </div>
            <div className="visualizationPluginContainer">
              <VisualizationItemPlugin id={id} />
            </div>
          </div>
          <ContentTable metadata={metadata} />
          <div className="footerNavigation">
            <div className="footerButtons">
              <ButtonStrip>
                <Button destructive>{i18n.t("Delete")}</Button>
                <Button>{i18n.t("Cancel")}</Button>
                <Button primary>{i18n.t("Save")}</Button>
              </ButtonStrip>
            </div>
          </div>
        </Card>
      </div>
      <style jsx>
        {`
          .cardContainer {
            width: 95%;
            margin: auto;
          }
          .topInnerContainer {
            display: flex;
          }
          .footerNavigation {
            margin: 16px 16px 16px 0px;
            display: flex;
            align-items: center;
          }
          .footerButtons {
            margin-left: auto;
          }
          .visualizationPluginContainer {
            width: 500px;
            margin: 40px 0px 20px 10px;
            padding: 10px;
            border: 1px solid grey;
          }
        `}
      </style>
    </>
  );
};

const ViewContent = ({ id }) => {
  const engine = useDataEngine();
  const { data, loading, error } = useDataQuery(visualizationQuery, {
    variables: { id, sqlViewCountID: appConfig.sqlViewCountID },
  });

  return (
    <>
      {data && (
        <>
          <div className="viewHeader">
            <Button
              icon={<IconArrowLeft24 />}
              onClick={() => {
                window.location.href = "/";
              }}
            />
            <h2>{data.visualizationDetail.name}</h2>
            <div>
              <Button
                icon={<IconVisualizationArea16 />}
                onClick={() => {
                  window.open(
                    `${engine.link.baseUrl}/dhis-web-data-visualizer/index.html#/${id}`,
                    "_blank"
                  );
                }}
              >
                {i18n.t("Open in visualizer")}
              </Button>
            </div>
            <div>
              <Tag icon={<IconView16 />}>
                {i18n.t("viewed {{view_count}} times", {
                  view_count: data.visualizationViews.listGrid.rows[0][1] || 0,
                })}
              </Tag>
            </div>
            <div>
              <Tag icon={<IconCalendar16 />}>
                {i18n.t("last viewed: {{view_date}}", {
                  view_date: data.visualizationViews.listGrid.rows[0][2]
                    ? data.visualizationViews.listGrid.rows[0][2].substring(
                        0,
                        10
                      )
                    : i18n.t("never"),
                })}
              </Tag>
            </div>
          </div>
          <ItemDetails id={id} metadata={data.visualizationDetail} />
        </>
      )}
      <style jsx>
        {`
          .viewHeader {
            margin: 16px;
            display: flex;
            align-items: center;
          }
          .viewHeader * {
            padding-left: 16px;
          }
        `}
      </style>
    </>
  );
};

export default ViewContent;
