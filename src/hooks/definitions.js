import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { appearance, box, general, cache } from "../assets/definitions.json";

const placeholder = { appearance, box, general, cache };

const DefinitionsContext = createContext({});

const DefinitionsProvider = ({ children }) => {
  const [data, setData] = useState({
    'appearance_loadImage': 'always',
    'appearance_dimensionCaracter': 'default',
    'appearance_dimensionCaracterArticle': 'default',
    'appearance_letterType': 'default',
    'appearance_darkMode': 'false',
    'box_imageOrientation': 'right',
    'box_theme': 'material',
    'general_recent': true,
    'general_notifications': '12',
    'general_exit': false,
    'general_active': true,
    'general_fullscreen': false,
    'general_adverts': true,
    'general_acceleration': false,
    'general_mobile': true,
    'cache_clearInterval': '72',
    'cache_publicity': 'random',
  });
  const [loading, setLoading] = useState(true);
  const [dataDescription, setDataDescription] = useState({});

  useEffect(() => {
    const keys = Object.keys(data);

    const identifierLabel = keys.map((name) => {
      const [groupDefinition, definition] = name.split('_');

      if (!('options' in placeholder[groupDefinition][definition])) {
        return { name: '' };
      }

      const [option, ...rest] = placeholder[groupDefinition][definition].options
        .filter(item => item.value === data[name]);

      return { [name]: option.label };
    })

    const returnValue = identifierLabel.reduce((acc, c) => {
      return Object.entries(c).reduce((a, [k, v]) => {
        a[k] = (a[k] || []).concat(v)
        return a
      }, acc)
    }, {});

    setDataDescription(returnValue);
  }, [data, setDataDescription]);

  const updateDefinition = useCallback(
    async ({ name, value }) => {
      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );

  return (
    <DefinitionsContext.Provider
      value={{ definitions: data, descriptions: dataDescription, loading, updateDefinition }}>
      {children}
    </DefinitionsContext.Provider>
  );
};

function useDefinitions() {
  const context = useContext(DefinitionsContext);

  if (!context) {
    throw new Error('useDefinitions must be used within an DefinitionsProvider');
  }

  return context;
}

export { DefinitionsProvider, useDefinitions };
