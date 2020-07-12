const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    jwt_key: process.env.JWT_KEY,
}
