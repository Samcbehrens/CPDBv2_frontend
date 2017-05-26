import { createSelector } from 'reselect';


const getUnmergeable = (state, props) => {
  return state.resolvingPage.unmergeable || {};
};

export const nextUrlSelector = (state) => {
  return state.resolvingPage.unmergeable.next || '';
};

export const prevUrlSelector = (state) => {
  return state.resolvingPage.unmergeable.previous || '';
};

export const countSelector = (state) => {
  return state.resolvingPage.unmergeable.count || 0;
};

export const offsetSelector = (state) => {
  return state.resolvingPage.unmergeable.offset || 0;
};

export const officerMergingSelector = createSelector(
  getUnmergeable,
  unmergeable => {
    if (unmergeable.results && unmergeable.results.length > 0) {
      return unmergeable.results[0];
    } else {
      return { record: {}, candidate: [] };
    }
  }
);
