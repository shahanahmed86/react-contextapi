import { gql } from '@apollo/client';

export const ADMIN_LOGIN = gql`
	mutation AdminLogin($username: String!, $password: String!) {
		data: adminLogin(username: $username, password: $password) {
			token
			payload {
				id
				username
				createdAt
				updatedAt
			}
		}
	}
`;

export const ADMIN_LOGGED_IN = gql`
	query AdminLoggedIn {
		data: adminLoggedIn {
			id
			username
			createdAt
			updatedAt
		}
	}
`;
