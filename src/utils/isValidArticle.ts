interface ValidateParams {
  link: string;
  title: string;
  thumb: string;
}

const isValidArticle = ({ link, title, thumb }: ValidateParams) => {
  const isBlank = (prop: string) => !prop || prop === 'null' || prop === 'undefined';
  if (isBlank(link) || isBlank(title) || isBlank(thumb)) {
    return false;
  }

  function validURL(str: string) {
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
  if (!validURL(link) || !validURL(thumb)) {
    return false;
  }

  return true;
};

export default isValidArticle;
