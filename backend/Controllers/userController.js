const { User } = require('../Models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY;

const { userAuthSchema, loginAuthSchema } = require('../Validation/validation_schema');
const { Teacher } = require('../Models/teachers');
const Login = async (req, res) => {
    try {
        const result = await loginAuthSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email });
        if (!user) {
            return res.status(404).json({ status: false, msg: 'User not Found.' })
        } else {
            const newPassword = await bcrypt.compare(result.password, user.password);
            if (!newPassword) {
                return res.status(401).json({ status: false, msg: 'Incorrect Pasword' })
            } else {
                const token = await jwt.sign({ id: user._id, email: user.email }, secret_key, { expiresIn: '1d' });
                res.cookie('jwt', token, {
                    httpOnly: true,
                    sameSite: 'Strict',
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.status(200).json({ data: user, status: true, msg: 'logged in successfully', token: token });

            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server Error' })
    }
}

const SignUp = async (req, res) => {
    console.log('hi',req.body)
    try {
        const result = await userAuthSchema.validateAsync(req.body, { abortEarly: false });
        result.role = result.role.toLowerCase();
        const user = new User(result);
        await user.save()
        if(result.role==='teacher'){
            const teacher=await new Teacher({teacher:user._id})
            await teacher.save()
        }
        res.status(200).json({ data: user, msg: 'User Created SuccessFully.' })
    } catch (error) {
        console.log(error)
        if (error.isJoi) {
            return res.status(400).json({ msg: error.details[0].message });
        }
        res.status(500).json({ msg: 'Server Error' })
    }
}
module.exports = {
    Login,
    SignUp
}
