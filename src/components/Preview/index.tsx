import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import {
  Container,
  Header,
  Title,
  Thumb,
  Footer,
  Identifier,
  RightFooter,
  Time,
  TextPlaceholder,
  ThumbPlaceholder,
} from './styles';
import { IPreviewData } from '../../pages/TechNews/Articles';
import { INavigation } from '../../RootNavigation';

interface PreviewParams {
  data: IPreviewData;
  navigation: INavigation;
  placeholder: boolean;
}

const Preview = ({ data, navigation, placeholder = true }: PreviewParams) => (
  <>
    {!placeholder ? (
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
    ) : (
      <Container>
        <Header>
          <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TextPlaceholder />
            <TextPlaceholder />
          </View>
          <ThumbPlaceholder />
        </Header>

        <Footer>
          <TextPlaceholder />
          <RightFooter>
            <TextPlaceholder />
          </RightFooter>
        </Footer>
      </Container>
    )}
  </>
);

export default Preview;
