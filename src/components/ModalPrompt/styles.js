import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Option = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

export const OptionLabel = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: #262626;
  margin-left: 20px;
`;

export const MessageConfirm = styled.Text`
  font-size: 18px;
  font-weight: 100;
  color: #262626;
  margin-left: 20px;
  margin-bottom: 60px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
  border-width: 2px;
  /*border-color: red;*/

  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.View`
  /*flex: 1;*/
  width: 100%;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  margin-horizontal: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const ModalIcon = styled(Icon).attrs((props) => ({
  name: props.name,
  size: 40,
  color: '#CCC'
}))`
  padding: 20px 20px 0 0;
  height: 80;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: #151515;

  flex: 1;
`;

export const ModalFooter = styled.View`
  flex-direction: row;
  height: 24px;
  align-items: flex-end;
  justify-content: flex-end;
  /** */
  padding: 10px;
`;
