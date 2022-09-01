import { gql } from '@apollo/client';
import { CORE_ADMIN_FIELDS } from './common.graphql';

export const ADMIN_LOGIN = gql`
	${CORE_ADMIN_FIELDS}
	mutation AdminLogin($username: String!, $password: String!) {
		data: adminLogin(username: $username, password: $password) {
			token
			payload {
				...CoreAdminFields
			}
		}
	}
`;

export const ADMIN_LOGGED_IN = gql`
	${CORE_ADMIN_FIELDS}
	query AdminLoggedIn {
		data: adminLoggedIn {
			...CoreAdminFields
		}
	}
`;
