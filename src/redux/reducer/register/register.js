import { REGISTER_API } from '../../actionTypes';

const initialState = {
	users: []
};
const registerReducers = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_API:
			return action.payload;

		default:
			return state;
	}
};

export default registerReducers;
