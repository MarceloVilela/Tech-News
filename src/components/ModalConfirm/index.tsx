import React from 'react';
import { Text, Modal, TouchableOpacity } from 'react-native';

import {
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  MessageConfirm
} from './styles';

interface ModalConfirmProps {
  visible: boolean;
  iconName: string;
  title: string;
  onCancel(): void;
  onConfirm(): void;
  message: string;
};

export default function ModalConfirm({ visible, iconName, title, onCancel, onConfirm, message }: ModalConfirmProps) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalIcon name={iconName} />
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>

          <MessageConfirm>{message}</MessageConfirm>

          <ModalFooter>
            <TouchableOpacity onPress={onCancel} style={{ width: 90 }}>
              <Text style={{ color: '#1B75CB' }}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm} style={{ width: 20 }}>
              <Text style={{ color: '#1B75CB' }}>OK</Text>
            </TouchableOpacity>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
