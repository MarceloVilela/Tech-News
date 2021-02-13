import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Wrap, WrapLoading } from './styles';

interface ContainerProps {
  children: JSX.Element;
  loading?: boolean;
  scrollEnabled?: boolean;
  style?: object;
}

export default function Container({ children, loading = false, scrollEnabled = false, style = {} }: ContainerProps) {
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
