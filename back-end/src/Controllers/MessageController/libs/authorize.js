export default async (user) => {
	const result = await new Promise((resolve, reject) => {
		if (!user) reject("Unauthorized");
		resolve(true);
	});
	return result;
};
