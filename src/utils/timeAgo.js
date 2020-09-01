import { formatRelative, parseISO, isValid } from 'date-fns';
import locale from 'date-fns/esm/locale/pt-BR';

const timeAgo = (date) => {
  if (!isValid(parseISO(date))) {
    return '';
  }

  const now = new Date();

  const timeAgo = formatRelative(
    parseISO(date),
    now,
    { locale }
  );

  return timeAgo;
}

export default timeAgo;
