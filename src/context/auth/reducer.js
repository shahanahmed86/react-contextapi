import storage from '../../utils/store.util';
import * as authActions from './actions';

export const initialState = {
	me: null,
	isAuthenticated: false
};

export function authReducer(state, action) {
	switch (action.type) {
		case authActions.LOGIN: {
			storage.setData(storage.tokenKey, action.payload.token);
			return {
				...state,
				me: action.payload.admin,
				isAuthenticated: true
			};
		}
		case authActions.LOGGED_IN: {
			return {
				...state,
				me: action.payload,
				isAuthenticated: true
			};
		}
		case authActions.LOGOUT: {
			storage.removeData(storage.tokenKey);
			return {
				...state,
				me: null,
				isAuthenticated: false
			};
		}
		case authActions.RESET: {
			return { ...initialState };
		}
		default: {
			return state;
		}
	}
}
