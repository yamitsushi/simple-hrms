import { Dialog, DialogTitle, LinearProgress } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../store/useGlobalState";

function Loading() {
	const { state } = useContext(Context);
	return (
		<Dialog disableBackdropClick open={state.loading}>
			<DialogTitle>
				Please stand by
				<LinearProgress />
			</DialogTitle>
		</Dialog>
	);
}

export default Loading;
