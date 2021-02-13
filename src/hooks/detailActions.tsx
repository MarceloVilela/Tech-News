import React, { createContext, useCallback, useState, useContext } from 'react';

enum EnFontSizes {
  "default" = "default",
  "big" = "big",
  "small" = "small",
  "smaller" = "smaller",
  "bigger" = "bigger"
}

interface ContextDetails {
  //fontSize: "default" | "big" | "small" | "smaller" | "bigger";
  fontSize: EnFontSizes;
  //fontSize: string;
  decreaseFont(): void;
  increaseFont(): void;
  renderMode: string;
  toggleRender(): void;
  shareIsPending: boolean;
  setShareIsPending(param: boolean): void;
}

interface DetailActionsProviderParams {
  children: JSX.Element;
}

const fontSizes = ["smaller", "small", "default", "big", "bigger"];

const DetailActionsContext = createContext({} as ContextDetails);

const DetailActionsProvider = ({ children }: DetailActionsProviderParams) => {
  const [renderMode, setRenderMode] = useState('default');
  const [fontSize, setFontSize] = useState('default' as EnFontSizes); // smaller, small, default, big, bigger
  const [shareIsPending, setShareIsPending] = useState(false);

  const decreaseFont = useCallback(() => {
    const index = fontSizes.findIndex((value) => value === fontSize) - 1;
    if (fontSizes[index]) {
      setFontSize(fontSizes[index] as EnFontSizes);
    }
  }, [fontSize]);

  const increaseFont = useCallback(() => {
    const index = fontSizes.findIndex((value) => value === fontSize) + 1;
    if (fontSizes[index]) {
      setFontSize(fontSizes[index] as EnFontSizes);
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

export { DetailActionsProvider, useDetailActions };
