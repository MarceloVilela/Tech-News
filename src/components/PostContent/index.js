import React from 'react';
import PropTypes from 'prop-types';

import values from '../../styles'
import { Text, TextHighlighted, Image } from './styles';

const render = {
  text({ content, fontSize }) {
    return <Text fontSize={fontSize}>{content}</Text>
  },

  'text-highlighted': function ({ content }) {
    return <TextHighlighted>{content}</TextHighlighted>
  },

  image({ content }) {
    return <Image
      source={{ uri: content }}
    />
  }
}

const enumFontSize = Object.keys(values.fontParagraph);

export default function PostContent({ data, fontSize }) {
  if (!render[data.type]) {
    return (<Text>data.content</Text>)
  }

  return (
    render[data.type]({ content: data.value, fontSize })
  );
}

PostContent.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'text-highlighted', 'image']),
    value: PropTypes.string,
    fontSize: PropTypes.oneOf(Object.keys(values.fontParagraph)),
  }).isRequired,
};
