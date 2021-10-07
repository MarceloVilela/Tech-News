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
    const pattern = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    return !!pattern.test(str);
  }
  if (!validURL(link) || !validURL(thumb)) {
    return false;
  }

  return true;
};

export default isValidArticle;
