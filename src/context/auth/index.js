import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, useReducer } from 'react';
import { authQueries } from '../../graphql';
import { initialState, authReducer as reducer } from './reducer';
import * as authActions from './actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export { authActions };

export const authContext = createContext();

export const AuthProvider = (props) => {
	const navigate = useNavigate();

	const [store, authDispatch] = useReducer(reducer, initialState);

	const [login] = useMutation(authQueries.ADMIN_LOGIN, {
		onCompleted: (data) => {
			authDispatch({ type: authActions.LOGIN, payload: data.data });

			const route = '/dashboard';
			authDispatch({ type: authActions.NAVIGATE, payload: route });
			navigate(route);

			toast.success("You've successfully logged in...");
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
			console.log('err.message...', err.message);
		}
	});

	// useEffect(() => {
	// 	const payload = storage.getData(storage.storageKey, true);
	// 	if (payload) authDispatch({ type: authActions.SET_STATE, payload });
	// }, [loggedIn]);

	// useEffect(() => {
	// 	storage.setData(storage.storageKey, store, true);
	// }, [store]);

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
