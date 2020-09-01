import styled from 'styled-components/native';
import values from '../../../styles';

export const Wrap = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  /*align-self: stretch;*/
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${props => values.fontTitle[String(props.fontSize)]
    ? values.fontTitle[props.fontSize]
    : values.fontTitle['default']
  };
  color: ${values.colorLink};
  text-decoration: underline;
  justify-content: center;
  text-align: center;
  margin-bottom: ${values.spacing};
`;

export const Source = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${values.spacing};
`;

export const SourceLabel = styled.Text`
font-weight: bold;
font-size: ${props => values.fontSubTitle[String(props.fontSize)]
    ? values.fontSubTitle[props.fontSize]
    : values.fontSubTitle['default']
  };
`;

export const SourceValue = styled.Text`
font-weight: bold;
font-size: ${props => values.fontSubTitle[String(props.fontSize)]
    ? values.fontSubTitle[props.fontSize]
    : values.fontSubTitle['default']
  };
color: ${values.colorLink};
text-decoration: underline;
margin-left: 10px;
`;

export const Continue = styled.Text`
  font-size: ${values.font};
  color: ${values.colorLink};
  text-decoration: underline;
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  // showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  padding-top: 10px;
`;

