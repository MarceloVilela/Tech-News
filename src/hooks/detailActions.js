import React, { createContext, useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import values from '../styles';

const fontSizes = Object.keys(values.fontParagraph);

const DetailActionsContext = createContext({});

const DetailActionsProvider = ({ children }) => {
  const [renderMode, setRenderMode] = useState('default');
  const [fontSize, setFontSize] = useState('default'); // smaller, small, default, big, bigger
  const [shareIsPending, setShareIsPending] = useState(false);

  const decreaseFont = useCallback(() => {
    const index = fontSizes.findIndex((value) => value === fontSize) - 1;
    if (fontSizes[index]) {
      setFontSize(fontSizes[index]);
    }
  }, [fontSize]);

  const increaseFont = useCallback(() => {
    const index = fontSizes.findIndex((value) => value === fontSize) + 1;
    if (fontSizes[index]) {
      setFontSize(fontSizes[index]);
    }
  }, [fontSize]);

  const toggleRender = useCallback(() => {
    setRenderMode(renderMode === 'default' ? 'webview' : 'default');
  }, [renderMode]);

  return (
    <DetailActionsContext.Provider
      value={{
        fontSize,
        decreaseFont,
        increaseFont,
        renderMode,
        toggleRender,
        shareIsPending,
        setShareIsPending
      }}
    >
      {children}
    </DetailActionsContext.Provider>
  );
};

function useDetailActions() {
  const context = useContext(DetailActionsContext);

  if (!context) {
    throw new Error('useDetailActions must be used within an DetailActionsProvider');
  }

  return context;
}

DetailActionsProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { DetailActionsProvider, useDetailActions };
