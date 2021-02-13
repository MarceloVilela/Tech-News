import React from 'react';
import { View } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  style?: object;
}

export default function RadioButton({ selected, style }: RadioButtonProps) {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selected ? '#1B75CB' : '#999',
          alignItems: 'center',
          justifyContent: 'center'
        },
        style
      ]}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#1B75CB'
          }}
        />
      ) : null}
    </View>
  );
}
