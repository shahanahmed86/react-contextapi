import React from 'react';
import { AuthProvider } from './store';
import LoginPage from './components/Login';
import './App.css';

function App() {
	return (
		<>
			<AuthProvider>
				<LoginPage />
			</AuthProvider>
		</>
	);
}

export default App;
