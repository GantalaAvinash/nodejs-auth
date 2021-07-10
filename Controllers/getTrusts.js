const trustsData = require('../Models/trust');

exports.getTrusts = async (req, res) => {
	const trusts = await trustsData.find();
	res.status(200).json({
		status: true,
		trusts,
	});
};