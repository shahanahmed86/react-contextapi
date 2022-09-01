import storage from '../../utils/store.util';
import * as authActions from './actions';

export const initialState = {
	me: null,
	isAuthenticated: false,
	authenticating: false,
	lastNavigatedScreen: null
};

export function authReducer(state, action) {
	switch (action.type) {
		case authActions.AUTHENTICATING: {
			return {
				authenticating: action.payload
			};
		}
		case authActions.LOGIN: {
			storage.setData(
				storage.tokenKey,
				{
					token: action.payload.token,
					isAdmin: action.payload.isAdmin
				},
			);
			return {
				...state,
				me: action.payload.payload,
				isAuthenticated: true,
				authenticating: false
			};
		}
		case authActions.LOGGED_IN: {
			return {
				...state,
				me: action.payload,
				isAuthenticated: true,
				authenticating: false
			};
		}
		case authActions.LOGOUT: {
			storage.removeData(storage.tokenKey);
			return {
				...state,
				me: null,
				isAuthenticated: false,
				authenticating: false
			};
		}
		case authActions.NAVIGATE: {
			return {
				...state,
				lastNavigatedScreen: action.payload
			};
		}
		case authActions.SET_STATE: {
			return {
				...state,
				...action.payload
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
