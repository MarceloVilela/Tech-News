import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 24px;
  padding: 0;
  border: 1px solid #eee;
`;

export const ScrollView = styled.ScrollView`
  background-color: blue;
  background-color: ${(props) => props.theme.background300};
  padding-horizontal: 8px;
  padding-top: 16px;
  padding-bottom: 120px;
`;

export const ActionsWrapper = styled.View`
  background-color: black;
  background-color: ${(props) => props.theme.background300};
  padding: 8px;
  height: 120px;
  justify-content: space-between;
`;

export const Button = styled.Button`
  color: ${(props) => props.theme.primary600};
  color: yellow;
  background-color: yellow;
`;

export const Small = styled.Text`
  /*font-weight: bold;*/
  font-size: 12px;
  font-weight: 400;
  color: yellow;
  flex: 1;
`;
