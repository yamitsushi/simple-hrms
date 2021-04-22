import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!rest.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={rest.redirect} />
				)
			}
		/>
	);
};

export default UnauthenticatedRoute;
