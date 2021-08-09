import styled from 'styled-components/native';
import values from '../../../styles';

export const Wrap = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 }
})`
  /*align-self: stretch;*/
  background-color: ${(props) => props.theme.background600};
`;

interface StyledPropsFontSize {
  fontSize: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
}

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${(props: StyledPropsFontSize) =>
    values.fontTitle[props.fontSize]
      ? values.fontTitle[props.fontSize]
      : values.fontTitle.default};
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
  font-size: ${(props: StyledPropsFontSize) =>
    values.fontSubTitle[props.fontSize]
      ? values.fontSubTitle[props.fontSize]
      : values.fontSubTitle.default};
  color: ${(props) => props.theme.foreground300};
`;

export const SourceValue = styled.Text`
  font-weight: bold;
  font-size: ${(props: StyledPropsFontSize) =>
    values.fontSubTitle[props.fontSize]
      ? values.fontSubTitle[props.fontSize]
      : values.fontSubTitle.default};
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

export const TitlePlaceholder = styled.View`
  background: #ccc;
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-bottom: 32px;
`;

export const SubTitlePlaceholder = styled.View`
  background: #ccc;
  height: 24px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-bottom: 32px;
`;

export const ThumbPlaceholder = styled.View`
  background: #ccc;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 32px;
`;

export const TextPlaceholder = styled.View`
  background: #ccc;
  height: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
`;
