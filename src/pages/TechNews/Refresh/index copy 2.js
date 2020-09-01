import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Text, View, ScrollView, Dimensions, Linking, Alert } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';

import api from "../../../services/api";
import { origins } from '../../../assets/origins.json';
import { posts } from '../../../assets/techNews/home/olhardigital/data.json';
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import { Strong, Small } from './styles'

const { width } = Dimensions.get('window');

export default function TechNewsRefresh({ navigation }) {
  const [indexOrigin, setIndexOrigin] = useState(0);

  const [recents, setRecents] = useState([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  const [pending, setPending] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  const requestSourceHomePage = useCallback(async () => {
    if (!origins[indexOrigin]) {
      return;
    }
    navigation?.setOptions({ title: `Refresh[${indexOrigin + 1} de ${origins.length}]: ${origins[0]['url']}` });

    setLoadingRecents(true);

    const url = `/technews-source/`;
    const params = { url: origins[0]['url'] };
    console.log('requestSourceHomePage');
    setFeedbackText('Listando homepage...');

    try {
      const response = await api.get(url, { params });
      //const response = { data: { posts } };

      setRecents(response.data.posts);
      setResponseDebug(response.data.posts);
    } catch (error) {
      Alert.alert(url, JSON.stringify(params));
    } finally {
      setLoadingRecents(false);

      requestCheckPending();
    }
  }, [recents]);

  const requestCheckPending = useCallback(async () => {
    if (recents.length === 0) {
      return;
    }

    const url = 'technews/refresh';
    const postsFormatted = recents.map(({ link }) => { return { link } });
    const params = { posts: JSON.stringify(postsFormatted) };
    console.log('requestCheckPending');
    setFeedbackText('Verificando pendentes...');

    try {
      setLoadingPending(true);
      const response = await api.get(url, { params });

      //const dataToSet = response.data.slice(0, 3);
      const dataToSet = response.data;

      setPending(dataToSet);
      setResponseDebug(dataToSet);
    } catch (error) {
      Alert.alert(`Erro: ${url}, ${error.message}`, JSON.stringify(params));
    } finally {
      setLoadingPending(false);

      requestCreatePending();
    }
  }, [recents, pending])

  const requestCreatePending = useCallback(async () => {
    if (pending.length === 0) {
      setFeedbackText('Completo!');
      return;
    }

    try {
      setLoadingCreate(true);

      //getContent
      console.log('requestCreatePending.details');
      setFeedbackText('Listando post...');

      const urlSource = '/technews-source/detail';
      const response = await Promise.all(
        pending.map(url => api.get(urlSource, { params: { url } }))
      );

      const responsesFiltered = response.filter(({ data: item }) => item.link && item.thumb);

      //create
      console.log('requestCreatePending.create');
      setFeedbackText('Armazenando post...');

      const urlCreate = '/technews';
      await Promise.all(
        responsesFiltered.map(({ data }) => api.post(urlCreate, data))
      );

      setFeedbackText('Completo!!!');
      //setIndexOrigin(indexOrigin + 1);
      //requestSourceHomePage();
    } catch (error) {
      Alert.alert(`Erro`, error.message);
    } finally {
      setLoadingCreate(false);
    }
  }, [pending])

  // when starting page
  useEffect(() => {
    console.clear();
    console.log('Page technews/refresh')
    requestSourceHomePage();
  }, []);

  return (
    <Container loading={loadingRecents} style={{ backgroundColor: '#FFF' }}>
      <>
        <ScrollView style={{ backgroundColor: 'black', paddingVertical: 16, paddingHorizontal: 8 }}>
          <Small style={{ color: 'yellow' }}>{JSON.stringify(responseDebug, null, 2)}</Small>
        </ScrollView>

        <Button handleOnPress={() => { }}>
          {feedbackText}
        </Button>
      </>
    </Container>
  );
}
