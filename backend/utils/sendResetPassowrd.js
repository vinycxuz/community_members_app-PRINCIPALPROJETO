const nodemailer = require('nodemailer');

const sendResetPassword = async (email, token) => {
  try{
    const transporter = nodemailer.createTransport
    ({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth:{
        user: '',
        pass: ''
      }
    });
    const message = {
      to,
      subject: 'Reset Password',
      html: `<h1>Click the link below to reset your password</h1>
             <p>http://localhost:5173/dashboard/reset-password/${token}</p>`
    }

    const info = await transporter.sendMail(message)
    return info
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendResetPassword;