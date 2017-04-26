import { scale } from 'chroma-js';

import { sanFranciscoTextFamily, mediumGrayColor, accentColor } from 'utils/styles';

export const unitTextStyle = {
  width: '169px',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  color: mediumGrayColor,
  fontWeight: 'bold',
  marginTop: '3px'
};

export const dateStyle = {
  width: '111px',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: mediumGrayColor,
  textAlign: 'right',
  marginLeft: '136px'
};

export const descriptionStyle = flashRatio => ({
  width: '309px',
  display: 'inline-block',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  color: flashRatio !== null ? scale([mediumGrayColor, accentColor, mediumGrayColor])(flashRatio).hex()
    : mediumGrayColor,
  textAlign: 'left',
  marginTop: '11px'
});
