const isValidUrl = (url: string) => {
  try {
    const _ = new URL(url);
  } catch (_) {
    return false;
  }

  return url.match(/^http:\/\/|https:\/\/|:\/\//);
};

export default isValidUrl;
