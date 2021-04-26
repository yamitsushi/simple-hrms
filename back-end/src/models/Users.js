import mongoose from "../plugins/mongoose";

const Users = mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		name: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
		},
		department: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
	},
	{
		timestamp: true,
	}
);
export default mongoose.model("User", Users);
