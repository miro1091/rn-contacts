// @flow

import * as actionCreators from './actionsThunk';

export const initialState = {
  fetchPeople: [],
  fetchPopleLoading: true,
  fetchPopleFail: false
};

export default function data(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionCreators.FETCH_PEOPLE_FAIL: {
      return {
        ...state,
        fetchPopleFail: true
      };
    }

    case actionCreators.FETCH_PEOPLE: {
      return {
        ...state,
        fetchPeople: [...payload.fetchedPeople],
        fetchPopleLoading: false,
        fetchPopleFail: false
      };
    }

    case actionCreators.FETCH_PEOPLE_LOADING: {
      return {
        ...state,
        fetchPopleLoading: true
      };
    }

    default:
      return state;
  }
}
