import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 24px;
  padding: 0;
  border: 1px solid #eee;
`;

export const EdgeSpace = styled.View`
  padding: 0 8px;
`;

export const Header = styled.View`
  /*border: 1px solid red;*/
`;

export const Footer = styled.View`
  /*border: 1px solid green;*/
  margin-top: 8px;
`;

export const Strong = styled.Text`
  /*font-weight: bold;*/
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  flex: 1;
`;

export const Small = styled.Text`
  /*font-weight: bold;*/
  font-size: 12px;
  font-weight: 400;
  color: #262626;
  flex: 1;
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 8px;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const LabelsContainer = styled.View`
  flex-direction: column;
  margin-left: 8px;
`;

export const Link = styled.View`
  margin: 16px 0;
`;
