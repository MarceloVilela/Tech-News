const sourceLabel = (link) => String(link.replace('www.', '')).split('/')[2];

export default sourceLabel;
