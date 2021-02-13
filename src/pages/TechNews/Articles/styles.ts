import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const List = styled(Animated.FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 }
})`
  padding-top: 10px;
  padding-bottom: 20px;
`;
