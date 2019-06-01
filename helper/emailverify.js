const nodemailer = require("nodemailer");
exports.verifyEmail = async(email, name, token) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.VERIFICATION_EMAIL,
            pass: process.env.VERIFICATION_PASSWORD
        }
    });
    let mailOptions = {
        from: "Doctor Finder",
        to: email,
        subject: "email verification",
        html: `<p>Hi, ${name} . </p></br>
                    <a href="${process.env.EMAIL_REDIRECT_LINK}/api/emailVerify?id=${token}">Click me to register your account</a>`
    };
    return await transporter.sendMail(mailOptions)

}