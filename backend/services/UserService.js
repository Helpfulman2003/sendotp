const User = require("../model/UserModel")
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const sendEmailCreate = require("./EmailService");
const otpService = require("./OtpService");
const Otp = require("../model/OtpModel");


const userService = {
    registerUser: async({email}) => {
        const user = await User.findOne({email})
        if(user) {
            return {
                code: 400,
                element: "This email already in user",
            }
        }
        const OTP = otpGenerator.generate(6, {digits: true ,upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false})
        const otp = bcrypt.hashSync(OTP, 10)
        console.log(OTP);
        await sendEmailCreate(OTP, email)
        return {
            code: 200,
            element: await otpService.insertOtp({otp, email})
        }
    },
    verifyOtp: async({otp, email, username, password}) => {
        try {
            const otpOlder = await Otp.find({email})
            if(!otpOlder) {
                return {
                    code: 404,
                    element: "Expired OTP"
                }
            }
            const lastOtp = otpOlder[otpOlder.length - 1]
            const invalid = await otpService.validOtp({otp, hashOtp: lastOtp.otp})
            if(!invalid) {
                return {
                    code: 401,
                    message: "Invalid Otp"
                }
            }
            if(invalid && email === lastOtp.email) {
                //create user
                const hashPassword = bcrypt.hashSync(password, 10)
                const user = await User.create({
                    email,
                    username,
                    password: hashPassword
                })
                if(user) {
                    await Otp.deleteMany({email})
                }
                return {
                    code: 201,
                    element: user
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userService