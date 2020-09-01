const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  return data.thumb.startsWith('https://') || data.thumb.startsWith('http://');
}

export default isValidUrl;