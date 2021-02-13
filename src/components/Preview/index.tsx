import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Header, Title, Thumb, Footer, Identifier, RightFooter, Time } from './styles';
import { IPreviewData } from '../../pages/TechNews/Articles';
import { INavigation } from '../../RootNavigation';

interface PreviewParams {
  data: IPreviewData;
  navigation: INavigation;
}

const Preview = ({ data, navigation }: PreviewParams) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('TechNewsDetail', { url: data.link });
    }}
  >
    <Container>
      <Header>
        <Title>{data.title}</Title>
        <Thumb source={{ uri: data.thumb }} />
      </Header>

      <Footer>
        <Identifier>{data.sourceLabel}</Identifier>
        <RightFooter>
          <Time>{data.timeAgo}</Time>
        </RightFooter>
      </Footer>
    </Container>
  </TouchableOpacity>
);

export default Preview;
