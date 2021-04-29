export default async (user) => {
	const result = await new Promise((resolve, reject) => {
		if (user.position != "HRIS Manager") reject("Forbidden");
		resolve(true);
	});
	return result;
};
