import { accentColor, clayGray, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = (hovering) => ({
  backgroundColor: hovering ? 'white': 'inherit',
  height: '132px',
  width: '120px',
  display: 'inline-block',
  textAlign: 'center',
  paddingTop: '14px',
  verticalAlign: 'bottom'
});

export const attachmentImageStyle = (hovering) => ({
  border: `solid 1px ${hovering ? accentColor : whiteTwoColor}`,
  height: '60px',
  width: '45px',
  boxSizing: 'border-box',
});

export const outboundLinkStyle = {
  display: 'block'
};

export const attachmentNameStyle = (hovering) => ({
  color: hovering ? accentColor : clayGray,
  width: '104px',
  height: '36px',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '26px',
});
