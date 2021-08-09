import React, { useState, useCallback } from 'react';
import { ScrollView, Linking, Alert } from 'react-native';

import { navigate } from '../../../RootNavigation';
import { useDefinitions } from '../../../hooks/definitions';
import { appearance, box, general, cache } from '../../../assets/definitions.json';
import { ModalConfirm, ModalPrompt, Switch as SwitchStyled } from '../../../components';
import {
  Container,
  Fieldset,
  Title,
  Label,
  Description,
  Definition,
  DefinitionSwitch,
  AsideSwitch,
} from './styles';

export default function TechNewsDefinitions() {
  const { definitions, updateDefinition, descriptions: currentDescription } = useDefinitions();

  const [promptVisible, setPromptVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [titlePrompt, setTitlePrompt] = useState('');
  const [optionsPrompt, setOptionsPrompt] = useState([]);
  const [identifierPrompt, setIdentifierPrompt] = useState('');

  const [ico, setIco] = useState('');
  const [msg, setMsg] = useState('');

  const handleOpenURL = useCallback((url) => {
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  }, []);

  const handleOpenModal = useCallback(
    ({ title, options, identifier, iconName = '', message = '' }) => {
      if (!message) {
        setPromptVisible(true);

        setTitlePrompt(title);
        setOptionsPrompt(options);
        setIdentifierPrompt(identifier);
      } else {
        setConfirmVisible(true);

        setIco(iconName);
        setMsg(message);
        setIdentifierPrompt(identifier);
      }
    },
    []
  );

  const handleChangeDefinition = useCallback(
    ({ name, value, description = '' }) => {
      setPromptVisible(false);
      updateDefinition({ name, value, description });
    },
    [updateDefinition]
  );

  const handleConfirm = () => {
    setConfirmVisible(false);
    Alert.alert('Cache limpo!');
  };

  return (
    <Container>
      <>
        <ScrollView style={{ paddingTop: 10, paddingBottom: 60, paddingHorizontal: 16 }}>
          <Fieldset>
            <Title>Aparência</Title>

            <Definition onPress={() => handleOpenModal({ ...appearance.loadImage })}>
              <Label>Ativar carregamento de imagens</Label>
              <Description>{currentDescription[appearance.loadImage.identifier]}</Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...appearance.dimensionCaracter })}>
              <Label>Dimensão padrão caracter</Label>
              <Description>
                {currentDescription[appearance.dimensionCaracter.identifier]}
              </Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...appearance.dimensionCaracterArticle })}>
              <Label>Dimensão padrão caracter do artigo</Label>
              <Description>
                {currentDescription[appearance.dimensionCaracterArticle.identifier]}
              </Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...appearance.letterType })}>
              <Label>Tipo de letra</Label>
              <Description>{currentDescription[appearance.letterType.identifier]}</Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...appearance.darkMode })}>
              <Label>Modo escuro</Label>
              <Description>{currentDescription[appearance.darkMode.identifier]}</Description>
            </Definition>
          </Fieldset>

          <Fieldset>
            <Title>Escolha quadro do arquivo</Title>

            <Definition onPress={() => handleOpenModal({ ...box.imageOrientation })}>
              <Label>De que lado mostrar a imagem</Label>
              <Description>{currentDescription[box.imageOrientation.identifier]}</Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...box.theme })}>
              <Label>Tema da interface</Label>
              <Description>{currentDescription[box.theme.identifier]}</Description>
            </Definition>
          </Fieldset>

          <Fieldset>
            <Title>Configurações Gerais</Title>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Ativar a aba de mais recentes</Label>
                <Description>
                  Fazer com que a primeira aba mostre as notícias mais recentes de todos os sites
                  ativos
                </Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.recent.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.recent.identifier,
                    value: !definitions[general.recent.identifier],
                  })}
                value={!!definitions[general.recent.identifier]}
              />
            </DefinitionSwitch>

            <Definition onPress={() => handleOpenModal({ ...general.notifications })}>
              <Label>Notificações</Label>
              <Description>{currentDescription[general.notifications.identifier]}</Description>
            </Definition>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Confirmar saída</Label>
                <Description>Confirmação de saída</Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.exit.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.exit.identifier,
                    value: !definitions[general.exit.identifier],
                  })}
                value={!!definitions[general.exit.identifier]}
              />
            </DefinitionSwitch>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Mantenha a tela ativa</Label>
                <Description>Desative o protetor de tela durante a leitura de artigos</Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.active.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.active.identifier,
                    value: !definitions[general.active.identifier],
                  })}
                value={!!definitions[general.active.identifier]}
              />
            </DefinitionSwitch>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Tela Cheia</Label>
                <Description>Ativa o modo de tela cheia</Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.fullscreen.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.fullscreen.identifier,
                    value: !definitions[general.fullscreen.identifier],
                  })}
                value={!!definitions[general.fullscreen.identifier]}
              />
            </DefinitionSwitch>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Relate anúncios irritantes</Label>
                <Description>Denunciar publicidade maliciosa que impede a leitura</Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.adverts.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.adverts.identifier,
                    value: !definitions[general.adverts.identifier],
                  })}
                value={!!definitions[general.adverts.identifier]}
              />
            </DefinitionSwitch>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Desative a aceleração de HW</Label>
                <Description>
                  Melhore a estabilidade da aplicação desativando a aceleração gráfica de hardware
                </Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.acceleration.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.acceleration.identifier,
                    value: !definitions[general.acceleration.identifier],
                  })}
                value={!!definitions[general.acceleration.identifier]}
              />
            </DefinitionSwitch>

            <DefinitionSwitch>
              <AsideSwitch>
                <Label>Preferir versão móvel</Label>
                <Description>Preferir versão móvel oara websites que a forneçam</Description>
              </AsideSwitch>
              <SwitchStyled
                isEnabled={!!definitions[general.mobile.identifier]}
                onValueChange={() =>
                  handleChangeDefinition({
                    name: general.mobile.identifier,
                    value: !definitions[general.mobile.identifier],
                  })}
                value={!!definitions[general.mobile.identifier]}
              />
            </DefinitionSwitch>

            <Definition onPress={() => navigate('TechNewsSocialAuth', {})}>
              <Label>Logar</Label>
              <Description>Autenticação social</Description>
            </Definition>
          </Fieldset>

          <Fieldset>
            <Title>Cache e Cookies</Title>

            <Definition onPress={() => handleOpenModal({ ...cache.clearInterval })}>
              <Label>Limpeza de Cache automática e cookies</Label>
              <Description>{currentDescription[cache.clearInterval.identifier]}</Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...cache.clearNow })}>
              <Label>Limpar a cache e cookies agora</Label>
              <Description>Limpar cache e cookies</Description>
            </Definition>

            <Definition onPress={() => handleOpenModal({ ...cache.publicity })}>
              <Label>Mudar a publicidade</Label>
              <Description>Mudar o modelo de publicidade</Description>
            </Definition>
          </Fieldset>

          <Fieldset>
            <Title>Sobre</Title>

            <Definition onPress={() => handleOpenURL('https://play.google.com/store/')}>
              <Label>Privacy Policy</Label>
            </Definition>

            <Definition onPress={() => handleOpenURL('https://play.google.com/store/')}>
              <Label>Versão</Label>
              <Description>1.9.1</Description>
            </Definition>
          </Fieldset>
        </ScrollView>

        <ModalPrompt
          visible={promptVisible}
          title={titlePrompt}
          identifier={identifierPrompt}
          options={optionsPrompt}
          currentValue={String(definitions[identifierPrompt])}
          onChange={handleChangeDefinition}
          onCancel={() => setPromptVisible(false)}
        />

        <ModalConfirm
          visible={confirmVisible}
          iconName={ico}
          title={titlePrompt}
          message={msg}
          onCancel={() => setConfirmVisible(false)}
          onConfirm={() => handleConfirm()}
        />
      </>
    </Container>
  );
}
