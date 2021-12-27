import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { withAuthContext } from './context';
import { authActions } from './context/auth';

function App(props) {
	// context store...
	const { me, authDispatch, login, logout, loggedIn } = props;

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const loginRef = useRef(null);

	const onSubmitHandler = (ev) => {
		if (ev) ev.preventDefault();

		setLoading(true);

		setTimeout(() => {
			const { username, password } = loginRef.current;
			const variables = {
				username: username.value,
				password: password.value,
			};
			login({ variables })
				.then(({ data }) => {
					authDispatch({ type: authActions.LOGIN, payload: data.data });
				})
				.catch(({ message }) => console.log('error ==>', message))
				.finally(() => setLoading(false));
		}, 2000);
	};

	const onLogout = (ev) => {
		if (ev) ev.preventDefault();

		setLoading(true);

		setTimeout(() => {
			logout()
				.then(({ data }) => {
					authDispatch({ type: authActions.LOGOUT });
					setMessage(data.data);
				})
				.catch(({ message }) => console.log('err => ', message))
				.finally(() => setLoading(false));
		}, 2000);
	};

	useEffect(() => {
		if (!me && localStorage.getItem('adminToken')) {
			setLoading(true);

			loggedIn()
				.then(({ data }) => {
					authDispatch({ type: authActions.LOGGED_IN, payload: data.data });
				})
				.catch(({ message }) => console.log('error ==>', message))
				.finally(() => setLoading(false));
		}
	}, [me, authDispatch, loggedIn]);
	return (
		<>
			<form ref={loginRef} onSubmit={onSubmitHandler}>
				<input name='username' disabled={loading} />
				<input type='password' name='password' disabled={loading} />
				<input type='submit' value='Login' disabled={loading} />
			</form>
			<button type='button' onClick={onLogout}>
				Logout
			</button>
			<hr />
			{loading ? <h1>loading...</h1> : me ? JSON.stringify(me, null, 3) : message}
		</>
	);
}

export default withAuthContext(App);
