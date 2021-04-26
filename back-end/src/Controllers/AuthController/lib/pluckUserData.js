export default (user) => {
	return {
		id: user.id,
		name: user.name,
		picture: user.picture,
		position: user.position,
	};
};
