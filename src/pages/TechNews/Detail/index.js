import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Linking } from 'react-native';
import WebView from 'react-native-webview';
import { BorderlessButton, TouchableHighlight } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigationState } from '@react-navigation/native';

import api from '../../../services/api';
import placeholder from '../../../assets/techNews/post/olhardigital/data.json';
import { useDetailActions } from '../../../hooks/detailActions'
import { setOptions, navigationRef } from '../../../RootNavigation';
import PostContent from '../../../components/PostContent';
import { Wrap, Title, Source, SourceLabel, SourceValue, Continue } from './styles';

const paddingHorizontal = 40;
const { width } = Dimensions.get('window');
const imageWidth = width - paddingHorizontal;
const url_default = 'https://olhardigital.com.br/ciencia-e-espaco/noticia/spacex-coloca-novo-prototipo-da-starship-na-plataforma-de-lancamento/105118';

function TechNewsDetail({ route, navigation, url_sample = url_default, origin = 'Tecnoblog' }) {
  const { url } = route.params ? route.params : { url: placeholder.link };

  const { fontSize, renderMode, shareIsPending, setShareIsPending } = useDetailActions();
  const [data, setData] = useState({});
  const [includesVideo, setIncludesVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(
    async (urlOfOriginalPost = url_sample) => {
      //setData(placeholder);
      //navigation?.setOptions({ title: post.title });
      //return;

      setLoading(true);
      try {
        const url = '/technews/post';
        const params = {
          url: urlOfOriginalPost
        }

        const { data: post } = await api.get(url, { params });

        const hasVideo = post.contents.filter(({ type }) => type === 'video').length > 0;
        setIncludesVideo(hasVideo);

        setData(post);

        navigation?.setOptions({ title: post.title });
      } catch (error) {
        console.log(error, error.message)
        alert(JSON.stringify(error, null, 2));
      }
      setLoading(false);
    },
    []
  );

  // when starting page
  useEffect(() => {
    console.log(`Screen.technews/detail?url=${String(url)}`);
    load(url);
  }, []);

  useEffect(() => {
    if (shareIsPending) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }

        setShareIsPending(false);
      });
    }
  }, [shareIsPending]);

  const sourceLabel = useMemo(
    () => String(data.link).split('/')[2],
    [data]
  )

  const sourceHomeUrl = useMemo(
    () => `https://${String(data.link).split('/')[2]}`,
    [data]
  )

  if (!('contents' in data) || data.contents.length === 0) {
    return <View></View>
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
        <TouchableHighlight
          onPress={() => { handleClick(sourceHomeUrl) }}
          activeOpacity={0.5}
          underlayColor="#a5cdf3"
        >
          <SourceValue fontSize={fontSize}>{sourceLabel}</SourceValue>
        </TouchableHighlight>
      </Source>

      <AutoHeightImage
        width={imageWidth}
        source={{ uri: data.thumb }}
        style={{ marginBottom: 16 }}
      />

      {data.contents.map((item, key) => (
        <PostContent
          key={key}
          data={item}
          fontSize={fontSize}
        />
      ))}


      <TouchableHighlight
        onPress={() => handleClick(data.link)}
        activeOpacity={0.5}
        underlayColor="#a5cdf3"
      >
        <Continue>Continuar a ler no site</Continue>
      </TouchableHighlight>
    </Wrap>
  )
}

export default TechNewsDetail
