import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, Dimensions, Linking, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';

import api from '../../../services/api';
import placeholder from '../../../assets/techNews/post/olhardigital/data.json';
import { useDetailActions } from '../../../hooks/detailActions';
import PostContent from '../../../components/PostContent';
import { Wrap, Title, Source, SourceLabel, SourceValue, Continue } from './styles';

const paddingHorizontal = 40;
const { width } = Dimensions.get('window');
const imageWidth = width - paddingHorizontal;
const url_default =
  'https://olhardigital.com.br/ciencia-e-espaco/noticia/spacex-coloca-novo-prototipo-da-starship-na-plataforma-de-lancamento/105118';

function TechNewsDetail({ route, navigation, url_sample = url_default }) {
  const { url } = route.params ? route.params : { url: placeholder.link };

  const { fontSize, renderMode, shareIsPending, setShareIsPending } = useDetailActions();
  const [data, setData] = useState({});
  const [includesVideo, setIncludesVideo] = useState(false);
  const [_loading, setLoading] = useState(false);

  const load = useCallback(
    async (urlOfOriginalPost = url_sample) => {
      setLoading(true);
      try {
        const urlListHome = '/technews/post';
        const params = {
          url: urlOfOriginalPost
        };

        const { data: post } = await api.get(urlListHome, { params });

        const hasVideo = post.contents.filter(({ type }) => type === 'video').length > 0;
        setIncludesVideo(hasVideo);

        post.contents = post.contents.map((item, key) => ({ ...item, key }));

        setData(post);

        navigation?.setOptions({ title: post.title });
      } catch (error) {
        Alert.alert(
          'Erro ao listar detalhes', 
          error.data ? JSON.stringify(error.data, null, 2) : error.message
        );
      }
      setLoading(false);
    },
    [navigation, url_sample]
  );

  // when starting page
  useEffect(() => {
    load(url);
  }, [load, url]);

  useEffect(() => {
    if (shareIsPending) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }

        setShareIsPending(false);
      });
    }
  }, [shareIsPending, setShareIsPending, url]);

  const sourceLabel = useMemo(() => String(data.link).split('/')[2], [data]);

  if (!('contents' in data) || data.contents.length === 0) {
    return <View />;
  }

  if (renderMode === 'webview') {
    return <WebView source={{ uri: data.link }} />;
  }

  if (includesVideo) {
    return <WebView source={{ uri: data.link }} />;
  }

  return (
    <Wrap>
      <Title fontSize={fontSize}>{data.title}</Title>

      <Source>
        <SourceLabel fontSize={fontSize}>origem:</SourceLabel>
        <TouchableHighlight onPress={() => { }} activeOpacity={0.5} underlayColor="#a5cdf3">
          <SourceValue fontSize={fontSize}>{sourceLabel}</SourceValue>
        </TouchableHighlight>
      </Source>

      <AutoHeightImage
        width={imageWidth}
        source={{ uri: data.thumb }}
        style={{ marginBottom: 16 }}
      />

      {data.contents.map((item) => (
        <PostContent key={item.key} data={item} fontSize={fontSize} />
      ))}

      <TouchableHighlight onPress={() => { }} activeOpacity={0.5} underlayColor="#a5cdf3">
        <Continue>Continuar a ler no site</Continue>
      </TouchableHighlight>
    </Wrap>
  );
}

TechNewsDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  }).isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  url_sample: PropTypes.string,
};

TechNewsDetail.defaultProps = {
  url_sample: '',
}

export default TechNewsDetail;
