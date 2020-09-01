import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Text, View, ScrollView, Modal, TouchableOpacity, Dimensions, Linking, Alert } from "react-native";

import {
  Definition,
  //
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  //
  Option,
  OptionLabel,
  MessageConfirm
} from './styles'
import RadioButton from "../RadioButton";

export default function ModalConfirm({ visible, iconName, title, onCancel, onConfirm, message }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      on
    >
      <ModalContainer>
        <ModalContent>

          <ModalHeader>
            <ModalIcon name={iconName} />
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>

          <MessageConfirm>{message}</MessageConfirm>

          <ModalFooter>
            <TouchableOpacity
              onPress={onCancel}
              style={{ width: 90 }}
            >
              <Text style={{ color: '#1B75CB' }}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{ width: 20 }}
            >
              <Text style={{ color: '#1B75CB' }}>OK</Text>
            </TouchableOpacity>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}
