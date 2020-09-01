import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  /*background: rgba(0, 0, 0, 0.1);*/
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#999',
  ...props,
}))`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #999;
`;
