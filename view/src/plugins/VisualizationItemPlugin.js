import { useDataQuery } from "@dhis2/app-runtime";
import PropTypes from "prop-types";
import React, { useState, useCallback, Suspense } from "react";

const VisualizationPlugin = React.lazy(() =>
  import("@dhis2/data-visualizer-plugin")
);

const visualizationQuery = {
  visualization: {
    resource: "visualizations/",
    id: ({ id }) => id,
    params: {
      fields:
        "displayName~rename(name),displayDescription~rename(description),columns[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],rows[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],filters[dimension,legendSet[id],filter,programStage,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],*,!attributeDimensions,!attributeValues,!category,!categoryDimensions,!categoryOptionGroupSetDimensions,!columnDimensions,!dataDimensionItems,!dataElementDimensions,!dataElementGroupSetDimensions,!filterDimensions,!itemOrganisationUnitGroups,!lastUpdatedBy,!organisationUnitGroupSetDimensions,!organisationUnitLevels,!organisationUnits,!programIndicatorDimensions,!relativePeriods,!reportParams,!rowDimensions,!translations,!userOrganisationUnit,!userOrganisationUnitChildren,!userOrganisationUnitGrandChildren",
    },
  },
};

const VisualizationItemPlugin = ({ id }) => {
  //const { userSettings } = useUserSettings()
  const [visualizationLoaded, setVisualizationLoaded] = useState(true);
  //const [error, setError] = useState(false)

  const { data } = useDataQuery(visualizationQuery, {
    variables: { id },
  });

  const onLoadingComplete = useCallback(() => setVisualizationLoaded(true), []);
  const userSettings = {
    keyUiLocale: "en",
    keyAnalysisDisplayProperty: "shortName",
    displayProperty: "shortName",
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <>
      {data && (
        <Suspense fallback={<div />}>
          {
            !visualizationLoaded && (
              <div>
                <span>LoadingMask</span>
              </div>
            ) /*<LoadingMask style={style} />*/
          }
          <div /*className={classes.wrapper}*/>
            <VisualizationPlugin
              visualization={data.visualization}
              style={{ height: 450, width: 450 }}
              forDashboard={true}
              userSettings={userSettings}
              onLoadingComplete={onLoadingComplete}
              onError={onError}
            />
          </div>
        </Suspense>
      )}
    </>
  );
};

VisualizationItemPlugin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default VisualizationItemPlugin;
