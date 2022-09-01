import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider, } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context';
import CssBaseline from '@mui/material/CssBaseline';
import { client } from './configs/apollo.config.js';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const el = document.querySelector('#root');

ReactDOM.render(
	<StrictMode>
		<ApolloProvider client={client}>
			<Router basename={process.env.PUBLIC_URL}>
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
