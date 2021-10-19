export const sqlQuery = {
  sqlData: {
    resource: "sqlViews",
    id: ({ id }) => `${id}/data`,
    params: ({ queryVariables }) => ({
      var: queryVariables,
      paging: false,
    }),
  },
};

export const typeQuery = {
  type: {
    resource: "identifiableObjects",
    id: ({ id }) => id,
    params: {
      fields: ["href"],
    },
  },
};

export const visualizationQuery = {
  visualizationDetail: {
    resource: "visualizations",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "name",
        "createdBy[name,username]",
        "categoryOptionGroupSetDimensions[categoryOptionGroupSet[id,name],categoryOptionGroups[id,name]]",
        "categoryDimensions[category[id,name],categoryOptions[id,name]]",
        "dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]]",
        "dataDimensionItems[dataDimensionItemType,dataElement[id,name],indicator[id,name],dataElementOperand[id,name],reportingRate[dataSet[id,name],id,name,metric],programDataElement[dataElement[id],name]]",
        "itemOrganisationUnitGroups[id,name]",
        "relativePeriods",
        "periods[id,name]",
        "organisationUnits[id,name]",
        "organisationUnitLevels",
        "userOrganisationUnit",
        "userOrganisationUnitChildren",
        "userOrganisationUnitGrandchildren",
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
      fields: ["listGrid"],
    }),
  },
  sharing: {
    resource: "sharing",
    params: ({ id }) => ({
      type: "visualization",
      id: id,
      fields: ["meta", "object"],
    }),
  },
};

export const mapQuery = {
  visualizationDetail: {
    resource: "maps",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "displayName~rename(name)",
        "displayDescription~rename(description)",
        "columns[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]",
        "rows[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]",
        "filters[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]",
        `mapViews[
          categoryOptionGroupSetDimensions[categoryOptionGroupSet[id,name],categoryOptionGroups[id,name]],
          categoryDimensions[category[id,name],categoryOptions[id,name]],
          dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]],
          dataDimensionItems[dataDimensionItemType,dataElement[id,name],indicator[id,name],dataElementOperand[id,name],reportingRate[dataSet[id,name],id,name,metric],programDataElement[dataElement[id],name]],
          itemOrganisationUnitGroups[id,name],
          relativePeriods,
          periods[id,name],
          organisationUnits[id,name],
          organisationUnitLevels,
          userOrganisationUnit,
          userOrganisationUnitChildren,
          userOrganisationUnitGrandchildren,
          organisationUnitGroupSetDimensions[organisationUnitGroupSet[id,name],organisationUnitGroups[id,name]],
          programIndicatorDimensions[id,name,program[id,name]],
          dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]],
          layer
        ]`,
        "*",
        "!attributeDimensions",
        "!attributeValues",
        "!category",
        "!categoryDimensions",
        "!categoryOptionGroupSetDimensions",
        "!columnDimensions",
        "!dataDimensionItems",
        "!dataElementDimensions",
        "!dataElementGroupSetDimensions",
        "!filterDimensions",
        "!itemOrganisationUnitGroups",
        "!lastUpdatedBy",
        "!organisationUnitGroupSetDimensions",
        "!organisationUnitLevels",
        "!organisationUnits",
        "!programIndicatorDimensions",
        "!relativePeriods",
        "!reportParams",
        "!rowDimensions",
        "!translations",
        "!userOrganisationUnit",
        "!userOrganisationUnitChildren",
        "!userOrganisationUnitGrandChildren",
      ],
    },
  },
  visualizationViews: {
    resource: "sqlViews",
    id: ({ sqlViewCountID }) => `${sqlViewCountID}/data`,
    params: ({ id }) => ({
      var: `uid:${id}`,
      paging: false,
      fields: ["listGrid"],
    }),
  },
  sharing: {
    resource: "sharing",
    params: ({ id }) => ({
      type: "map",
      id: id,
      fields: ["meta", "object"],
    }),
  },
};

export const dashboardQuery = {
  visualizationDetail: {
    resource: "dashboards",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "name",
        "createdBy[name,username]",
        "dashboardItems[id,type,visualization[id,name],map[id,name],text]",
      ],
    },
  },
  visualizationViews: {
    resource: "sqlViews",
    id: ({ sqlViewCountID }) => `${sqlViewCountID}/data`,
    params: ({ id }) => ({
      var: `uid:${id}`,
      paging: false,
      fields: ["listGrid"],
    }),
  },
};

export const deleteMutation = {
  resource: "visualizations",
  id: ({ id }) => id,
  type: "delete",
};

export const saveMutation = {
  resource: "visualizations",
  id: ({ id }) => id,
  type: "update",
  partial: true,
  data: ({ data }) => data,
};

export const deleteMapMutation = {
  resource: "maps",
  id: ({ id }) => id,
  type: "delete",
};

export const saveMapMutation = {
  resource: "maps",
  id: ({ id }) => id,
  type: "update",
  partial: true,
  data: ({ data }) => data,
};

export const deleteDashboardMutation = {
  resource: "dashboards",
  id: ({ id }) => id,
  type: "delete",
};

export const saveDashboardMutation = {
  resource: "dashboards",
  id: ({ id }) => id,
  type: "update",
  partial: true,
  data: ({ data }) => data,
};
