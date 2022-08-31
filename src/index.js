import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context';
import storage from './utils/store.util';
import CssBaseline from '@mui/material/CssBaseline';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { appHost, IN_PROD, wsHost } from './config';
import { onError } from '@apollo/client/link/error';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const authLink = setContext((_, { headers }) => {
	const token = storage.getData(storage.tokenKey);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const httpLink = new HttpLink({ uri: `${appHost}/graphql` });

const wsLink = new GraphQLWsLink(createClient({ url: `${wsHost}/graphql`, shouldRetry: IN_PROD }));

const errorLink = onError(({ networkError }) => {
	if (networkError) console.log(`[Network error]: ${networkError}`);
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

const client = new ApolloClient({
	link: from([errorLink, splitLink]),
	connectToDevTools: !IN_PROD,
	cache: new InMemoryCache(),
	defaultOptions
});

const el = document.querySelector('#root');

ReactDOM.render(
	<StrictMode>
		<ApolloProvider client={client}>
			<Router>
				<AuthProvider>
					<App />
					<CssBaseline />
				</AuthProvider>
			</Router>
		</ApolloProvider>
		<ToastContainer />
	</StrictMode>,
	el
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
