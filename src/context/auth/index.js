import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, useEffect, useReducer } from 'react';
import { authQueries } from '../../graphql';
import storage from '../../utils/store.util';
import { initialState, authReducer as reducer } from './reducer';
import * as authActions from './actions';

export { authActions };

export const authContext = createContext();

export const AuthProvider = (props) => {
	const [store, authDispatch] = useReducer(reducer, initialState);

	const [login] = useMutation(authQueries.ADMIN_LOGIN, {
		onCompleted: (data) => {
			authDispatch({ type: authActions.LOGIN, payload: data.data });
		},
		onError: (err) => {
			throw err;
		}
	});

	const [loggedIn] = useLazyQuery(authQueries.ADMIN_LOGGED_IN, {
		onCompleted: (data) => {
			authDispatch({ type: authActions.LOGGED_IN, payload: data.data });
		},
		onError: (err) => {
			if (err.message.indexOf('jwt expired') !== -1) authDispatch({ type: authActions.LOGOUT });
			throw err;
		}
	});

	useEffect(() => {
		storage.getData(storage.storageKey, true);
	}, [loggedIn]);

	useEffect(() => {
		storage.setData(storage.storageKey, store, true);
	}, [store]);

	return (
		<authContext.Provider
			value={{
				...store,
				authDispatch,
				login,
				loggedIn
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};
