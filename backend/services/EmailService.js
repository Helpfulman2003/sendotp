const nodemailer = require("nodemailer");
const sendEmailCreate = async(otp, email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465, // Sử dụng cổng 587 thay vì 465
        secure: true, // true cho cổng 465, false cho các cổng khác
        auth: {
            user: "helpfulman20032003@gmail.com",
            pass: "ltepdgarbjdqzzqk"
        },
        tls: { rejectUnauthorized: true } // Tạm thời tắt rejectUnauthorized
    });

    const mailOptions = {
        from: "helpfulman20032003@gmail.com",
        to: `${email}`,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<b>Otp của bạn là ${otp}</b>`,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Email đã gửi thành công :" + info.response);
    } catch (error) {
        console.log("Gửi email không thành công :"+ error);
    }


}

module.exports = sendEmailCreate