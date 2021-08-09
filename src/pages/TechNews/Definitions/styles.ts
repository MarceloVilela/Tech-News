import styled from 'styled-components/native';
import { Container as ContainerComponent } from '../../../components';

export const Container = styled(ContainerComponent).attrs({})`
  background: ${(props) => props.theme.background500};
`;

export const Container_ = styled.View`
  padding: 0 0 60px 0;
  border: 1px solid #eee;
`;

export const Fieldset = styled.View`
  padding-bottom: 20px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export const Definition = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-left: 60px;
`;

export const DefinitionSwitch = styled.View`
  flex-direction: row;
  padding-vertical: 10px;
  padding-left: 60px;
`;

export const AsideSwitch = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #1b75cb;
  margin-vertical: 20px;
  padding-left: 60px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: 100;
  color: ${(props) => props.theme.foreground300};
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.foreground600};
`;
