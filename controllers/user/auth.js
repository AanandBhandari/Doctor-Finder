const User = require('../../models/User')
const { verifyEmail } = require('../../helper/emailverify')
const jwt = require('jsonwebtoken');
const faker = require('faker')


exports.signup = async (req, res) => {
    try {
        let userExists = await User.findOne({ email: req.body.email });
        if (userExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        let user = new User(req.body);
        user.isRegistred = false;
        user = await user.save();
        if (user) {
            const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_EMAIL_VERIFICATION_KEY
                // { expiresIn: 60 * 60 }
            );
            // await verifyEmail(req.body.email,req.body.name,token)
            res.status(200).json({ message: `Follow the link provided to ${req.body.email} to verify it.` });
            // setTimeout(async () => {
            //     // console.log(req.body.email);
            //     const user = await User.findOne({ email: req.body.email })
            //     !user.isRegistred && await User.deleteOne({ _id: user._id });
            //     user.isRegistred && await User.updateOne({ _id: user._id }, { $unset: { isRegistred: "" } }, { multi: false });

            // }, 10000)

        }

    } catch (error) {
        res.status(500).json("Something went wrong.Please try again after 5 minutes")
    }
};
// verifying email link
exports.emailverify = async (req, res) => {
    try {
        const token = req.query.id;
        const decoded = await jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_KEY);
        await User.updateOne({ _id: decoded._id }, { $set: { isRegistred: true } }, { multi: false })
        res.status(200).json({ message: 'Successfully signup!' })
    } catch (error) {
        res.send(400).json({ message: 'Invalid Link' })
    }
}
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findByCredentials(email, password)
        user.salt = undefined
        user.password = undefined
        if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY)
            return res.json({ token, user });
        }
        throw 'User not found'
    } catch (error) {
        res.status(401).json(error)
    }
}

// authentication middleware
exports.authenticator = async (req, res, next) => {
    const token = req.headers.authorization;
    try {

        if (token) {
            const result = await parseToken(token)
            if (result) {
                const user = await User.findById(result._id).select("name  email ")
                if (user) {
                    req.user = user
                    return next();
                }
                throw 'Invalid User'
            }
            throw 'Invalid Token'
        }
        throw 'Invalid User'
    } catch (error) {
        res.status(401).json(error)
    }
}
function parseToken(token) {
    try {
        return jwt.verify(token.split(" ")[1], process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return Error({ error: error.message });
    }
}

// has authorization middleware
exports.hasAuthorization = async (req, res, next) => {
    try {
        const sameUser = req.profile && req.user && req.profile._id.toString() === req.user._id.toString()
        if (sameUser) {
            return next();
        }
        throw 'User is not authorized to perform this action'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}

exports.createFakeUser = async(req, res) => {
    const num = req.params.num;
    for (let i = 0; i < num; i++) {
        let user = {

            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            // phoneno: faker.phone.phoneNumber(),
            currentCity: faker.address.city()
        }
        let newuser = new User(user);
        await newuser.save();

    }
    res.send(`${num} fake user is has been created`)
}