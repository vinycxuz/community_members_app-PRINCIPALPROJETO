const nodemailer = require('nodemailer');

const sendAccountVerification = async (email, token) => {
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
      subject: 'Account Verification',
      html: `<h1>Click the link below to verify your account</h1>
             <p>http://localhost:5173/dashboard/account-verification/${token}</p>`
    }

    const info = await transporter.sendMail(message)
    return info
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendAccountVerification;