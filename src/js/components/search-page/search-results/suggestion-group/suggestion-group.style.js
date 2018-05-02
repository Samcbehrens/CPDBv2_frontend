import { softBlackColor } from 'utils/styles';


export const scrollerStyle = (singleContent) => ({
  overflow: 'hidden',
  height: singleContent ? '100%' : 'auto'
});

export const groupHeaderStyle = {
  fontSize: '14px',
  color: softBlackColor,
  padding: '38px 16px 8px',
  height: '64px',
  boxSizing: 'border-box',
};
