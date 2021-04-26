export default (req, res) => {
	req.session.destroy();
	return res.status(204).send();
};
