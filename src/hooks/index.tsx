import React from 'react';
import PropTypes from 'prop-types';

import { DefinitionsProvider } from './definitions';
import { DetailActionsProvider } from './detailActions';

interface AppProviderParams {
  children: JSX.Element;
}

const AppProvider = ({ children }: AppProviderParams) => (
  <DefinitionsProvider>
    <DetailActionsProvider>{children}</DetailActionsProvider>
  </DefinitionsProvider>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppProvider;
