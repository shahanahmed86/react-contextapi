import { gql } from '@apollo/client';

export const SESSION_EXPIRED = gql`
	subscription Subscription($token: String!) {
		data: session(token: $token) {
			success
			message
			debugMessage
		}
	}
`;

export const CORE_SIGNUP_FIELDS = gql`
	fragment CoreSignUpFields on SignUp {
		id
		username
		avatar
		fullName
		email
		cell
		gender
		user {
			id
			createdAt
			updatedAt
			defaultLogin
		}
		userId
		createdAt
		updatedAt
	}
`;

export const CORE_ADMIN_FIELDS = gql`
	fragment CoreAdminFields on Admin {
		id
		username
		createdAt
		updatedAt
	}
`;
