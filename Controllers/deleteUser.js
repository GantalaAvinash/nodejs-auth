const User = require('../Models/user');

exports.deleteuser = (req, res, next) => {

    const { user_id } = req.body;

    User.findOneAndDelete(
        { user_id }
    ).then(result => {
        res.status(200).json({
            status: true,
            message: `User object ${user_id} deleted successfully`
        })
    }).catch(error => {
        next(error);
    })
}