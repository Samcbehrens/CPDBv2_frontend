import { sugarCaneColor, whiteTwoColor } from 'utils/styles';
import { MOBILE_BREAK_POINT } from 'utils/constants';


export const containerStyle = {
  display: 'block',
  width: 'calc(100% - 32px)',
  height: '361px',
  backgroundColor: sugarCaneColor,
  boxSizing: 'border-box',
  position: 'absolute',
  top: '16px',
  left: '16px',
  minWidth: `${MOBILE_BREAK_POINT / 2 - 32}px`,
};

export const footerStyle = {
  borderTop: `solid 1px ${whiteTwoColor}`,
  width: '100%',
  height: '56px',
  lineHeight: '56px',
  boxSizing: 'border-box',
  position: 'relative',
  bottom: 0,
  fontSize: '14px',
};

export const questionMarkStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: 'white',
  opacity: 0.6,
  borderRadius: '12px',
  position: 'absolute',
  right: '16px',
  top: '16px',
  boxSizing: 'border-box',
  cursor: 'pointer'
};

export const questionMarInnerStyle = {
  opacity: 1,
  padding: '4px 9px',
  display: 'block',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '14px'
};
