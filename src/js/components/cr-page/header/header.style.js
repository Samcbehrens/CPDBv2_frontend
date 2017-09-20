import { sanFranciscoTextFamily, lightBlackColor, softBlackColor, greyishColor } from 'utils/styles';


export const boxShadowStyle = {
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  position: 'relative'
};

export const headerStyle = {
  padding: '16px',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  height: '32px',
  lineHeight: '32px',
  textAlign: 'center'
};

export const titleStyle = (displayCoaccusedDropdown) => ({
  fontSize: '26px',
  fontWeight: 500,
  display: 'inline-block',
  float: 'left',
  color: displayCoaccusedDropdown ? greyishColor : 'inherit'
});
