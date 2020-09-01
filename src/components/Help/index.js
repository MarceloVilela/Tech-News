import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Answered,
  Check,
  AnsweredLabel,
  Time,
  Body,
  Question,
} from './styles';

export default function Help({ data, navigation }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
    });
  }, [data.created_at]);

  const textLabel = useMemo(() => {
    return data.answer ? 'Respondido' : 'Sem resposta';
  }, [data.answer]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpDetails', { helpOrderData: data });
      }}
    >
      <Container>
        <Header>
          <Answered>
            <Check answered={!!data.answer} />
            <AnsweredLabel answered={!!data.answer}>{textLabel}</AnsweredLabel>
          </Answered>
          <Time>{dateParsed}</Time>
        </Header>
        <Body>
          <Question>{data.question}</Question>
        </Body>
      </Container>
    </TouchableOpacity>
  );
}

Help.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
