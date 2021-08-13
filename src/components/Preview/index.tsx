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
import Condensed from './Condensed';
import Rounded from './Rounded';
import Material from './Material';
import MaterialCompact from './MaterialCompact';

interface PreviewParams {
  data: IPreviewData;
  navigation: INavigation;
  placeholder: boolean;
  fontSize: string;
  fontSizeSubtitle: string;
  fontWeight: string;
  loadImage: boolean;
  orientation: string;
  lineHeight: string;
  box_theme: string;
}

const Preview = ({
  data,
  navigation,
  placeholder = true,
  //
  fontSize,
  fontSizeSubtitle,
  lineHeight,
  fontWeight,
  //
  loadImage,
  orientation,
  box_theme = 'materialCompact',
}: PreviewParams) => (
  <>
    {!placeholder ? (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TechNewsDetail', { url: data.link });
        }}
      >
        {box_theme === 'material' && (
          <Material
            data={data}
            fontSize={fontSize}
            fontSizeSubtitle={fontSizeSubtitle}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            loadImage={loadImage}
            orientation={orientation}
          />
        )}
        {box_theme === 'materialCompact' && (
          <MaterialCompact
            data={data}
            fontSize={fontSize}
            fontSizeSubtitle={fontSizeSubtitle}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            loadImage={loadImage}
            orientation={orientation}
          />
        )}
        {box_theme === 'rounded' && (
          <Rounded
            data={data}
            fontSize={fontSize}
            fontSizeSubtitle={fontSizeSubtitle}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            loadImage={loadImage}
            orientation={orientation}
          />
        )}
        {box_theme === 'condensed' && (
          <Condensed
            data={data}
            fontSize={fontSize}
            fontSizeSubtitle={fontSizeSubtitle}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            loadImage={loadImage}
            orientation={orientation}
          />
        )}
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
