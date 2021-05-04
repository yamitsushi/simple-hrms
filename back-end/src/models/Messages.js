import mongoose from "../plugins/mongoose";
import Rooms from "../models/Rooms";
import Users from "../models/Users";

const Messages = mongoose.Schema(
	{
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: Rooms,
			required: true,
		},
		messages: [
			{
				isDocument: { type: Boolean, default: false },

				document: {
					directory: { type: String },
					name: { type: String },
				},

				text: { type: String },

				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: Users,
					required: true,
				},
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Messages", Messages);
