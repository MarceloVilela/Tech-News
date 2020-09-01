import styled from 'styled-components/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Dimensions } from 'react-native';

import values from '../../styles'

export const Text = styled.Text`
  font-size: ${props => values.fontParagraph[props.fontSize] 
    ? values.fontParagraph[props.fontSize] 
    : values.fontParagraph['default']
  };
  margin-bottom: ${values.spacing};
  text-align: justify;
`;

export const TextHighlighted = styled.Text`
  font-weight: bold;
  font-size: ${values.fontTitle};
  margin-bottom: ${values.spacing};
  justify-content: center;
  text-align: center;
`;

export const Image = styled(AutoHeightImage).attrs(props => ({
  width: Dimensions.get('window').width - (2 * values.spacing_int),
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
