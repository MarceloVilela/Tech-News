import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';

import api from '../../../services/api';
import jsonbin from '../../../services/jsonbin';
import { origins } from '../../../assets/origins.json';


import Container from '../../../components/Container';
import Button from '../../../components/Button';
import { INavigation } from '../../../RootNavigation';

import { Small } from './styles';


interface TechNewsRefreshProps {
  navigation: INavigation;
}

export default function TechNewsPlaceholder({ navigation }: TechNewsRefreshProps) {
  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const refresh = async ({ title, url, BIN_ID, index }) => {
      navigation?.setOptions({
        title: `Placeholder | ${title}`,
      });
      setFeedbackText(`${index + 1} de ${origins.length + 1}`);

      let data = {};
      const params = {
        page: 1,
        url,
      }

      try {
        const response = await api.get('/technews/post/origin', { params });
        data = response.data;

        // Alert.alert(url, JSON.stringify(params, null, 2));return;
      } catch (error) {
        Alert.alert(
          `Erro ao listar artigos ${title}`,
          error.data ? JSON.stringify(error.data, null, 2) : error.message
        );

        setResponseDebug([params, error]);
      }

      try {
        await jsonbin.put(BIN_ID, data);
      } catch (error) {
        Alert.alert(
          `Erro ao gerar placeholder ${title}`,
          error.data ? JSON.stringify(error.data, null, 2) : error.message
        );

        setResponseDebug([error]);
      }
    };

    const iterateOrigins = async () => {
      const originRecent = {
        title: 'Mais Recentes',
        url: '',
        BIN_ID: '6092cee092cb9267d0ce0e00',
      }
      const originsIncremented = [originRecent, ...origins];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < originsIncremented.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await refresh({ ...originsIncremented[i], index: i });
      }
    }

    iterateOrigins();
  }, [navigation]);

  // when starting page
  useEffect(() => {
    setResponseDebug([]);
    setFeedbackText('');
  }, []);

  return (
    <Container style={{ backgroundColor: '#FFF' }}>
      <>
        <ScrollView style={{ backgroundColor: 'black', paddingVertical: 16, paddingHorizontal: 8 }}>
          <Small style={{ color: 'yellow' }}>{JSON.stringify(responseDebug, null, 2)}</Small>
        </ScrollView>

        <Button handleOnPress={() => { }}>
          <>{feedbackText}</>
        </Button>
      </>
    </Container>
  );
}
