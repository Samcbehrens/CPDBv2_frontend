import { lightGreyColor, pinkishWhiteColor, accentColor, softBlackColor } from 'utils/styles';


export const faqItemWrapperStyle = {
  marginLeft: '16px',
  borderBottom: `1px solid ${lightGreyColor}`
};

export const faqItemStyle = {
  base: {
    color: softBlackColor
  },
  hover: {
    color: accentColor
  }
};

export const faqItemExpandedStyle = {
  base: {
    color: softBlackColor,
    fontWeight: '600'
  }
};

export const dropPreviewStyle = {
  height: '85px',
  backgroundColor: pinkishWhiteColor,
  marginLeft: '16px'
};
