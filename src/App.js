import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { LoginPage } from './components/login.component';
import { DashboardPage } from './components/dashboard.component';
import { authContext } from './context';

import './App.css';

function App() {
	const { loggedIn, isAuthenticated } = useContext(authContext);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		loggedIn().finally(() => setLoading(false));
	}, [loggedIn, navigate]);

	useEffect(() => {
		const route = isAuthenticated ? '/dashboard' : 'login';
		navigate(route);
	}, [isAuthenticated, navigate]);

	if (loading) return <h4>loading...</h4>;
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/dashboard' element={<DashboardPage />} />
		</Routes>
	);
}

export default App;
