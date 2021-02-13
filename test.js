const fns = require('date-fns');

const { formatRelative, parseISO } = fns;

const data = { posted_at: '2020-08-13T16:08:25.351Z' };
const now = new Date();

const timeAgo = formatRelative(parseISO(data.posted_at), now);

console.log(timeAgo);
