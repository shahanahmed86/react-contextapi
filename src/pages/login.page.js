import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import { authActions, authContext } from '../context';
import { TextField } from '../components/text.component';
import { Typography } from '@mui/material';

export function LoginPage() {
	const loginRef = useRef(null);
	const { adminLogin, userLogin, authDispatch, authenticating } = useContext(authContext);

	const [isAdmin, setIsAdmin] = useState(false);

	const handleChange = (ev) => setIsAdmin(ev.target.checked);

	const onSubmitHandler = (ev) => {
		if (ev) ev.preventDefault();

		authDispatch({ type: authActions.AUTHENTICATING, payload: true });

		const { username, password } = loginRef.current;
		const variables = {
			username: username.value,
			password: password.value
		};

		if (isAdmin) {
			adminLogin({ variables })
				.then(({ error }) => {
					if (error) throw error;
				})
				.catch(err => toast.error(err.message))
				.finally(() => authDispatch({ type: authActions.AUTHENTICATING, payload: false }));
		} else {
			userLogin({ variables })
				.then(({ error }) => {
					if (error) throw error;
				})
				.catch(err => toast.error(err.message))
				.finally(() => authDispatch({ type: authActions.AUTHENTICATING, payload: false }));
		}
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
						<Box display='flex' alignItems='center' justifyContent='center' gap={3} marginTop={2}>
							<Switch
								checked={isAdmin}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
							<Typography
								variant='body1'
								color='InfoText'
								children={isAdmin ? 'as Admin' : 'as User'}
							/>
						</Box>
					</Box>
				</Box>
			</Paper>
		</div>
	);
}
