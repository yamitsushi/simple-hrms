import mongoose from "../plugins/mongoose";

const Applicants = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Jobs",
			required: true,
		},
		bio: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "New Applicant",
		},
		remark: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Applicants", Applicants);
