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

  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  const requestSourceHomePage = useCallback(async () => {
    if (!origins[indexOrigin]) {
      return;
    }
    navigation?.setOptions({ title: `Refresh[${indexOrigin + 1} de ${origins.length}]: ${origins[indexOrigin]['url']}` });

    const url = `/technews-source`;
    const params = { url: origins[indexOrigin]['url'] };
    console.log('requestSourceHomePage');
    setFeedbackText('Listando homepage...');

    try {
      const response = await api.get(url, { params });
      //const response = { data: { posts } };

      setRecents(response.data.posts);
      setResponseDebug(response.data.posts);
    } catch (error) {
      Alert.alert(url, JSON.stringify(params));
    }
  }, [recents]);

  const pending = useMemo(async () => {
    if (recents.length === 0) {
      return;
    }

    const url = 'technews/refresh';
    const postsFormatted = recents
      .map(({ link }) => { return { link } })
      .splice(0, 20);
    const params = { posts: JSON.stringify(postsFormatted) };
    console.log('requestCheckPending');
    setFeedbackText('Verificando pendentes...');

    try {
      const response = await api.get(url, { params });

      //const dataToSet = response.data.slice(0, 3);
      const dataToSet = response.data;

      setResponseDebug(dataToSet);
      return dataToSet;
    } catch (error) {
      Alert.alert(`Erro: ${url}, ${error.message}`, JSON.stringify(params));
    }
  }, [recents]);

  const created = useMemo(async () => {
    if (pending.length === 0) {
      setFeedbackText('Completo!');
      return;
    }

    const pendingResolved = await pending;

    try {
      //getContent
      console.log('requestCreatePending.details');
      setFeedbackText('Listando post');

      const urlSource = '/technews-source/detail';
      console.log('pending', pendingResolved, typeof pendingResolved);
      const response = await Promise.all(
        pendingResolved.map(url => api.get(urlSource, { params: { url } }))
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
      setIndexOrigin(indexOrigin + 1);
      requestSourceHomePage();
      return true;
    } catch (error) {
      Alert.alert(`Erro`, error.message);
    }
  }, [pending])

  // when starting page
  useEffect(() => {
    console.clear();
    console.log('Page technews/refresh');
    
    setIndexOrigin(0);
    setRecents([]);
    setResponseDebug([]);
    setFeedbackText('');
    
    requestSourceHomePage();
  }, []);

  return (
    <Container style={{ backgroundColor: '#FFF' }}>
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
