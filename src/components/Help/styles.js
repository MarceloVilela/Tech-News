import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
`;

export const Answered = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Check = styled(Icon).attrs(props => ({
  name: 'check-circle',
  size: 20,
  color: props.answered ? 'green' : '#999',
  // contentContainerStyle: { padding: 30 },
}))``;

export const AnsweredLabel = styled.Text`
  font-weight: bold;
  color: ${props => (props.answered ? 'green' : '#999')};
  font-size: 14px;
`;

export const Time = styled.Text`
  color: #999;
  margin-top: 4px;
  font-size: 14px;
`;

export const Body = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Question = styled.Text`
  color: #999;
  font-size: 14px;
`;
