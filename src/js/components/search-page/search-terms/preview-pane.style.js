import { softBlackColor, hawkesBlue, accentColor, clayGray, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  position: 'absolute',
  top: '49px',
  right: '0px',
  bottom: '0px',
  width: '320px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  borderTop: `solid 1px ${whiteTwoColor}`,
};

export const titleStyle = {
  lineHeight: '32px',
  fontSize: '26px',
  fontWeight: 500,
  color: `${softBlackColor}`,
  margin: '48px 16px 16px 16px',
};

export const descriptionStyle = {
  fontSize: '14px',
  fontWeight: 500,
  margin: '7px 16px 0 16px',
  color: clayGray,
  height: 'calc(100% - 96px - 40px)'
};

export const actionStyle = {
  height: '40px',
  backgroundColor: hawkesBlue,
  borderRadius: '2px',
  paddingLeft: '16px',
  lineHeight: '40px',
  color: accentColor,
};

const _actionButtonStyle = {
  width: '51px',
  height: '26px',
  borderRadius: '2px',
  border: `1px solid ${accentColor}`,
  position: 'absolute',
  color: accentColor,
  right: '16px',
  lineHeight: '26px',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'center',
  margin: '7px 0'
};

export const actionButtonStyle = ({
  base: _actionButtonStyle,
  hover: {
    ..._actionButtonStyle,
    color: 'white',
  }
});
