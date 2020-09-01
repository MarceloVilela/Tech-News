import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text, TouchableOpacity } from './styles';

export default function Button({ children, loading, handleOnPress, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <TouchableOpacity onPress={handleOnPress}>
          <Text>{children}</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  handleOnPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  loading: false,
};
