import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Wrap, WrapLoading } from './styles';

export default function Container({ children, loading, scrollEnabled, style }) {
  return (
    <Wrap scrollEnabled={scrollEnabled} style={style}>
      {loading && (
        <WrapLoading>
          <ActivityIndicator size="large" color="#6666FF" style={{ zIndex: 9999, opacity: 1 }} />
        </WrapLoading>
      )}
      <>{children}</>
    </Wrap>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  // onPress: PropTypes.func.isRequired,
  scrollEnabled: PropTypes.bool,
  style: PropTypes.object,
};

Container.defaultProps = {
  loading: false,
  scrollEnabled: false,
  style: {},
};
