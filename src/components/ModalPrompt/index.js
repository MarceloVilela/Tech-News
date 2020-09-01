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

export default function ModalPrompt({ visible, title, identifier, options, currentValue, onChange, onCancel }) {
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
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>

          <ScrollView>
            {options.map(({ label, value }) => (
              <Option onPress={() => onChange({ name: identifier, value })}>
                <RadioButton selected={value === currentValue} />
                <OptionLabel>{label}</OptionLabel>
              </Option>
            ))}
          </ScrollView>

          <ModalFooter>
            <TouchableOpacity
              onPress={onCancel}
              style={{ width: 90 }}
            >
              <Text style={{ color: '#1B75CB' }}>CANCELAR</Text>
            </TouchableOpacity>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}
