import {
  hawkesBlue,
  clayGray,
  softBlackColor,
  sugarCaneColor,
} from 'utils/styles';


export const wrapperStyle = {
  width: '232px',
  borderRadius: '2px',
  border: `solid 1px ${ hawkesBlue }`,
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

export const rowStyle = {
  margin: '10px 16px 12px 16px',
};

export const titleStyle = {
  fontSize: '12px',
  lineHeight: '14px',
  fontWeight: 300,
  textAlign: 'left',
  color: clayGray
};

export const contentStyle = {
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 500,
  textAlign: 'left',
  color: softBlackColor,
};

export const footerStyle = {
  backgroundColor: sugarCaneColor,
};
