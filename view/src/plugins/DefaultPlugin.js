import { useConfig } from "@dhis2/app-runtime";
import { useD2 } from "@dhis2/app-runtime-adapter-d2";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { load, unmount } from "./plugin";

const getVisualizationContainerDomId = (id) => `item-${id}`;

const DefaultPlugin = ({
  item,
  activeType,
  filterVersion,
  visualization,
  options,
  style,
}) => {
  const { d2 } = useD2();
  const { baseUrl } = useConfig();
  const credentials = {
    baseUrl,
    auth: d2.Api.getApi().defaultHeaders.Authorization,
  };

  const prevItem = useRef();
  const prevActiveType = useRef();
  const prevFilterVersion = useRef();

  useEffect(() => {
    load(item, visualization, {
      credentials,
      activeType,
      options,
    });

    prevItem.current = item;
    prevActiveType.current = activeType;
    prevFilterVersion.current = filterVersion;

    return () => unmount(item, item.type || activeType);
  }, []);

  useEffect(() => {
    if (
      prevItem.current === item &&
      (prevActiveType.current !== activeType ||
        prevFilterVersion.current !== filterVersion)
    ) {
      /* Item is the same but type or filters has changed
       * so necessary to reload
       */
      load(item, visualization, {
        credentials,
        activeType,
        options,
      });
    }

    prevItem.current = item;
    prevActiveType.current = activeType;
    prevFilterVersion.current = filterVersion;
  }, [item, visualization, activeType, filterVersion]);

  return <div id={getVisualizationContainerDomId(item.id)} style={style} />;
};

DefaultPlugin.propTypes = {
  activeType: PropTypes.string,
  filterVersion: PropTypes.string,
  item: PropTypes.object,
  options: PropTypes.object,
  style: PropTypes.object,
  visualization: PropTypes.object,
};

DefaultPlugin.defaultProps = {
  style: {},
  item: {},
  options: {},
  visualization: {},
};

export default DefaultPlugin;
