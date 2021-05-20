import { ATHELETE_RAGISTER_API } from "../../actionTypes";

const initialState = {
  users: []
};
const atheleteRegisterReducers = (state = initialState, action) => {
  switch (action.type) {
    case ATHELETE_RAGISTER_API:
      return action.payload;

    default:
      return state;
  }
};

export default atheleteRegisterReducers;
