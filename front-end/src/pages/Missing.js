import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

export default function Dashboard() {
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs" className={classes.paper}>
			<Typography component="h1" variant="h5">
				404 Page Not Found
			</Typography>
		</Container>
	);
}
