import React from 'react';
import { Switch } from 'react-native';

export default function SwitchStyled({
  isEnabled,
  ...rest
}) {
  return (
    <Switch
      {...rest}
      trackColor={{ false: "#ccc", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#81b0ff" : "#ccc"}
      ios_backgroundColor="#fff"
    />
  );
}

