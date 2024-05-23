import User from '@/models/userModel';
import { verify } from 'crypto';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEMail = async({email, emailType, userId}:any) =>{
    try {
       const hasedToken = await bcryptjs.hash(userId.toString(), 10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
              { $set: {verifyToken:hasedToken, verifyTokenExpiry:Date.now() + 3600000}})
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
              { $set: {verifyToken:hasedToken, verifyTokenExpiry:Date.now() + 3600000}})
        }

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "a75145f8fa6d38",
            pass: "f9ac043ecb8591"
          }
        });
          const mailOptions = {
            from: 'hello@hello.ai',
            to: email,
            subject: emailType === 'VERIFY'? "Verify your email" : "Reset your password", 
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}"> Here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password" } or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemial?token=${hasedToken}</p>`,
          }
          const mailResoponse = await transporter.sendMail(mailOptions)
          return mailResoponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}