import session from "express-session";

const option = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		httpOnly: false,
		secure: false,
		maxAge: 2 * 60 * 60 * 100,
	},
	resave: true,
	saveUninitialized: false,
};

export default session(option);
