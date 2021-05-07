import mongoose from "../plugins/mongoose";

const Jobs = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "Active",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Jobs", Jobs);
