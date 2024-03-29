import React, { useCallback, useState } from 'react';
import { Linking, Modal, View, Text, ScrollView, Alert } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { navigate } from '../../RootNavigation';
import { origins } from '../../assets/origins.json';
import {
  Container,
  ActionConfig,
  ActionSelect,
  OptionText,
  ModalTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  SwitchTouchable,
  SwitchOption,
} from './styles';
import { placeholder } from './textPlaceholder';
import { TouchableOpacity } from '../Button/styles';
import { day, night } from '../../styles';
import { useDefinitions } from '../../hooks/definitions';

export default function HeaderRight() {
  const { definitions } = useDefinitions();
  const theme = definitions?.appearance_darkMode === 'true' ? night : day;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalChangelogVisible, setModalChangelogVisible] = useState(false);

  const handleSwitchToFeed = useCallback(({ url, title }) => {
    setModalVisible(false);
    navigate(title, { id: url, tabTitle: title });
  }, []);

  const handleSendFeedBack = useCallback(() => {
    const url = 'mailto:support@example.com';
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  }, []);

  const handleNavigateToDefinitions = useCallback(() => {
    navigate('TechNewsDefinitions', {});
  }, []);

  const handleSendStore = useCallback((id = 'it.pinenuts.rassegnastampa') => {
    const url = `market://details?id=${id}`;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  }, []);

  return (
    <Container>
      <ActionSelect name="reply" onPress={() => setModalVisible(!modalVisible)} />

      <Menu style={{ marginRight: 5 }}>
        <MenuTrigger>
          <ActionConfig name="more-vert" />
        </MenuTrigger>
        <MenuOptions style={{ backgroundColor: theme.background500 }}>
          <MenuOption onSelect={handleSendFeedBack}>
            <OptionText style={{ color: theme.foreground500 }}>Enviar Feedback</OptionText>
          </MenuOption>
          <MenuOption onSelect={handleNavigateToDefinitions}>
            <OptionText style={{ color: theme.foreground500 }}>Definições...</OptionText>
          </MenuOption>
          <MenuOption onSelect={() => setModalChangelogVisible(true)}>
            <OptionText style={{ color: theme.foreground500 }}>ChangeLog</OptionText>
          </MenuOption>
          <MenuOption onSelect={handleSendStore}>
            <OptionText style={{ color: theme.foreground500 }}>Imprensa de Bolso App</OptionText>
          </MenuOption>
          {/* <MenuOption onSelect={handleNavigateToRefresh}><OptionText>Refresh</OptionText></MenuOption> */}
          <MenuOption onSelect={() => Alert.alert('Sair')}>
            <OptionText style={{ color: theme.foreground500 }}>Sair</OptionText>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalContent style={{ backgroundColor: theme.background500 }}>
            <ModalTitle style={{ color: theme.foreground600 }}>Mudar para feed</ModalTitle>

            <ScrollView>
              <SwitchTouchable 
                onPress={() => handleSwitchToFeed({ url: '', title: 'recentes' })}
                style={{ borderColor: theme.foreground600 }}
              >
                <SwitchOption style={{ color: theme.foreground500 }}>Mais recentes</SwitchOption>
              </SwitchTouchable>
              {origins.map(({ title, url }) => (
                <SwitchTouchable
                  key={url}
                  onPress={() => handleSwitchToFeed({ url, title })}
                  style={{ borderColor: theme.foreground600 }}
                >
                  <SwitchOption style={{ color: theme.foreground500 }}>{title}</SwitchOption>
                </SwitchTouchable>
              ))}
            </ScrollView>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal animationType="slide" transparent visible={modalChangelogVisible}>
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Change Log</ModalTitle>

            <View style={{ flex: 1 }}>
              <ScrollView>
                <Text>{placeholder}</Text>
              </ScrollView>
            </View>

            <ModalFooter>
              <TouchableOpacity
                onPress={() => setModalChangelogVisible(!modalChangelogVisible)}
                style={{ width: 40 }}
              >
                <Text style={{ color: 'blue' }}>OK</Text>
              </TouchableOpacity>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container >
  );
}
