import React from 'react';
import PropTypes from 'prop-types';
// import YouTube from 'react-native-youtube';

// import env from '../../../env';
import values from '../../styles';
import { Text, TextHighlighted, Image } from './styles';

function text({ content, fontSize }) {
  const font = values.fontParagraph[fontSize]
    ? values.fontParagraph[fontSize]
    : values.fontParagraph.default;
  return <Text fontSize={font}>{content}</Text>;
}

function text_highlighted({ content }) {
  return <TextHighlighted>{content}</TextHighlighted>;
}

function image({ content }) {
  return <Image source={{ uri: content }} />;
}

function video({ content }) {
  if (content.includes('//www.youtube.com')) {
    return <Text>VIDEO{content.split('embed/')[1].split('?')[0]}</Text>;

    /* return (
      <YouTube
        videoId={{ uri: content.split('embed/')[1].split('?')[0] }}
        apiKey={env.GOOGLE_YOUTUBE_API_KEY}
      />
    ); */
  }
  return '';
}

const render = {
  text,
  text_highlighted,
  image,
  video
};

const _enumFontSize = Object.keys(values.fontParagraph);

export default function PostContent({ data, fontSize }) {
  if (!render[data.type]) {
    return <Text>{data.value}</Text>;
  }

  return render[data.type.replace('-', '_')]({ content: data.value, fontSize });
}

text.propTypes = {
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOf(Object.keys(values.fontParagraph)).isRequired
};

text_highlighted.propTypes = {
  content: PropTypes.string.isRequired
};

image.propTypes = {
  content: PropTypes.string.isRequired
};

video.propTypes = {
  content: PropTypes.string.isRequired
};

PostContent.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['text', 'text-highlighted', 'image', 'video']),
    value: PropTypes.string,
  }),
  fontSize: PropTypes.string,
};

PostContent.defaultProps = {
  data: {
    content: '',
    type: 'text',
    value: '',
  },
  fontSize: 'default',
};
