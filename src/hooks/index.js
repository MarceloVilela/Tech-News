import React from 'react';

import { DefinitionsProvider } from './definitions';
import { DetailActionsProvider } from './detailActions';

const AppProvider = ({ children }) => (
  <DefinitionsProvider>
    <DetailActionsProvider>
      {children}
    </DetailActionsProvider>
  </DefinitionsProvider>
);

export default AppProvider;
