import { useLazyQuery, useMutation, } from '@apollo/client';
import React, { createContext, useReducer } from 'react';
import { authQueries } from '../../graphql';
import { initialState as state, authReducer as reducer } from './reducer';
export * as authActions from './actions';

export const authContext = createContext();

export const withAuthContext = (Component) => (props) =>
	<authContext.Consumer>{(values) => <Component {...values} {...props} />}</authContext.Consumer>;

export function AuthProvider(props) {
	const [store, authDispatch] = useReducer(reducer, state);

	// mutations
	const [login] = useMutation(authQueries.LOGIN);
	const [logout] = useMutation(authQueries.LOGOUT);
	const [loggedIn] = useLazyQuery(authQueries.LOGGED_IN);
	return (
		<authContext.Provider
			value={{
				...store,
				authDispatch,
				login,
				logout,
				loggedIn,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
}
