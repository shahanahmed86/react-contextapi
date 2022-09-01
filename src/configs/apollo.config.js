import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import storage from '../utils/store.util';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { appHost, IN_PROD, wsHost } from './app.config';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';

const authLink = setContext((_, { headers }) => {
	const storedData = storage.getData(storage.tokenKey);
	return {
		headers: {
			...headers,
			authorization: storedData ? `Bearer ${storedData.token}` : ''
		}
	};
});

const httpLink = new HttpLink({ uri: `${appHost}/graphql` });

const wsLink = new GraphQLWsLink(createClient({ url: `${wsHost}/graphql`, shouldRetry: IN_PROD }));

const errorLink = onError(({ networkError }) => {
	if (networkError) toast.error('No internet or Network Error');
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	from([authLink, httpLink])
);

const defaultOptions = {
	query: { fetchPolicy: 'network-only' },
	mutate: { fetchPolicy: 'network-only' },
	watchQuery: { fetchPolicy: 'network-only' }
};

export const client = new ApolloClient({
	link: from([errorLink, splitLink]),
	connectToDevTools: !IN_PROD,
	cache: new InMemoryCache(),
	defaultOptions
});
