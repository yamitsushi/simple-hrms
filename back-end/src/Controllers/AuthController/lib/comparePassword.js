import bcrypt from "bcrypt";

export default async (password, hashedPassword) => {
	const result = await new Promise((resolve, reject) => {
		bcrypt.compare(password, hashedPassword, (err, result) => {
			if (result) resolve(true);
			reject(err);
		});
	});
	return result;
};
