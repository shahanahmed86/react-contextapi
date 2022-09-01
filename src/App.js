import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { authActions, authContext } from './context';

import storage from './utils/store.util';
import { Loader } from './components/loader.component';
import { useSubscription } from '@apollo/client';
import { SESSION_EXPIRED } from './graphql/common.graphql';
import { toast } from 'react-toastify';

function App() {
	const {
		authDispatch,
		me,
		adminLoggedIn,
		userLoggedIn,
		isAuthenticated,
		lastNavigatedScreen,
		authenticating
	} = useContext(authContext);

	useSubscription(SESSION_EXPIRED, {
		skip: !storage.getData(storage.tokenKey),
		variables: { token: storage.getData(storage.tokenKey)?.token },
		onSubscriptionData: (result) => {
			const { success, message } = result.subscriptionData.data.data;

			if (!success) {
				authDispatch({ type: authActions.LOGOUT });
				toast.error(message);
			}
		}
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedData = storage.getData(storage.tokenKey);

		if (!me && storedData) {
			setLoading(true);
			if (storedData.isAdmin) adminLoggedIn().then(() => setLoading(false));
			else userLoggedIn().then(() => setLoading(false));
		}
	}, [adminLoggedIn, userLoggedIn, me, authDispatch]);

	useEffect(() => {
		if (authenticating) return;

		const route = isAuthenticated ? lastNavigatedScreen || '/dashboard' : 'login';
		navigate(route);
	}, [authenticating, isAuthenticated, navigate, lastNavigatedScreen]);

	if (loading) return <Loader />;
	return (
		<Routes>
			<Route path='/' element={<div />} />
			<Route path='/login' exact element={<LoginPage />} />
			<Route path='/dashboard' exact element={<DashboardPage />} />
		</Routes>
	);
}

export default App;
