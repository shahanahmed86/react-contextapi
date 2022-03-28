import React, { Fragment, useCallback, useMemo, useState } from "react";
import { withAuthContext, authActions } from "../store";
import { logics } from "../utils";

function LoginPage({ authState, authDispatch }) {
	const [form, setForm] = useState({ search: "" });
	const [loading, setLoading] = useState(false);

	const toggleLogin = useCallback(() => {
		setLoading(true);
		setTimeout(() => {
			authDispatch({
				type: authActions[authState.isLoggedIn ? "LOG_OUT" : "LOG_IN"],
				payload: !authState.isLoggedIn
			});
			setLoading(false);
		}, 1000);
	}, [authState.isLoggedIn, authDispatch]);

	const searchQuery = useCallback((value) => logics.debounce((val) => console.log(val), value), []);

	const handleChange =
		(name) =>
		({ target: { value } }) => {
			setForm((prev) => ({ ...prev, [name]: value }));
			searchQuery(value);
		};

	const btnText = useMemo(() => (authState.isLoggedIn ? "logout" : "login"), [authState.isLoggedIn]);
	return (
		<div>
			{loading ? (
				<span>loading....</span>
			) : (
				<Fragment>
					<h3>{authState.isLoggedIn ? "Dashboard" : "Login"}</h3>
					<button onClick={toggleLogin}>{btnText}</button>
					<input value={form.search} onChange={handleChange("search")} />
				</Fragment>
			)}
		</div>
	);
}

export default withAuthContext(LoginPage);
