import { createContext, useState } from "react";

const Context = createContext({});

const useGlobalState = () => {
	const [state, setState] = useState({});

	const actions = (action) => {
		const { type, payload } = action;
		switch (type) {
			case "setState":
				return setState(payload);
			default:
				return state;
		}
	};
	return { state, actions };
};

export { Context, useGlobalState };
