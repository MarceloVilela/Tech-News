import * as React from 'react';
import { View, Button } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';


import env from '../../../../env';
import { navigate } from '../../../RootNavigation';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [userEmail, setUserEmail] = useState('marcelo.vilela.s@gmail.com');

  useEffect(() => {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@TechNews:userEmail');
        alert(`Recuperou ${value}`);
        if (value !== null) {
          setUserEmail(userEmail)
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    _retrieveData();
  }, []);

  const handleGoogleLoginPress = async () => {
    try {
      _storeData = async (email) => {
        try {
          alert(`Armazenou ${email}`);
          await AsyncStorage.setItem('@TechNews:userEmail', email);
        } catch (error) {
          // Error saving data
        }
      };

      await _storeData(null);
      setUserEmail('');

      const { type, accessToken, idToken, refreshToken, user } = await Google.logInAsync({
        androidClientId: env.GOOGLE_ANDROID_CLIENT_ID,
        //iosClientId: GOOGLE_IOS_CLIENT_ID,
      });

      if (type === 'success') {
        await _storeData(user.email);
        setUserEmail(user.email);

        //navigate('TechNewsDefinitions');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View>
      {/*<Button title="Start" onPress={handleStartPress} />*/}
      <View style={{ display: 'flex', height: '100%', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#ccc' }}>
        {userEmail
          ? (
            <>
              <Button
                title="Buscar novos artigos"
                onPress={() => navigate('TechNewsRefresh')}
                style={{ flex: 1 }}
              />
            </>
          ) : (
            <>
              <Button
                title="Google"
                onPress={handleGoogleLoginPress}
                style={{ flex: 1 }}
              />
            </>
          )
        }
      </View>
    </View >
  );
}