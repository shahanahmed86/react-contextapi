import { gql } from '@apollo/client';
import { CORE_SIGNUP_FIELDS } from './common.graphql';

export const USER_LOGIN = gql`
	${CORE_SIGNUP_FIELDS}
	mutation Mutation($username: String!, $password: String!) {
		data: userLogin(username: $username, password: $password) {
			token
			payload {
				...CoreSignUpFields
			}
		}
	}
`;

export const USER_SIGN_UP = gql`
	${CORE_SIGNUP_FIELDS}
	mutation Mutation($userSignUpUsername2: String!, $userSignUpPassword2: String!) {
		data: userSignUp(username: $userSignUpUsername2, password: $userSignUpPassword2) {
			token
			payload {
				...CoreSignUpFields
			}
		}
	}
`;

export const USER_LOGGED_IN = gql`
	${CORE_SIGNUP_FIELDS}
	query UserLoggedIn {
		data: userLoggedIn {
			...CoreSignUpFields
		}
	}
`;
