const jwt = require( 'jsonwebtoken')

const SECRET_KEY = "abcdefghijklmnop"
exports.generateToken = (id) => {
    return jwt.sign({id}, SECRET_KEY ,{
        expiresIn: '30d'
    })
};
