import { clayGray, accentColor, sugarCaneColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = hovering => ({
  height: '28px',
  lineHeight: '28px',
  fontWeight: 300,
  color: hovering ? accentColor : clayGray,
  cursor: 'pointer',
  marginTop: '6px',
  padding: '0 8px 0 9px',
  backgroundColor: sugarCaneColor,
  borderRadius: '2px',
  display: 'inline-block',
  float: 'right',
});

export const textStyle = {
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '28px',
};

export const arrowStyle = hovering => ({
  background: hovering ?
    `url("${imgUrl('disclosure-indicator-hover.svg')}") 8px 0 no-repeat scroll`:
    `url("${imgUrl('disclosure-indicator.svg')}") 8px 0 no-repeat scroll`,
  width: '8px',
  height: '13px',
  paddingRight: '14px',
  display: 'inline-block',
  position: 'relative',
  top: '1px',
});