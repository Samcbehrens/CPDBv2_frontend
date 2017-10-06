import { mediumGrayColor, hardBlackColor, whiteTwoColor, brightOrangeTwoColor } from 'utils/styles';


export const wrapperStyle = {
  borderTop: `solid 1px ${whiteTwoColor}`,
  position: 'relative'
};

export const aggregateNameStyle = {
  fontWeight: 500,
  color: mediumGrayColor,
  padding: '11px 0'
};

export const whiteSleeveStyle = {
  height: '1px',
  top: '38px',
  zIndex: 1,
  width: '100%',
  position: 'absolute',
  backgroundColor: 'white'
};

export const entryStyle = {
  paddingTop: '12.5px',
  paddingBottom: '9.5px',
  letterSpacing: 'normal',
  fontWeight: 400,
  borderTop: `solid 1px ${whiteTwoColor}`
};

export const countStyle = {
  color: hardBlackColor,
  display: 'inline-block',
  width: '32px'
};

export const sustainedCountStyle = sustainedCount => ({
  color: brightOrangeTwoColor,
  opacity: sustainedCount === 0 ? 0.36 : 1,
  display: 'inline-block',
  width: '32px'
});

export const nameStyle = {
  color: mediumGrayColor,
  fontWeight: 300,
  display: 'inline-block'
};
