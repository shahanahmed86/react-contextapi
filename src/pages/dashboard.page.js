import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions, authContext } from '../context';
import { timeOut } from '../utils/logics.util';

export const DashboardPage = () => {
	const { authDispatch, authenticating } = useContext(authContext);
	const navigate = useNavigate();

	const onLogout = (ev) => {
		if (ev) ev.preventDefault();

		authDispatch({ type: authActions.AUTHENTICATING, payload: true });
		timeOut().then(() => {
			authDispatch({ type: authActions.LOGOUT });
			toast.success('Sign out successfully...');

			const route = '/login';
			authDispatch({ type: authActions.NAVIGATE, payload: route });
			navigate(route);
		});
	};
	return (
		<div className='center-a-block dashboard'>
			<Button
				variant='contained'
				size='large'
				color='secondary'
				disabled={authenticating}
				onClick={onLogout}
			>
				Logout
			</Button>
		</div>
	);
};
