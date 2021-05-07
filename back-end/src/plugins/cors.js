import cors from "cors";

export default cors({
	origin: process.env.FRONT_END_ORIGIN,
	credentials: true,
});
