import styled from 'styled-components/native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StyledPropsFirstStyle {
  first: boolean;
}

export const Container = styled.View`
  margin: 0 10px 10px 10px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.background500};
  border-radius: 8px;
  background: ${(props) => props.theme.background500};

  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;

  margin-top: ${(props: StyledPropsFirstStyle) => (props.first ? '10px' : '0')};
`;

export const Header = styled.View`
  display: flex;
  flex-direction: ${(props) => (props.orientation === 'right' ? 'row-reverse' : 'row')};
  /* border: 1px solid red; */
  margin-bottom: 10px;
  flex-wrap: wrap;
  max-height: 140px;
  max-height: ${(props) => (props.orientation === 'over' ? '221px' : '80px')};
  overflow: hidden;
`;

export const Title = styled.Text`
  width: 100%;
  font-size: 16px;
  font-size: ${(props) => (props.fontSize.includes('px') ? props.fontSize : '16px')};
  line-height: ${(props) => (props.lineHeight.includes('px') ? props.lineHeight : '16px')};
  font-weight: ${(props) => (props.fontWeight === 'bold' ? 'bold' : 'normal')};
  color: ${(props) => props.theme.foreground300};
  flex: 1;
  border: 1px solid ${(props) => props.theme.background500};
`;

export const ThumbContainer = styled.View`
  width: ${(props) => (props.orientation === 'over' ? '100%' : '138px')};
  margin-bottom: 8px;
  align-items: ${(props) => (props.orientation === 'over' ? 'center' : 'baseline')};
`;

export const Thumb = styled(AutoHeightImage).attrs(() => ({
  width: 128,
  minHeight: 72,
}))`
  width: ${(props) => (props.orientation === 'over' ? '256px' : '128px')};
  height: ${(props) => (props.orientation === 'over' ? '144px' : '72px')};
  margin-left: ${(props) => (props.orientation === 'left' ? '0' : '10px')};
  margin-right: ${(props) => (props.orientation === 'right' ? '0' : '10px')};
  border-radius: 8px;
  border-width: 8px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(props) => props.theme.background500};
`;

export const Identifier = styled.Text`
  /*font-weight: bold;*/
  font-size: 12px;
  font-size: ${(props) =>
    props.fontSizeSubtitle.includes('px') ? props.fontSizeSubtitle : '16px'};
  line-height: ${(props) =>
    props.fontSizeSubtitle.includes('px') ? props.fontSizeSubtitle : '16px'};
  font-weight: ${(props) => (props.fontWeight === 'bold' ? 'bold' : 'normal')};
  color: ${(props) => props.theme.foreground600};
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
  font-size: ${(props) =>
    props.fontSizeSubtitle.includes('px') ? props.fontSizeSubtitle : '16px'};
  line-height: ${(props) =>
    props.fontSizeSubtitle.includes('px') ? props.fontSizeSubtitle : '16px'};
  font-weight: ${(props) => (props.fontWeight === 'bold' ? 'bold' : 'normal')};
  color: ${(props) => props.theme.foreground600};
  /* border: 1px solid black; */
`;

export const Action = styled(Icon).attrs(() => ({
  name: 'more-vert',
  size: 25,
  color: '#151515',
  // contentContainerStyle: { padding: 30 },
}))`
  /* border: 1px solid black; */
  margin: 0 3px 0 3px;
`;

export const TextPlaceholder = styled.View`
  background: #ccc;
  height: 20px;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const ThumbPlaceholder = styled.View`
  background: #ccc;
  height: 70px;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const ContainerCondensed = styled(Container)`
  margin: 0 2px 8px 2px;
  padding: 4px;
  border-radius: 0;
`;

export const ContainerMaterial = styled(Container)`
  border-radius: 0;
`;

export const Aside = styled.View`
  flex: 1;
  border: 1px solid ${(props) => props.theme.background500};
  height: 70px;
`;

export const FooterMaterialActions = styled(Footer)`
  border-top-color: ${(props) => props.theme.foreground600};
  border-top-width: 1px;
  flex: 1;
  width: 100%;
  margin-top: 8px;
  padding-top: 8px;
`;

export const FooterMaterialAction = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.foreground600};
  margin-right: 8px;
`;
