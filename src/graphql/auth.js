import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation ($username: String!, $password: String!) {
		data: loginAdmin(username: $username, password: $password) {
			token
			admin {
				id
				username
				createdAt
				updatedAt
			}
		}
	}
`;

export const LOGOUT = gql`
	mutation {
		data: logoutAdmin
	}
`;

export const LOGGED_IN = gql`
	query {
		data: loggedInAdmin {
			id
			username
			createdAt
			updatedAt
		}
	}
`;
