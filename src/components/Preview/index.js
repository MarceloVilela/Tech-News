import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Title, Thumb, Footer, Identifier, RightFooter, Time } from './styles';

const Preview = ({ data, navigation }) => (
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

Preview.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    sourceLabel: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Preview;
