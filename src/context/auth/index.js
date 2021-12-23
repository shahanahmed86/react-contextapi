import React, { createContext, useReducer } from 'react';
import { initialState as state, authReducer as reducer } from './reducer';
export * as authActions from './actions';

export const authContext = createContext();

export const withAuthContext = (Component) => (props) =>
	<authContext.Consumer>{(values) => <Component {...values} {...props} />}</authContext.Consumer>;

export function AuthProvider(props) {
	const [store, dispatch] = useReducer(reducer, state);
	return (
		<authContext.Provider
			value={{
				store,
				dispatch,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
}
