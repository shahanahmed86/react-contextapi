import React, { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { authActions, authContext } from '../context';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextField } from '../components/text.component';
import { Button } from '@mui/material';

export function LoginPage() {
	const { login, authDispatch, authenticating } = useContext(authContext);

	const loginRef = useRef(null);

	const onSubmitHandler = (ev) => {
		if (ev) ev.preventDefault();

		authDispatch({ type: authActions.AUTHENTICATING, payload: true });

		const { username, password } = loginRef.current;
		const variables = {
			username: username.value,
			password: password.value
		};

		login({ variables })
			.then(({ error }) => {
				if (error) throw error;
			})
			.catch(toast.error);
	};
	return (
		<div className='center-a-block'>
			<Paper elevation={6} style={{ borderRadius: 15 }}>
				<Box ref={loginRef} onSubmit={onSubmitHandler} component='form'>
					<Box display='flex' flexDirection='column' padding={2}>
						<Box padding={2} display='flex' flexDirection='column' gap={2}>
							<TextField
								fullWidth
								name='username'
								disabled={authenticating}
								defaultValue='shahan'
								label='Username'
							/>
							<TextField
								fullWidth
								type='password'
								name='password'
								disabled={authenticating}
								defaultValue='123Abc456'
								label='Password'
							/>
						</Box>
						<Box display='flex' alignItems='center' justifyContent='center'>
							<Button
								variant='contained'
								size='large'
								type='submit'
								disabled={authenticating}
								component='button'
							>
								Login
							</Button>
						</Box>
					</Box>
				</Box>
			</Paper>
		</div>
	);
}
