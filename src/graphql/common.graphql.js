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
