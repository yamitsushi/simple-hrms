import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
	console.log("Mongoose connected to " + process.env.MONGODB_CONNECTION);
});

export default mongoose;
