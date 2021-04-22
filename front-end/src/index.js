import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Loading from "./components/Loading";
import reportWebVitals from "./reportWebVitals";
import { Context, useGlobalState } from "./store/useGlobalState";
import { WithAxios } from "./plugins/axios";

const Index = () => {
	const store = useGlobalState();
	return (
		<Context.Provider value={store}>
			<WithAxios>
				<Loading />
				<App />
			</WithAxios>
		</Context.Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
