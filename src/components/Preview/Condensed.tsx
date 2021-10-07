import React from 'react';

import {
  ContainerCondensed,
  Header,
  Title,
  Thumb,
  Footer,
  Identifier,
  RightFooter,
  Time,
  ThumbPlaceholder,
  ThumbContainer,
  Aside,
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

const Condensed = ({
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
    <ContainerCondensed>
      <Header orientation={orientation}>
        <ThumbContainer orientation={orientation}>
          {loadImage ? (
            <Thumb source={{ uri: data.thumb }} orientation={orientation} />
          ) : (
            <ThumbPlaceholder />
          )}
        </ThumbContainer>

        <Aside>
          <Title fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
            {data.title}
          </Title>

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
        </Aside>
      </Header>
    </ContainerCondensed>
  </>
);

export default Condensed;
