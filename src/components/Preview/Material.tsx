import React from 'react';

import {
  Header,
  Title,
  Thumb,
  Footer,
  Identifier,
  RightFooter,
  Time,
  ThumbPlaceholder,
  ThumbContainer,
  ContainerMaterial,
  FooterMaterialActions,
  FooterMaterialAction,
} from './styles';
import { IPreviewData } from '../../pages/TechNews/Articles';

interface PreviewParams {
  data: IPreviewData;
  fontSize: string;
  fontSizeSubtitle: string;
  fontWeight: string;
  loadImage: boolean;
  orientation: string;
  lineHeight: string;
}

const Material = ({
  data,
  //
  fontSize,
  fontSizeSubtitle,
  lineHeight,
  fontWeight,
  //
  loadImage,
  orientation,
}: PreviewParams) => (
  <>
    <ContainerMaterial>
      <Header orientation={orientation}>
        <ThumbContainer orientation={orientation}>
          {loadImage ? (
            <Thumb source={{ uri: data.thumb }} orientation={orientation} />
          ) : (
            <ThumbPlaceholder />
          )}
        </ThumbContainer>
        <Title fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
          {data.title}
        </Title>
      </Header>

      <Footer>
        <Identifier fontSizeSubtitle={fontSizeSubtitle} fontWeight={fontWeight}>
          {data.sourceLabel}
        </Identifier>
        <RightFooter>
          <Time fontSizeSubtitle={fontSizeSubtitle} fontWeight={fontWeight}>
            {data.timeAgo}
          </Time>
        </RightFooter>
      </Footer>

      <FooterMaterialActions>
        <FooterMaterialAction>LEIA</FooterMaterialAction>
        <FooterMaterialAction>COMPARTILHE</FooterMaterialAction>
      </FooterMaterialActions>
    </ContainerMaterial>
  </>
);

export default Material;
