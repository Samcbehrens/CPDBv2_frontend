import { whiteTwoColor, sugarCaneColor, softBlackColor, clayGray, snowColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


const radius = 4;

export const baseWrapperStyle = (height) => ({
  fontSize: '14px',
  height: `${height}px`,
});

const smallBoxStyle = (height) => ({
  width: '104px',
  display: 'inline-block',
  textAlign: 'center',
  boxSizing: 'border-box',
  height: `${height}px`,
  lineHeight: `${height}px`,
  verticalAlign: 'top',
  whiteSpace: 'pre',
});

const borderRadiusStyle = (isFirst, isLast) => ({
  borderTopLeftRadius: isFirst ? `${radius}px`: 0,
  borderTopRightRadius: isFirst ? `${radius}px`: 0,
  borderBottomLeftRadius: isLast ? `${radius}px`: 0,
  borderBottomRightRadius: isLast ? `${radius}px`: 0,
});

export const baseRankStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle(height),
  borderRight: `solid 1px ${sugarCaneColor}`,
  backgroundColor: whiteTwoColor,
  ...borderRadiusStyle(isFirst, isLast),
});

export const baseUnitStyle = (height, isFirst, isLast) => ({
  ...smallBoxStyle(height),
  backgroundImage: `url("${imgUrl('unit-background-pattern.png')}")`,
  backgroundPosition: 'center',
  backgroundSize: '100%',
  ...borderRadiusStyle(isFirst, isLast),
});

export const unitChangeStyle = (height, isFirst, isLast) => ({
  ...baseUnitStyle(height, isFirst, isLast),
  color: clayGray,
  fontSize: '12px',
  backgroundColor: 'inherit',
  background: 'none',
});

export const unitTextStyle = (unassigned, isCurrentUnit) => ({
  height: '32px',
  lineHeight: '32px',
  color: isCurrentUnit ? softBlackColor : clayGray,
  fontStyle: unassigned ? 'italic' : 'none',
});

export const rankTextStyle = {
  height: '32px',
  lineHeight: '32px',
};

export const baseWrapperShowingStyle = {
  display: 'inline-block',
  width: 'calc(100% - 209px)',
  backgroundColor: snowColor,
};

export const baseShowingStyle = (hasBorderBottom) => ({
  width: 'calc(100% - 32px)',
  display: 'inline-block',
  margin: '0 16px',
  borderBottom: hasBorderBottom ? `solid 1px ${whiteTwoColor}`: 'none',
  boxSizing: 'border-box',
});

export const baseWrapperKindStyle = {
  width: '85px',
  display: 'inline-block',
  marginRight: '16px',
};

export const baseKindStyle = {
  lineHeight: '24px',
  display: 'inline-block',
  textAlign: 'center',
};

export const baseCategoryStyle = {
  lineHeight: '18px',
  color: softBlackColor,
};

export const baseDetailStyle = {
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const baseDateStyle = {
  float: 'right',
  width: '44px',
  display: 'inline-block',
  textAlign: 'right',
};

