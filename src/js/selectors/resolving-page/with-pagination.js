export const nextUrlSelector = (state) => {
  return state.next || '';
};

export const prevUrlSelector = (state) => {
  return state.previous || '';
};

export const countSelector = (state) => {
  return state.count || 0;
};

export const offsetSelector = (state) => {
  return state.offset || 0;
};

export const recordsSelector = (state) => {
  return state.results || [];
};
