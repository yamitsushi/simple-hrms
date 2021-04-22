import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Missing from "./pages/Missing";

import { Context } from "./store/useGlobalState";

function App() {
	const { state } = useContext(Context);
	return (
		<BrowserRouter>
			<Switch>
				<UnauthenticatedRoute
					exact
					path="/login"
					redirect="/"
					isAuthenticated={state.user?.username}
					component={Login}
				/>
				<AuthenticatedRoute
					exact
					path="/"
					redirect="/login"
					isAuthenticated={state.user?.username}
					component={Dashboard}
				/>
				<Route path="*" component={Missing} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
