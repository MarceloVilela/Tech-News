import React, { useMemo, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import * as RootNavigation from '../../RootNavigation';
import {
  //secoes/principais divisoes
  Container, Header, Footer,
  About, Avatar, LabelsContainer,

  //afasta do canto da tela
  EdgeSpace,

  //tipografia
  Strong, Small,
} from './styles';
import ResponsiveImage from './ResponsiveImage'

const { width } = Dimensions.get('window');
const uri = [
  'https://m.media-amazon.com/images/M/MV5BYjk5NTYzMjMtMTEyYi00YThjLWFmMGEtMTQ5ODUxMTM2NTFkXkEyXkFqcGdeQXNuZXNodQ@@._V1_CR0,42,796,448_AL_UX477_CR0,0,477,268_AL_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNDJiZDliZDAtMjc5Yy00MzVhLThkY2MtNDYwNTQ2ZTM5MDcxXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg'
]

export default function Feed({ data }) {
  const [visible, setVisible] = useState(false)

  const { labelHeader, labelSeeMore } = useMemo(() => {
    if (!('labels' in data) || !data.labels.length) {
      return { labelHeader: '', labelSeeMore: '' }
    }

    const [labelHeader, ...anothers] = data.labels;
    const labelSeeMore = anothers.length ? anothers.join(', ') : '';
    return { labelHeader, labelSeeMore }
  }, [data.labels])

  //return (<Text>Item</Text>)
  return (
    <TouchableOpacity
      onPress={() => RootNavigation.navigate('PlanetDetail', {id: data.id})}
    >
      <Container>
        <Header>
          <EdgeSpace>
            <About>
              <Avatar
                source={{ uri: uri[0] }}
              />

              <LabelsContainer>
                <Strong>{labelHeader}</Strong>
                {!!labelSeeMore && (
                  <Small>{labelSeeMore}{data.id}</Small>
                )}
              </LabelsContainer>
            </About>
          </EdgeSpace>

          <AutoHeightImage
            width={width}
            source={{ uri: data.thumb }}
          />
        </Header>

        <Footer>
          <EdgeSpace>
            <Strong>{data.title}</Strong>

            {visible &&
              <>
                {data.links.map(item => (
                  <Small>{item}</Small>
                ))}
              </>
            }

            <Small>{data.date}</Small>
          </EdgeSpace>
        </Footer>
      </Container>
    </TouchableOpacity>
  );
}

/*
<Thumb
  source={{ uri: data.thumb, width }}
/>

<Image
  width={width}
  resizeMode="cover"
  source={{ uri: data.thumb, width, height: 240 }}
/>
*/

Feed.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    thumb: PropTypes.thumb,
    date: PropTypes.date,
  }).isRequired,
};
