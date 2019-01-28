import axios from 'axios';
import * as actionCreators from './actionsThunk';

export const fetchPeopleLoading = () => {
  return {
    type: actionCreators.FETCH_PEOPLE_LOADING
  };
};

export const fetchPeople = (fetchedPeople) => {
  return {
    type: actionCreators.FETCH_PEOPLE,
    payload: {
      fetchedPeople
    }
  };
};

export const fetchPeopleFail = () => {
  return {
    type: actionCreators.FETCH_PEOPLE_FAIL
  };
};

export const fetchPeopleAsync = () => {
  return (dispatch) => {
    dispatch(fetchPeopleLoading());
    axios
      .get('https://private-36f1e-contactstest.apiary-mock.com/contacts')
      .then((data) => {
        dispatch(fetchPeople(data.items));
      })
      .catch((err) => {
        dispatch(fetchPeopleFail());
      });
  };
};
