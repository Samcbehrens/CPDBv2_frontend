import { browserHistory } from 'react-router';

import { trackOutboundLink } from 'utils/google_analytics_tracking';


export const navigateToSearchItem = (item, beforeNavigate) => {
  beforeNavigate(item);
  if (item.isDataToolSearchUrl) {
    return;
  }
  if (item.to) {
    browserHistory.push(item.to);
  } else if (item.url) {
    trackOutboundLink(item.url, '_blank');
  }
};
