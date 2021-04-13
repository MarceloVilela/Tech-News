import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Alert } from 'react-native';

import { useNavigationState } from '@react-navigation/native';

import api from '../../../services/api';
import { sourceLabel, timeAgo } from '../../../utils';
import Preview from '../../../components/Preview';
import Container from '../../../components/Container';
import { IRoute, INavigation } from '../../../RootNavigation';

interface HistoryKey {
  key?: string;
}

export interface IPreviewData {
  id: string;
  link: string;
  title: string;
  thumb: string;
  created_at: string;
  posted_at?: string;
  timeAgo?: string;
  sourceLabel?: string;
}

interface IPreview {
  data: IPreviewData[];
  total: number;
  count: number;
}

interface ArticlesProps {
  route: IRoute;
  navigation: INavigation;
}

export default function Articles({ navigation, route }: ArticlesProps) {
  const { id: origin } = route.params;

  const [data, setData] = useState([] as IPreviewData[]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fineshed, setFineshed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const placeholderData = [...Array(10).keys()].map(({ _data, key }) => ({
    id: key,
    link: '',
    title: '',
    thumb: '',
    created_at: new Date().toISOString(),
    sourceLabel: '',
    timeAgo: '',
  }));

  const load = useCallback(
    async (pageNumber = 1, originUrl) => {
      if (fineshed) {
        return;
      }

      if (refreshing) {
        return;
      }

      if (page === pageNumber && pageNumber !== 1) {
        return;
      }

      try {
        setLoading(true);

        const url = `/technews/post/origin`;
        const params = {
          page: pageNumber,
          url: originUrl,
        };

        const response = await api.get<IPreview>(url, { params });
        const { data: result, total } = response.data;

        const add = result.map((item) => ({
          ...item,
          timeAgo: item.posted_at ? timeAgo(item.posted_at) : '',
          sourceLabel: sourceLabel(item.link),
        }));

        setData((previousValue: IPreviewData[]) => [...previousValue, ...add]);
        setRefreshing(false);
        setPage(pageNumber);

        if (pageNumber === Math.ceil(total / 20 ? total / 20 : 1)) {
          setFineshed(true);
        }
      } catch (error) {
        Alert.alert(
          'Erro ao listar posts',
          error.data ? JSON.stringify(error.data, null, 2) : error.message
        );
      } finally {
        setLoading(false);
      }
    },
    [fineshed, page, refreshing]
  );

  const isFocused = useNavigationState((state) => {
    const { key } = state.history
      ? (state.history[state.history.length - 1] as HistoryKey)
      : { key: '' };
    const response = key && key.startsWith(route.name);
    return response;
  });

  // when starting page
  useEffect(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setFineshed(false);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    if (isFocused && data.length === 0) {
      load(page, origin);
    }
  }, [navigation, isFocused, data.length, load, origin, page]);

  // infinite scroll
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    if (nextPage > page) {
      load(nextPage, origin);
    }
  }, [page, origin, load]);

  // pull to refresh
  /* const refreshList = () => {
    // reset
    setPage(1);
    setFineshed(false);
    setRefreshing(true);

    // load again
    // load();
  }; */

  if (!isFocused) {
    return <View />;
  }

  return (
    <Container loading={loading || refreshing}>
      <>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Preview data={item} navigation={navigation} placeholder={false} />
          )}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingTop: 10 }}
        />

        {loading && !refreshing && (
          <>
            {placeholderData.map((item) => (
              <Preview data={item} navigation={navigation} placeholder />
            ))}
          </>
        )}
      </>
    </Container>
  );
}
