import React from 'react';
import PropTypes from 'prop-types';
// import YouTube from 'react-native-youtube';

import values from '../../styles';
import { Text, TextHighlighted, Image } from './styles';
import { useDefinitions } from '../../hooks/definitions';

interface ContentProps {
  content: string;
  loadImage?: boolean;
}

interface ContentResizable {
  content: string;
  fontSize: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
  fontSizeDefinition: string;
}

interface Render {
  text(param: ContentResizable): JSX.Element;
  text_highlighted(param: ContentProps): JSX.Element;
  image(param: ContentProps): JSX.Element;
  video(param: ContentProps): JSX.Element;
}

interface PostContentProps {
  data: {
    type: 'text' | 'text_highlighted' | 'image' | 'video';
    value: string;
  }
  fontSize: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
  fontWeight: 'normal' | 'bold';
  loadImage: boolean;
}

function text({ content, fontSize, fontSizeDefinition, fontWeight }: ContentResizable): JSX.Element {
  let font = values.fontParagraph[fontSize]
    ? values.fontParagraph[fontSize]
    : values.fontParagraph.default;

  font = fontSize === 'default' && fontSizeDefinition.includes('px') ? fontSizeDefinition : font;
  const _fontWeight = fontWeight === 'bold' ? 'bold' : 'normal';

  return (
    <Text fontSize={font} fontWeight={_fontWeight}>
      {content}
    </Text>
  );
}

function text_highlighted({ content }: ContentProps): JSX.Element {
  return <TextHighlighted>{content}</TextHighlighted>;
}

function image({ content, loadImage }: ContentProps): JSX.Element {
  return loadImage ? <Image source={{ uri: content }} /> : <Text>{content}</Text>;
}

function video({ content }: ContentProps): JSX.Element {
  if (content.includes('//www.youtube.com')) {
    return <Text>VIDEO{content.split('embed/')[1].split('?')[0]}</Text>;

    /* return (
      <YouTube
        videoId={{ uri: content.split('embed/')[1].split('?')[0] }}
        apiKey={env.GOOGLE_YOUTUBE_API_KEY}
      />
    ); */
  }
  return <Text>{content}</Text>;
}

const render: Render = {
  text,
  text_highlighted,
  image,
  video
};

const _enumFontSize = Object.keys(values.fontParagraph);

export default function PostContent({ data, fontSize, loadImage }: PostContentProps): JSX.Element {
  const { definitions } = useDefinitions();

  if (!render[data.type]) {
    return <Text>{data.value}</Text>;
  }

  return render[data.type]({
    content: data.value,
    fontSize,
    fontSizeDefinition: definitions.appearance_dimensionCaracterArticle,
    fontWeight: definitions.appearance_letterType,
    loadImage,
  });
}
