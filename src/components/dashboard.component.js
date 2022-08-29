import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions, authContext } from '../context';
import { timeOut } from '../utils/logics.util';

export const DashboardPage = () => {
	const { authDispatch } = useContext(authContext);
  const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const onLogout = (ev) => {
		if (ev) ev.preventDefault();

		setLoading(true);

		timeOut(2000)
    .then(() => {
        authDispatch({ type: authActions.LOGOUT });

        navigate('/login');
				toast.success('Sign out successfully...');
			})
			.finally(() => setLoading(false));
	};
	return (
		<button type='button' disabled={loading} onClick={onLogout}>
			Logout
		</button>
	);
};
