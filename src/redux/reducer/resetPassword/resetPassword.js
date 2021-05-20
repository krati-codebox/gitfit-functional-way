import { RESETPASSWORD_API } from "../../actionTypes";

const initialState = {
  users: [],
};
const resetPasswordReducers = (state = initialState, action) => {
  switch (action.type) {
    case RESETPASSWORD_API:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default resetPasswordReducers;
