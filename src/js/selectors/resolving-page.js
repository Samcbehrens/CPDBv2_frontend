import { createSelector } from 'reselect';


const getUnmatchable = (state, props) => {
  return state.resolvingPage.unmatchable || {};
};

export const nextUrlSelector = (state) => {
  return state.resolvingPage.unmatchable.next || '';
};

export const prevUrlSelector = (state) => {
  return state.resolvingPage.unmatchable.previous || '';
};

export const countSelector = (state) => {
  return state.resolvingPage.unmatchable.count || 0;
};

export const offsetSelector = (state) => {
  return state.resolvingPage.unmatchable.offset || 0;
};

export const officerMatchingSelector = createSelector(
  getUnmatchable,
  unmatchable => {
    if (unmatchable.results && unmatchable.results.length > 0) {
      return unmatchable.results[0];
    } else {
      return { record: {}, candidates: [] };
    }
  }
);
