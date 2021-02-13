import React from 'react';
import { Text, ScrollView, Modal, TouchableOpacity } from 'react-native';

import {
  ModalHeader,
  ModalTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  //
  Option,
  OptionLabel
} from './styles';
import RadioButton from '../RadioButton';

interface OnChangeParams {
  name: string;
  value: string;
  description: string;
}

interface Option {
  label: string;
  value: string;
}

interface ModalConfirmProps {
  visible: boolean;
  title: string;
  identifier: string;
  options: Option[];
  currentValue: string;
  onChange(params: OnChangeParams): void;
  onCancel(): void;
};

export default function ModalPrompt({
  visible,
  title,
  identifier,
  options,
  currentValue,
  onChange,
  onCancel
}: ModalConfirmProps) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>

          <ScrollView>
            {options.map(({ label, value }) => (
              <Option key={value} onPress={() => onChange({ name: identifier, value, description: label })}>
                <RadioButton selected={value === currentValue} />
                <OptionLabel>{label}</OptionLabel>
              </Option>
            ))}
          </ScrollView>

          <ModalFooter>
            <TouchableOpacity onPress={onCancel} style={{ width: 90 }}>
              <Text style={{ color: '#1B75CB' }}>CANCELAR</Text>
            </TouchableOpacity>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
