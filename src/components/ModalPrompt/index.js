import React from 'react';
import { Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

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

export default function ModalPrompt({
  visible,
  title,
  identifier,
  options,
  currentValue,
  onChange,
  onCancel
}) {
  return (
    <Modal animationType="slide" transparent visible={visible} on>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>

          <ScrollView>
            {options.map(({ label, value }) => (
              <Option key={value} onPress={() => onChange({ name: identifier, value })}>
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

ModalPrompt.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  currentValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ModalPrompt.defaultProps = {
  currentValue: '',
};
