const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY"

const auth = async (req, res, next) => {
    const cookies = req.cookies
        try {
            const verified = await jwt.verify(cookies.token, SECRET_KEY)
            if(verified && verified.user.Id) {
                req.userId = verified.userIdnext()
            } else {
                throw "invalid user"
            }
        } catch (error) {
            res.status(401).redirect('/LOGIN')
            res.end()
            return;
        }

}
const createToken = async (userId) => {
    return await jwt.sign(
        {userId: userId},
        SECRET_KEY,
        {expiresIn: "1h"}
    )
}

module.exports = {
    auth,
    createToken
}