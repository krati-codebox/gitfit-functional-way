import {LOGIN_API} from '../../actionTypes';

const initialState = {
  LOGIN_API: LOGIN_API,
  users: [],
};
const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API:
      
      return action.payload;

    default:
      return state;
  }
};

export default loginReducers;
