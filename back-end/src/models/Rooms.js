import mongoose from "../plugins/mongoose";
import Users from "./Users";

const Rooms = mongoose.Schema(
	{
		lastMessages: {
			isDocument: { type: Boolean },

			document: {
				directory: { type: String },
				name: { type: String },
			},

			text: { type: String },

			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: Users,
			},
			date: {
				type: Date,
			},
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: Users,
				required: true,
			},
		],
		title: {
			type: String,
			required: true,
		},
		updated: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: Users,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Rooms", Rooms);
