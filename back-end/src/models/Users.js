import mongoose from "../plugins/mongoose";
import bcrypt from "bcrypt";

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
		timestamps: true,
	}
);

Users.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	return next();
});

export default mongoose.model("User", Users);
