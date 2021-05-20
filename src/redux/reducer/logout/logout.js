import { LOGOUT_API } from '../../actionTypes';

const initialState = {
	users: []
};
const logoutReducers = (state = initialState, action) => {
	switch (action.type) {
		case LOGOUT_API:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
};

export default logoutReducers;
