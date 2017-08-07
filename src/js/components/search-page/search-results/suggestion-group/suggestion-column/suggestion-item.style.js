import {
  softBlackColor,
  whiteTwoColor,
  sanFranciscoTextFamily,
  eggPlantColor,
  accentColor,
  subdueAccentTextColor,
  lightSubdueAccentTextColor,
  ultraGirlyPink
} from 'utils/styles';


export const suggestionItemHeight = 65;

export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  height: `${suggestionItemHeight}px`,
  width: '443px',
  boxSizing: 'border-box',
  display: 'block',
  textDecoration: 'none'
};

export const suggestionTextStyle = (hovering, isFocused) => {
  return {
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: sanFranciscoTextFamily,
    color: isFocused || hovering ? accentColor : softBlackColor
  };
};

export const metaTextStyle = (hovering, isFocused) => {
  let color;
  if (isFocused) {
    color = subdueAccentTextColor;
  } else if (hovering) {
    color = accentColor;
  } else {
    color = eggPlantColor;
  }

  return {
    fontSize: '13px',
    fontWeight: 300,
    fontFamily: sanFranciscoTextFamily,
    color: color
  };
};

export const reasonStyle = (hovering, isFocused) => {
  let color;
  if (isFocused) {
    color = subdueAccentTextColor;
  } else if (hovering) {
    color = accentColor;
  } else {
    color = softBlackColor;
  }
  return {
    fontSize: '13px',
    fontWeight: 300,
    fontFamily: sanFranciscoTextFamily,
    color: color
  };
};

export const enterContainerStyle = {
  position: 'relative',
  'float': 'right',
  height: '100%',
  width: '100px'
};

export const enterBoxStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  WebkitTransform: 'translateY(-50%)',
  right: 0,
  color: `${lightSubdueAccentTextColor}`,
  border: `1px solid ${lightSubdueAccentTextColor}`,
  fontSize: '12px',
  padding: '4px 8px',
  boxSizing: 'border-box',
  width: '46px'
};

export const enterTextStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  WebkitTransform: 'translateY(-50%)'
};

export const aliasLinkStyle = {
  color: ultraGirlyPink,
  textDecoration: 'none',
};
