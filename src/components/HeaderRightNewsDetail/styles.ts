import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StyledPropsActionProps {
  name: string;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  padding-right: 15px;
`;

export const Action = styled(Icon).attrs((props: StyledPropsActionProps) => ({
  name: props.name,
  size: 25,
  color: '#FFF'
}))`
  margin: 0;
  margin-left: 20px;
`;
