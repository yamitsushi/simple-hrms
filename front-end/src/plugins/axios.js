import axios from "axios";
import { useContext } from "react";

import { Context } from "../store/useGlobalState";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_ADDRESS,
	headers: { "X-Requested-With": "XMLHttpRequest" },
});

export function WithAxios({ children }) {
	const { state, actions } = useContext(Context);
	instance.interceptors.request.use((config) => {
		actions({
			type: "setState",
			payload: { ...state, loading: true },
		});
		return config;
	});

	instance.interceptors.response.use((response) => {
		actions({
			type: "setState",
			payload: { ...state, loading: false },
		});
		return response;
	});
	return children;
}

export default instance;
