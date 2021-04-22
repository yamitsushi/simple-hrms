import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../components/Copyright";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	CssBaseline,
	TextField,
	Box,
	Typography,
	Container,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "../plugins/axios";
import { Context } from "../store/useGlobalState";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const { state, actions } = useContext(Context);
	const history = useHistory();
	const classes = useStyles();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	function loginSubmit(e) {
		e.preventDefault();
		axios
			.post("/login", {
				username,
				password,
			})
			.then((response) => {
				actions({
					type: "setState",
					payload: { ...state, user: response.data },
				});
				history.push("/");
			})
			.catch((error) => {
				setMessage(error.response.data);
				console.log(message);
			});
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{message && (
					<Alert
						severity="error"
						onClose={() => {
							setMessage();
						}}
					>
						<AlertTitle>{message.title}</AlertTitle>
						{message.message}
					</Alert>
				)}

				<form className={classes.form} id="login-form">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={(event) => setUsername(event.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={loginSubmit}
					>
						Sign In
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default Login;
