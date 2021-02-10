const isValidArticle = ({ link, title, thumb }) => {
  const isBlank = (prop) => !prop || prop === 'null' || prop === 'undefined';
  const props = { link, title, thumb };
  const propsBlank = Object.keys(props).filter((prop) => isBlank(props[prop]));
  if (propsBlank.length) {
    return false;
  }

  function validURL(str) {
    const pattern = new RegExp(
      '^((https?:)?\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  const propsCheckIsUrl = { link, thumb };
  const propsInvalidUrl = Object.keys(propsCheckIsUrl).filter(
    (prop) => !validURL(propsCheckIsUrl[prop])
  );
  if (propsInvalidUrl.length) {
    return false;
  }

  return true;
};

export default isValidArticle;
