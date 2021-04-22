import React from "react";
import { Container, Typography } from "@material-ui/core";

export default function Dashboard() {
	return (
		<Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
			<Typography component="h1" variant="h5">
				Dashboard
			</Typography>
		</Container>
	);
}
