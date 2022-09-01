import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, useReducer } from 'react';
import { adminAuthQueries, userAuthQueries } from '../../graphql';
import { initialState, authReducer as reducer } from './reducer';
import * as authActions from './actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export { authActions };

export const authContext = createContext();

export const AuthProvider = (props) => {
	const navigate = useNavigate();

	const [store, authDispatch] = useReducer(reducer, initialState);

	const [adminLogin] = useMutation(adminAuthQueries.ADMIN_LOGIN, {
		onCompleted: (data) => {
			authDispatch({
				type: authActions.LOGIN,
				payload: Object.assign(data.data, { isAdmin: true })
			});

			const route = '/dashboard';
			authDispatch({ type: authActions.NAVIGATE, payload: route });
			navigate(route);

			toast.success("You've successfully logged in...");
		},
		onError: (err) => {
			throw err;
		}
	});

	const [userLogin] = useMutation(userAuthQueries.USER_LOGIN, {
		onCompleted: (data) => {
			authDispatch({
				type: authActions.LOGIN,
				payload: Object.assign(data.data, { isAdmin: false })
			});

			const route = '/dashboard';
			authDispatch({ type: authActions.NAVIGATE, payload: route });
			navigate(route);

			toast.success("You've successfully logged in...");
		},
		onError: (err) => {
			throw err;
		}
	});

	const [adminLoggedIn] = useLazyQuery(adminAuthQueries.ADMIN_LOGGED_IN, {
		onCompleted: (data) => {
			authDispatch({ type: authActions.LOGGED_IN, payload: data.data });
		},
		onError: (err) => {
			if (err.message.indexOf('jwt expired') !== -1) authDispatch({ type: authActions.LOGOUT });
			console.log('err.message...', err.message);
		}
	});

	const [userLoggedIn] = useLazyQuery(userAuthQueries.USER_LOGGED_IN, {
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
				adminLogin,
				adminLoggedIn,
				userLogin,
				userLoggedIn
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};
