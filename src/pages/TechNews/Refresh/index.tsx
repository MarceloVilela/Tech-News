import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';

import api from '../../../services/api';
import { origins } from '../../../assets/origins.json';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import { Small } from './styles';
import { isValidArticle } from '../../../utils';
import { INavigation } from '../../../RootNavigation';

interface Content {
  type: "text" | "video" | "image" | "text_highlighted";
  value: string;
  key?: number;
  content?: string;
}

interface ArticleDetails {
  link: string;
  title: string;
  thumb: string;
  created_at: Date;
  contents: Content[];
}

interface ResponseDetail {
  data: ArticleDetails;
}

interface HomePageItem {
  link: string;
  title: string;
  thumb: string;
  created_at: string;
}

interface ResponseHomePage {
  posts: HomePageItem[];
}

interface TechNewsRefreshProps {
  navigation: INavigation;
}

export default function TechNewsRefresh({ navigation }: TechNewsRefreshProps) {
  const [indexOrigin, setIndexOrigin] = useState(-1);

  // const [recents, setRecents] = useState([]);

  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const refresh = async () => {
      if (!origins[indexOrigin]) {
        return;
      }
      navigation?.setOptions({
        title: `Refresh[${indexOrigin + 1} de ${origins.length}]: ${origins[indexOrigin].url}`,
      });

      const url = `/technews-source`;
      const params = { url: origins[indexOrigin].url };
      setFeedbackText('Listando homepage...');

      let recents = [] as HomePageItem[];
      try {
        const response = await api.get<ResponseHomePage>(url, { params });
        recents = response.data.posts;
        setResponseDebug(response.data.posts as any);
      } catch (error) {
        Alert.alert(
          `Erro ao listar homepage ${origins[indexOrigin].title}`,
          `${url} JSON.stringify(params)`
        );
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      //
      //
      //
      if (recents.length === 0) {
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      const urlToCheck = 'technews/refresh';
      const postsFormatted = recents.map(({ link }) => ({ link })).splice(0, 20);
      setFeedbackText('Verificando pendentes...');

      let pending = [];
      try {
        const response = await api.post(urlToCheck, postsFormatted);
        pending = response.data;
        setResponseDebug(response.data);
      } catch (error) {
        Alert.alert(
          `Erro ao checar pendentes ${origins[indexOrigin].title}`,
          `${urlToCheck}\n${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      //
      //
      //
      if (!pending || pending.length === 0) {
        setFeedbackText('Não restam pendentes');
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      const pendingResolved = pending;

      setFeedbackText('Listando post');
      const urlSource = '/technews-source/detail';
      try {
        const response = await Promise.all(
          pendingResolved.map((urlToList: string) => api
            .get(urlSource, { params: { url: urlToList } }))
        ) as ResponseDetail[];

        const responsesFiltered = response
          .filter(({ data: item }) => item.link && item.thumb)
          .filter(({ data: item }) => item.link.includes('http') && item.thumb.includes('http'))
          .filter(({ data: item }) => isValidArticle(item));

        setFeedbackText('Armazenando post...');

        const urlCreate = '/technews/post';
        await Promise.all(responsesFiltered.map(({ data }) => api.post(urlCreate, data)));

        if (indexOrigin === origins.length - 1) {
          setFeedbackText('Completo!!!');
        } else {
          setIndexOrigin(indexOrigin + 1);
        }
      } catch (error) {
        Alert.alert(
          `Erro ao enviar artigo ${origins[indexOrigin].title}`,
          error.data ? JSON.stringify(error.data, null, 2) : error.message
        );
        setIndexOrigin(indexOrigin + 1);
      }
    };
    refresh();
  }, [indexOrigin, navigation]);

  // when starting page
  useEffect(() => {
    // setRecents([]);
    setResponseDebug([]);
    setFeedbackText('');
    setIndexOrigin(0);

    // requestSourceHomePage();
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
