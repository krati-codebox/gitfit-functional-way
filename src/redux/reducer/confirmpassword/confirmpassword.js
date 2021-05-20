import {CONFIRMPASSWORD_API} from '../../actionTypes';

const initialState = {
  users: [],
};
const confirmPasswordReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRMPASSWORD_API:
      //
      return Object.assign ({}, state, action.payload);

    default:
      return state;
  }
};

export default confirmPasswordReducers;
