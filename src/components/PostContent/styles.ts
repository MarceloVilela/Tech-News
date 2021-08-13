import styled from 'styled-components/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Dimensions } from 'react-native';

import values from '../../styles';

interface StyledPropsFontSize {
  fontSize: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
  fontSizeDefinition: string;
}

export const Text = styled.Text`
  font-size: ${(props: StyledPropsFontSize) => props.fontSize ? String(props.fontSize) : '16px'};
  /* font-size: ${(props: StyledPropsFontSize) => props.fontSize ? String(props.fontSize) : '16px'}; */
  font-weight: ${(props) => (props.fontWeight === 'bold' ? 'bold' : 'normal')};
  margin-bottom: ${values.spacing};
  /* text-align: justify; */
  color: ${(props) => props.theme.foreground500};
`;

export const TextHighlighted = styled.Text`
  font-weight: bold;
  font-size: ${values.fontSubTitle.default};
  margin-bottom: ${values.spacing};
  justify-content: center;
  text-align: left;
`;

export const Image = styled(AutoHeightImage).attrs(() => ({
  width: Dimensions.get('window').width - 2 * values.spacing_int
}))`
  margin-bottom: ${values.spacing};
`;

export const Img = styled.Image`
  min-width: 128;
  width: 100%;
  height: undefined;
  border-radius: 8;
  border-width: 8;
  /*border-color: '#FFF';*/
  margin: 0 auto;
`;
