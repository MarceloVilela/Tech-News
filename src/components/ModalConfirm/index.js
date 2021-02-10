import React from 'react';
import { Text, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  MessageConfirm
} from './styles';

export default function ModalConfirm({ visible, iconName, title, onCancel, onConfirm, message }) {
  return (
    <Modal animationType="slide" transparent visible={visible} on>
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

ModalConfirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
