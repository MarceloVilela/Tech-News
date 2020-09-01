import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text, View } from 'react-native';
import { Animated } from 'react-native';
import { useCollapsibleStack } from 'react-navigation-collapsible';

//import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigationFocus } from "react-navigation";

import api from "../../../services/api";
import { sourceLabel, timeAgo } from "../../../utils";

import Preview from "../../../components/Preview";

//import Button from "~/components/Button";
import Container from "../../../components/Container";
import { List } from "./styles";
import { useNavigationState } from "@react-navigation/native";

export default function Main({ navigation, route }) {
  //const { id } = useSelector(state => state.auth);
  const [loadingNew, setLoadingNew] = useState(false);
  const { id: origin } = route.params;
  const { tabTitle } = route.params;

  // list checkins
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fineshed, setFineshed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (pageNumber = 1, origin) => {
    if (fineshed) {
      console.log('nao requisita - acabou');
      return;
    }

    if (refreshing) {
      console.log('nao requisita - carregando');
      return;
    }

    if (page === pageNumber && pageNumber !== 1) {
      console.log('nao requisita - repetido');
      return;
    }

    try {
      setLoading(true);

      const url = `/technews/post/origin`;
      const params = {
        page: pageNumber,
        url: origin
      }
      console.log(`/technews/post/origin`, params);
      const response = await api.get(url, { params });
      const { data: result, total } = response.data;

      const add = result.map(item => ({
        ...item,
        //date: item.posted_at ? item.posted_at : item.created_at,
        timeAgo: timeAgo(item.posted_at),
        sourceLabel: sourceLabel(item.link)
      }))

      setData(previousValue => ([...previousValue, ...add]));
      setRefreshing(false);
      setPage(pageNumber);

      if (pageNumber === Math.ceil(total / 20 ? total / 20 : 1)) {
        setFineshed(true);
      }
    }
    catch (error) {
      console.log(error, error.message)
      alert(error);
    }
    finally {
      setLoading(false);
    }
  }

  const isFocused = useNavigationState(state => {
    const key = state.history[state.history.length - 1].key;
    const response = key.startsWith(route.name);
    //console.log(`${route.name} = ${key} : ${response ? 'TRUE' : 'FALSE'}`);
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
      console.log(`backtrace - effect - ${route.name}`);
      load(page, origin);
    }
  }, [navigation, isFocused]);

  // infinite scroll
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    console.log(`backtrace - callback - ${route.name}`);
    if (nextPage > page) {
      load(nextPage, origin);
    }
  }, [page, origin]);

  // pull to refresh
  const refreshList = () => {
    // reset
    setPage(1);
    setFineshed(false);
    setRefreshing(true);

    // load again
    //load();
  };


  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    /* Animated.AnimatedInterpolation by scrolling */
    translateY /* 0.0 ~ -headerHeight */,
    progress /* 0.0 ~ 1.0 */,
    opacity /* 1.0 ~ 0.0 */,
  } = useCollapsibleStack();

  if (!isFocused) {
    return <View></View>;
  }

  return (
    <Container loading={loading || refreshing}>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Preview data={item} navigation={navigation} />}

        /* infinite scroll */
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.1}

        /*onScroll={onScroll}*/

        /* */
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </Container>
  );
}
