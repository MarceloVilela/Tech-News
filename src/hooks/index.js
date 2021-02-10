import React from 'react';
import PropTypes from 'prop-types';

import { DefinitionsProvider } from './definitions';
import { DetailActionsProvider } from './detailActions';

const AppProvider = ({ children }) => (
  <DefinitionsProvider>
    <DetailActionsProvider>{children}</DetailActionsProvider>
  </DefinitionsProvider>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppProvider;
