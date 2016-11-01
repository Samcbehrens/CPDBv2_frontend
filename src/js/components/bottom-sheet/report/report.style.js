import {
  pinkishGreyColor, altoColor, mediumGrayColor
} from 'utils/styles';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';

const _leftBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingTop: '74px',
  width: '482px',
  borderRight: `1px solid ${pinkishGreyColor}`,
  minHeight: '663px'
};

export const leftBarStyle = {
  [EXTRA_WIDE]: _leftBarStyle,
  [DESKTOP]: {
    ..._leftBarStyle,
    width: '400px'
  },
  [TABLET]: {
    ..._leftBarStyle
  }
};

const _rightBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '77px 32px 0',
  width: '704px',
  verticalAlign: 'top',
  borderLeft: `1px solid ${pinkishGreyColor}`,
  marginLeft: '-1px',
  fontSize: '18px',
  minHeight: '663px'
};

export const rightBarStyle = {
  [EXTRA_WIDE]: _rightBarStyle,
  [DESKTOP]: {
    ..._rightBarStyle,
    width: '590px'
  },
  [TABLET]: {
    ..._rightBarStyle
  }
};

export const wrapperStyle = {
  height: '707px'
};

export const excerptStyle = {
  wrapper: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '12px'
  },
  paragraph: {
    marginTop: 0,
    marginBottom: '31px'
  }
};

export const infoRowStyle = {
  boxSizing: 'border-box',
  borderTop: `1px solid ${altoColor}`,
  height: '40px',
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
    ..._labelStyle
  }
};

const _headerTitleStyle = {
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '32px',
  paddingRight: '32px'
};

export const headerTitleStyle = {
  [EXTRA_WIDE]: _headerTitleStyle,
  [DESKTOP]: {
    ..._headerTitleStyle,
    fontSize: '26px'
  },
  [TABLET]: {
    ..._headerTitleStyle
  }
};

export const contentWrapperStyle = {
  overflowY: 'auto',
  height: '663px'
};
