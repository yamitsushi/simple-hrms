import mongoose from "../plugins/mongoose";

const Users = mongoose.Schema(
	{
		username: {
			type: String,
			index: true,
			require: true,
			trim: true,
		},
		password: {
			type: String,
			require: true,
			trim: true,
		},
	},
	{
		timestamp: true,
	}
);
export default mongoose.model("User", Users);
