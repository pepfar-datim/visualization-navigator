import i18n from "@dhis2/d2-i18n";
import {
  IconDashboardWindow16,
  IconLocation16,
  IconVisualizationArea16,
} from "@dhis2/ui";
import React from "react";

export const MAP = "MAP";
export const DASHBOARD = "DASHBOARD";
export const VISUALIZATION = "VISUALIZATION";

export const determineType = (typeString) => {
  const types = [MAP, DASHBOARD, VISUALIZATION];
  for (let i = 0; i < types.length; i++) {
    if (typeString.toUpperCase().includes(types[i])) {
      return types[i];
    }
  }
  if (["PIVOT", "CHART"].includes(typeString.toUpperCase())) {
    return VISUALIZATION;
  }
  return null;
};

export const getOpenIcon = (type) => {
  switch (type) {
    case MAP:
      return <IconLocation16 />;
    case DASHBOARD:
      return <IconDashboardWindow16 />;
    default:
      return <IconVisualizationArea16 />;
  }
};

export const getOpenString = (type) => {
  switch (type) {
    case MAP:
      return i18n.t("Open in maps");
    case DASHBOARD:
      return i18n.t("Open as dashboard");
    default:
      return i18n.t("Open in visualizer");
  }
};

export const getFavLink = (type, baseUrl, id) => {
  switch (type) {
    case MAP:
      return `${baseUrl}/dhis-web-maps/index.html?id=${id}`;
    case DASHBOARD:
      return `${baseUrl}/dhis-web-dashboard/#/${id}`;
    default:
      return `${baseUrl}/dhis-web-data-visualizer/index.html#/${id}`;
  }
};
