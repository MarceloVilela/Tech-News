import _styled from 'styled-components/native';

const styles = {
  spacing_int: 20,
  spacing: '20px',
  spacingSmall: '10px',
  colorLink: '#026AA2',

  font: '16px',

  fontTitle: {
    smaller: '22px',
    small: '23px',
    default: '24px',
    big: '25px',
    bigger: '26px'
  },

  fontSubTitle: {
    smaller: '18px',
    small: '19px',
    default: '20px',
    big: '21px',
    bigger: '22px'
  },

  fontParagraph: {
    smaller: '12px',
    small: '14px',
    default: '16px',
    big: '18px',
    bigger: '20px'
  }
};

export const preDefined = {
  link: {
    color: styles.colorLink,
    'text-decoration': 'underline'
  }
};

export default styles;
