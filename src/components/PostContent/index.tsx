import React from 'react';
import PropTypes from 'prop-types';
// import YouTube from 'react-native-youtube';

import values from '../../styles';
import { Text, TextHighlighted, Image } from './styles';

interface ContentProps {
  content: string;
}

interface ContentResizable {
  content: string;
  fontSize: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
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
}

function text({ content, fontSize }: ContentResizable): JSX.Element {
  const font = values.fontParagraph[fontSize]
    ? values.fontParagraph[fontSize]
    : values.fontParagraph.default;
  return <Text fontSize={font}>{content}</Text>;
}

function text_highlighted({ content }: ContentProps): JSX.Element {
  return <TextHighlighted>{content}</TextHighlighted>;
}

function image({ content }: ContentProps): JSX.Element {
  return <Image source={{ uri: content }} />;
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
  return <Text></Text>;
}

const render: Render = {
  text,
  text_highlighted,
  image,
  video
};

const _enumFontSize = Object.keys(values.fontParagraph);

export default function PostContent({ data, fontSize }: PostContentProps): JSX.Element {
  if (!render[data.type]) {
    return <Text>{data.value}</Text>;
  }

  return render[data.type]({ content: data.value, fontSize });
}

