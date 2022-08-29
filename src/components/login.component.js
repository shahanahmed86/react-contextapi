import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context';

export function LoginPage() {
	const { login } = useContext(authContext);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const loginRef = useRef(null);

	const onSubmitHandler = (ev) => {
		if (ev) ev.preventDefault();

		setLoading(true);

		const { username, password } = loginRef.current;
		const variables = {
			username: username.value,
			password: password.value
		};

		login({ variables })
			.then(({ error }) => {
				if (error) throw error;

				navigate('/dashboard');
				toast.success("You've successfully signed in...");
			})
			.catch(toast.error)
			.finally(() => setLoading(false));
	};
	return (
		<form ref={loginRef} onSubmit={onSubmitHandler}>
			<input name='username' disabled={loading} defaultValue='shahan' />
			<input type='password' name='password' disabled={loading} defaultValue='123Abc456' />
			<input type='submit' value='Login' disabled={loading} />
		</form>
	);
}
