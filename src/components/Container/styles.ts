import styled from 'styled-components/native';

interface StyledPropsWrap {
  scrollEnabled: boolean;
}

export const Wrap = styled.View`
  flex: 1;
  /*padding: 80px 30px 0 30px;
  padding: ${(props: StyledPropsWrap) => (props.scrollEnabled ? '0px 30px 0 30px' : '120px 30px 0 30px')};*/
  background-color: ${(props) => props.theme.background300};
`;

export const WrapLoading = styled.View`
  align-items: center;
  justify-content: center;

  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;

  opacity: 0.9;

  /*border: 3px solid green;*/
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 120, paddingBottom: 30 }
})`
  align-self: stretch;
`;
