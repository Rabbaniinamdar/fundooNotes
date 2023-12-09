/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer';


export const sendEmail = async (token, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'funnyshortsu@gmail.com',
                pass: 'hxhr elxs mkiy hnan'
            }
        });

        const mailOptions = {
            from: 'funnyshortsu@gmail.com',
            to: email,
            subject: 'Password Reset Token',
            text: `Your password reset token is: ${token}`,
            // eslint-disable-next-line max-len
            html: `<h1>Hello,<br><br>Click on the given link to reset your password!</h1><br><h1>Link: 
            <a href="http://localhost:${process.env.APP_PORT}/api/v2/resetpassword/${token}">click here</a></h1>`
        };
        await transporter.sendMail(mailOptions);

        return mailOptions;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};