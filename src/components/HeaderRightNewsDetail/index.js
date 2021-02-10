import React from 'react';

import { useDetailActions } from '../../hooks/detailActions';
import { Container, Action } from './styles';

export default function HeaderRightNewsDetail() {
  const { decreaseFont, increaseFont, toggleRender, setShareIsPending } = useDetailActions();

  return (
    <Container>
      <Action name="text-format" onPress={decreaseFont} />
      <Action name="text-format" onPress={increaseFont} />
      <Action name="public" onPress={toggleRender} />
      <Action name="share" onPress={() => setShareIsPending(true)} />
    </Container>
  );
}
