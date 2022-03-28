import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

const { Provider, Consumer } = createContext();

export const withAuthContext = (Component) => (props) =>
	<Consumer>{(value) => <Component {...value} {...props} />}</Consumer>;

export function AuthProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<>
			<Provider value={{ authState: state, authDispatch: dispatch }}>{props.children}</Provider>
		</>
	);
}
