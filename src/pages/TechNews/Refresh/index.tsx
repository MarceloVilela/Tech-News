import React, { useEffect, useState } from 'react';
// import { Alert } from 'react-native';

import api from '../../../services/api';
import { origins } from '../../../assets/origins.json';
import Container from '../../../components/Container';
import { ScrollView, ActionsWrapper, Small } from './styles';
import { isValidArticle } from '../../../utils';
import { INavigation } from '../../../RootNavigation';
import { Button } from '../../../components';

interface Content {
  type: 'text' | 'video' | 'image' | 'text_highlighted';
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
  const [errorMessages, setErrorMessages] = useState<String[]>([]);
  const [display, setDisplay] = useState('debug');

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
        const messageTitle = `${origins[indexOrigin].title} - Erro ao listar homepage \n`;
        const messageContent = `${url} ${JSON.stringify(params)}`;
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageContent, messageContent);
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
        const messageTitle = `${origins[indexOrigin].title} - Erro ao checar pendentes \n`;
        const messageContent = `${urlToCheck}\n${error.message}\n${JSON.stringify(
          error.response,
          null,
          2
        )}`;
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageTitle, messageContent);
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
        const response = (await Promise.all(
          pendingResolved.map((urlToList: string) =>
            api.get(urlSource, { params: { url: urlToList } })
          )
        )) as ResponseDetail[];

        const responsesFiltered = response
          .filter(({ data: item }) => item.link && item.thumb)
          .filter(({ data: item }) => item.link.includes('http') && item.thumb.includes('http'))
          .filter(({ data: item }) => isValidArticle(item));

        setFeedbackText('Armazenando post...');

        const messageTitle = `${origins[indexOrigin].title} - Erro ao enviar artigo \n`;
        const urlCreate = '/technews/post';
        await Promise.all(
          responsesFiltered.map(({ data }) =>
            api
              .post(urlCreate, data)
              .catch(() =>
                setErrorMessages((prevState) => [...prevState, messageTitle + data.link])
              )
          )
        );

        if (indexOrigin === origins.length - 1) {
          setFeedbackText('Completo!!!');
        } else {
          setIndexOrigin(indexOrigin + 1);
        }
      } catch (error) {
        const messageTitle = `${origins[indexOrigin].title} - Erro ao enviar artigo \n`;
        const messageContent = error.message;
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageTitle, messageContent);
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
    <Container>
      <>
        <ScrollView>
          {display === 'debug' ? (
            <Small>{JSON.stringify(responseDebug, null, 2)}</Small>
          ) : (
            <Small>{JSON.stringify(errorMessages, null, 2)}</Small>
          )}
        </ScrollView>

        <ActionsWrapper>
          {display === 'debug' ? (
            <Button handleOnPress={() => setDisplay('error')}>
              <>Exibir erros</>
            </Button>
          ) : (
            <Button handleOnPress={() => setDisplay('debug')}>
              <>Exibir debug</>
            </Button>
          )}

          <Button handleOnPress={() => {}}>
            <>Etapa - {feedbackText}</>
          </Button>
        </ActionsWrapper>
      </>
    </Container>
  );
}
