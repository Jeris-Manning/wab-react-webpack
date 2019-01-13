import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import loadLayers from '../utils/loadLayers';

export const WidgetContext = React.createContext();

export const WidgetProvider = ({ wab, esriJS, children }) => {
  // set state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [layers, setLayers] = useState(null);

  // load layers
  const loadMapLyrs = async () => {
    try {
      const lyrs = await loadLayers(
        esriJS,
        wab.map,
        wab.config.layerCollection,
      );
      setLayers(lyrs);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    loadMapLyrs();
  }, []);

  return (
    <WidgetContext.Provider value={{ wab, esriJS, loading, error, layers }}>
      {children}
    </WidgetContext.Provider>
  );
};

WidgetProvider.propTypes = {
  wab: PropTypes.object,
  esriJS: PropTypes.object,
  children: PropTypes.node,
};

WidgetProvider.defaultProps = {
  wab: {},
  esriJS: {},
  children: null,
};
