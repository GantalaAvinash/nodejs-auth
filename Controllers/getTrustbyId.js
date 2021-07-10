const TrustData = require('../Models/trust');


exports.getTrustbyId = async (req, res, next) => {
	try {
		const { trust_id } = req.params;

		const TrustList = await TrustData.find({
			trust_id: trust_id,
		});

		res.status(200).json({
			status: true,
			NoOfTrust: TrustList.length,
			Trust: TrustList,
		});
	} catch (error) {
		next(error);
	}
};
