import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StyledPropsActionSelect {
  name: string;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

export const ActionSelect = styled(Icon).attrs((props: StyledPropsActionSelect) => ({
  name: props.name,
  size: 25,
  color: '#FFF'
  // contentContainerStyle: { padding: 30 },
}))`
  /* border: 1px solid black; */
  margin: 0;
  margin-left: 20px;
  transform: scaleX(-1) rotate(90deg);
`;

export const ActionConfig = styled(Icon).attrs((props: StyledPropsActionSelect) => ({
  name: props.name,
  size: 25,
  color: '#FFF'
  // contentContainerStyle: { padding: 30 },
}))`
  /* border: 1px solid black; */
  margin: 0;
  margin-left: 20px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: #151515;
  padding: 15px 5px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
  border-width: 2px;
  /*border-color: red;*/

  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  flex: 1;
  width: 100%;
  padding: 8px;
  background-color: #eee;
  border-radius: 8px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: #151515;
  padding: 10px 20px;
`;

export const ModalFooter = styled.View`
  flex-direction: row;
  height: 24px;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const SwitchTouchable = styled.TouchableOpacity`
  padding: 5px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

export const SwitchOption = styled.Text`
  font-size: 22px;
  font-weight: 100;
  color: #151515;
`;
