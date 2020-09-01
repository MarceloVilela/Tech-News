import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #0c6eb5;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  /*background: black;*/
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
