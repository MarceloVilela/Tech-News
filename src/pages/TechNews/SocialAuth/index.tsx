/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';
import PropTypes from 'prop-types';

import env from '../../../../env';
import { navigate, INavigation } from '../../../RootNavigation';
import { Button, Container } from '../../../components';
import { Wrapper } from './styles';

interface SocialAuthProps {
  navigation: INavigation;
}

export default function SocialAuth({ navigation }: SocialAuthProps) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@TechNews:userEmail');

        if (value !== null) {
          setUserEmail(userEmail);
          navigation.setOptions({ title: userEmail });
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    _retrieveData();
  }, [userEmail, navigation]);

  const handleGoogleLoginPress = async () => {
    try {
      const _storeData = async (email: string) => {
        try {
          await AsyncStorage.setItem('@TechNews:userEmail', email);
        } catch (error) {
          // Error saving data
        }
      };

      await _storeData('');
      setUserEmail('');

      const result = await Google.logInAsync({
        androidClientId: env.GOOGLE_ANDROID_CLIENT_ID
        // iosClientId: GOOGLE_IOS_CLIENT_ID,
      });

      if (result.type === 'success') {
        const { user } = result;
        await _storeData(user.email ? user.email : '');
        setUserEmail(user.email ? user.email : '');

        // navigate('TechNewsDefinitions');
      }
    } catch (e) {
      Alert.alert('Erro ao autenticar via Google');
    }
  };

  return (
    <Container>
      <Wrapper>
        {userEmail ? (
          <>
            <Button handleOnPress={() => navigate('TechNewsRefresh', {})}><>Buscar novos artigos</></Button>

            <Button handleOnPress={() => navigate('TechNewsPlaceholder', {})}><>Atualizar placeholder</></Button>
          </>
        ) : (
          <>
            <Button handleOnPress={() => { handleGoogleLoginPress() }}><>Google</></Button>
          </>
        )}
      </Wrapper>
    </Container>
  );
}

SocialAuth.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
}
