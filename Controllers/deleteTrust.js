const Trust = require('../Models/trust');

exports.deleteTrust = async (req, res, next) => {

    const { trust_id } = req.body;

    Trust.findOneAndDelete(
        {trust_id }
    ).then(result => {
        res.status(200).json({
            status: true,
            message: `Trust object ${trust_id} deleted successfully`
        })
    }).catch(error => {
        next(error);
    })
}

/*
    TO DO: Implement something that corrects pat_id after deleting a document
*/