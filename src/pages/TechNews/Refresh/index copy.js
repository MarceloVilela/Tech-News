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

export default function TechNewsRefresh({ route }) {
  const [recents, setRecents] = useState([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  const [pending, setPending] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  const requestSourceHomePage = useCallback(async (pageNumber = 1) => {
    setLoadingRecents(true);

    const url = `/technews-source/`;
    const params = { url: origins[0]['url'] };
    //console.log('requestSourceHomePage');
    setFeedbackText('Listando homepage...');

    try {
      //const response = await api.get(url, { params });
      const response = { data: { posts } };

      setRecents(response.data.posts);
      setResponseDebug(response.data.posts);
    } catch (error) {
      Alert.alert(url, JSON.stringify(params));
    } finally {
      setLoadingRecents(false);

      requestCheckPending();
    }
  }, []);

  const requestCheckPending = useCallback(async () => {
    if (recents.length === 0) {
      return;
    }

    const url = 'technews/refresh';
    const postsFormatted = recents.map(({ link }) => { return { link } });
    const params = { posts: JSON.stringify(postsFormatted) };
    //console.log('requestCheckPending')
    setFeedbackText('Verificando pendentes...');

    try {
      setLoadingPending(true);
      const response = await api.get(url, { params });

      setPending(response.data);
      setResponseDebug(response.data);
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

    const [currentCall, ...next] = pending;
    const urlSource = '/technews-source/detail';
    const params = { url: currentCall };

    const urlCreate = '/technews';
    let data = {};
    console.log('requestCreatePending', currentCall);
    setFeedbackText('Armazenando post...');



    try {
      setLoadingCreate(true);
      //getContent
      const response = await api.get(urlSource, { params });
      data = response.data;
    } catch (error) {
      Alert.alert(`Erro: ${urlSource}`, error.message);
    } finally {
      setLoadingCreate(false);
    }


    try {
      setLoadingCreate(true);
      //create
      if (data.link && data.thumb) {
        await api.post(urlCreate, data);
      }

      const pendingFiltered = pending.filter(item => item !== currentCall);
      //console.log('pendingFiltered', pendingFiltered);
      setPending(pendingFiltered);
      setResponseDebug(pendingFiltered);
    } catch (error) {
      Alert.alert(`Erro: ${urlCreate}`, JSON.stringify(params));
    } finally {
      setLoadingCreate(false);

      //requestCreatePending();
    }
  }, [pending])

  // when starting page
  useEffect(() => {
    //console.clear();
    //console.log('Page technews/refresh')
    requestSourceHomePage();
  }, [requestSourceHomePage]);

  return (
    <Container loading={loadingRecents} style={{ backgroundColor: '#FFF' }}>
      <ScrollView style={{ backgroundColor: 'black', paddingVertical: 16, paddingHorizontal: 8 }}>
        <Small style={{ color: 'yellow' }}>{JSON.stringify(responseDebug, null, 2)}</Small>
      </ScrollView>

      <Button handleOnPress={() => { }}>
        {feedbackText}
      </Button>
    </Container>
  );
}
