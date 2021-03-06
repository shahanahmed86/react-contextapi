import * as authActions from './actions';

export const initialState = {
	me: null,
};

export function authReducer(state, action) {
	switch (action.type) {
		case authActions.LOGIN: {
			localStorage.setItem('adminToken', action.payload.token);
			return {
				...state,
				me: action.payload.admin,
			};
		}
		case authActions.LOGGED_IN: {
			return {
				...state,
				me: action.payload,
			};
		}
		case authActions.LOGOUT: {
			localStorage.removeItem('adminToken');
			return {
				...initialState,
			};
		}
		default:
			return state;
	}
}
