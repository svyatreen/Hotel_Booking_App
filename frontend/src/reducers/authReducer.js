import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialState = {
	user: null,
	isAuthenticated: false,
	login: null,
	session: null,
	roleId: ROLE.GUEST,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				user: action.payload,
				login: action.payload.login,
				session: action.payload.id,
				roleId: action.payload.roleId,
				isAuthenticated: true,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				user: null,
				login: null,
				session: null,
				roleId: ROLE.GUEST,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
