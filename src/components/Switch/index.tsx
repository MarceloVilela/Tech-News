import React from 'react';
import { Switch } from 'react-native';
import PropTypes from 'prop-types';

interface SwitchStyledProps {
  isEnabled: boolean;
  onValueChange(): void;
  value: boolean | undefined;
}

export default function SwitchStyled({ isEnabled, onValueChange, value }: SwitchStyledProps) {
  return (
    <Switch
      onValueChange={onValueChange}
      value={value}
      trackColor={{ false: '#ccc', true: '#81b0ff' }}
      thumbColor={isEnabled ? '#81b0ff' : '#ccc'}
      ios_backgroundColor="#fff"
    />
  );
}

SwitchStyled.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

