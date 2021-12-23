import { useMutation } from '@apollo/client';
import React, { useRef, useState, useEffect, useContext } from 'react';
import './App.css';
import { withAuthContext } from './context';
import { authActions } from './context/auth';
import { authQueries } from './graphql';

function App(props) {
  // context store...
	const { store, dispatch } = props;

	const [loading, setLoading] = useState(false);

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
					dispatch({ type: authActions.LOGIN, payload: data.data });
				})
				.catch(({ message }) => console.log('error ==>', message))
				.finally(() => setLoading(false));
		}, 2000);
	};

	const [login] = useMutation(authQueries.LOGIN);

	useEffect(() => {
		console.log(store);
	}, [store.me]);
	return (
		<>
			<form ref={loginRef} onSubmit={onSubmitHandler}>
				<input name='username' disabled={loading} />
				<input type='password' name='password' disabled={loading} />
				<input type='submit' value='Login' disabled={loading} />
			</form>
			{loading ? <h1>loading...</h1> : ''}
		</>
	);
}

export default withAuthContext(App);
