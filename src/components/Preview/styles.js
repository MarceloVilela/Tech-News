import styled from 'styled-components/native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  margin: 0 10px 10px 10px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;

  margin-top: ${props => (props.first ? '10px' : '0')};
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  /*font-weight: bold;*/
  font-size: 16px;
  color: #151515;
  flex: 1;
`;

export const Thumb = styled(AutoHeightImage).attrs(props => ({
  width: 128,
  minHeight: 72,
}))`
  border-radius: 8px;
  border-width: 8px;
  margin-left: 10px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid green; */
`;

export const Identifier = styled.Text`
  /*font-weight: bold;*/
  font-size: 12px;
  color: #808080;
`;

export const RightFooter = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  /* border: 3px solid yellow; */
  justify-content: flex-end;
  align-items: center;
`;

export const Time = styled.Text`
  /*font-weight: bold;*/
  font-size: 12px;
  color: #808080;
  /* border: 1px solid black; */
`;

export const Action = styled(Icon).attrs(props => ({
  name: 'more-vert',
  size: 25,
  color: '#151515',
  // contentContainerStyle: { padding: 30 },
}))`
  /* border: 1px solid black; */
  margin: 0 3px 0 3px;
`;