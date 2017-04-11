import {
  pinkishGreyColor, altoColor, mediumGrayColor, pinkishWhiteColor, sanFranciscoTextFamily
} from 'utils/styles';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';

const _leftBarStyle = () => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingTop: '74px',
  width: '482px',
  borderRight: `1px solid ${pinkishGreyColor}`,
  minHeight: `${window.innerHeight - 88}px`
});

export const leftBarStyle = {
  [EXTRA_WIDE]: () => _leftBarStyle(),
  [DESKTOP]: () => ({
    ..._leftBarStyle(),
    width: '400px'
  })
};

const _rightBarStyle = () => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingTop: '77px',
  paddingRight: '32px',
  paddingLeft: '32px',
  paddingBottom: '74px',
  width: '704px',
  verticalAlign: 'top',
  borderLeft: `1px solid ${pinkishGreyColor}`,
  fontFamily: sanFranciscoTextFamily,
  marginLeft: '-1px',
  fontSize: '18px',
  minHeight: `${window.innerHeight - 88}px`
});

export const rightBarStyle = {
  [EXTRA_WIDE]: () => _rightBarStyle(),
  [DESKTOP]: () => ({
    ..._rightBarStyle(),
    width: '590px'
  })
};

export const excerptStyle = {
  wrapper: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '12px'
  },
  paragraph: {
    marginTop: 0,
    fontFamily: sanFranciscoTextFamily,
    marginBottom: '31px'
  }
};

export const infoRowStyle = {
  boxSizing: 'border-box',
  borderTop: `1px solid ${altoColor}`,
  height: '40px',
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  padding: '11px 0'
};

const _labelStyle = {
  color: mediumGrayColor,
  width: '218px',
  display: 'inline-block'
};

export const labelStyle = {
  [EXTRA_WIDE]: _labelStyle,
  [DESKTOP]: {
    ..._labelStyle,
    width: '160px'
  },
  [TABLET]: {
    ..._labelStyle,
    width: '114px'
  }
};

const _headerTitleStyle = {
  fontSize: '32px',
  fontWeight: '600',
  fontFamily: sanFranciscoTextFamily,
  paddingRight: '32px'
};

export const headerTitleStyle = {
  [EXTRA_WIDE]: _headerTitleStyle,
  [DESKTOP]: {
    ..._headerTitleStyle,
    fontSize: '26px'
  },
  [TABLET]: _headerTitleStyle
};

export const infoRowsStyle = {
  marginTop: '32px',
  borderBottom: `1px solid ${altoColor}`
};

export const articleLinkWrapperStyle = {
  fontSize: '14px',
  textAlign: 'right',
  position: 'relative'
};

export const oneColumnStyle = {
  paddingTop: '74px',
  paddingRight: '32px',
  paddingLeft: '32px',
  paddingBottom: '74px',
  boxSizing: 'border-box',
  minHeight: `${window.innerHeight - 88}px`
};

export const extraPaddingStyle = {
  paddingTop: '124px'
};

export const headerStyle = editModeOn => {
  return {
    backgroundColor: editModeOn ? pinkishWhiteColor : 'white'
  };
};
