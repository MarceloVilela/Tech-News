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
  ThumbContainer,
} from './styles';
import { IPreviewData } from '../../pages/TechNews/Articles';
import { INavigation } from '../../RootNavigation';

interface PreviewParams {
  data: IPreviewData;
  navigation: INavigation;
  placeholder: boolean;
  fontSize: string;
  fontSizeSubtitle: string;
}

const Preview = ({ data, navigation, placeholder = true, fontSize, fontSizeSubtitle }: PreviewParams) => (
  <>
    {!placeholder ? (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TechNewsDetail', { url: data.link });
        }}
      >
        <Container>
          <Header orientation="right">
            <ThumbContainer orientation="right">
              <Thumb source={{ uri: data.thumb }} orientation="right" />
            </ThumbContainer>
            <Title fontSize={fontSize}>{data.title}</Title>
          </Header>

          <Footer>
            <Identifier fontSizeSubtitle={fontSizeSubtitle}>{data.sourceLabel}</Identifier>
            <RightFooter>
              <Time fontSizeSubtitle={fontSizeSubtitle}>{data.timeAgo}</Time>
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
