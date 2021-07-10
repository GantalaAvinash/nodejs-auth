const UserData = require('../Models/user');


exports.getUserbyId = async (req, res, next) => {
	try {
		const { user_id } = req.params;

		const UsersList = await UserData.find({
			user_id: user_id,
		});

		res.status(200).json({
			status: true,
			NoOfUsers: UsersList.length,
			Users: UsersList,
		});
	} catch (error) {
		next(error);
	}
};
