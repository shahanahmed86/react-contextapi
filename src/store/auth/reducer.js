import * as actions from './actions';

export const initialState = { isLoggedIn: false };

export function reducer(state, action) {
	switch (action.type) {
		case actions.LOG_IN:
			return { isLoggedIn: true };
		case actions.LOG_OUT:
			return { isLoggedIn: false };
		default:
			throw new Error('Undefined action found');
	}
}
