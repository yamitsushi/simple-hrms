import React, { useContext } from "react";
import { Container, Typography } from "@material-ui/core";

import { Context } from "../store/useGlobalState";

export default function Dashboard() {
	const { state } = useContext(Context);
	console.log(state);
	return (
		<Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
			<Typography component="h1" variant="h5">
				Dashboard
			</Typography>
		</Container>
	);
}
