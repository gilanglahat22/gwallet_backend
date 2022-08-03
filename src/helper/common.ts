import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateToken = (payload:any) => {
  const secretKey:any = process.env.SECRET_KEY_JWT;
  const verifyOptions = {
    expiresIn: 60 * 60,
    issuer: "gwallet"
  };
  const result = jwt.sign(payload, secretKey, verifyOptions);
  return result;
};

const sendEmailVerification = async (email:any, token:any) => {
  const transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL_ACCOUNT,
      pass: process.env.ADMIN_EMAIL_PASSWORD
    }
  });
  const info = await transporter.sendMail({
    from: `gwallet.team`,
    to: email,
    subject: `Gwallet User Registration Verification`,
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
                <title>Document</title>
                <style>
                    body{
                        font-family: 'Open Sans';
                        padding: 100px;
                        border: 1px solid #C6C6C6;
                        border-radius: 20px;
                        box-sizing: border-box;
                    }
                    .container {
                        width: 600px;
                        height: 500px;
                        background-color: #2bafa4;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 20px;
                        box-sizing: border-box;
                    }
                    .title {
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 50px;
                    }
                    .parag {
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 20px;
                        text-align: start;
                        padding: 20px 50px 0 50px;
                        line-height: 30px;
                    }
                    .confirm {
                        text-align: center;
                        text-align: start;
                        padding: 20px 50px 0 50px;
                        line-height: 30px;
                        height: 200px;
                    }
                    .form-button {
                        text-align: center;
                        margin: 0 auto;
                        width: 25rem;
                        height: 4rem;
                        border: none;
                        border-radius: 1rem;
                        font-size: 18px;
                        color: #88888F;
                        font-weight: 700;
                    }
  
                    .form-button:hover {
                        background-color:#FFFFFF;
                        color: #000;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="title">
                        Welcome to Gwallet!
                    </h1>
                    <hr />
                    <div class="parag">
                        Thank you for joining us! To continue the signin process, please click the button "Confirm" below to verify you account!
                    </div>
                    <div class="confirm">
                        <a href="http://localhost:8000/users/verification/${token}" target="_blank"><button class="form-button">CONFIRM</button></a>
                    </div>
                </div>
            </body>
            </html>
            `
  });
  console.log(info);
};

const sendEmailResetPasswordVerification = async (emailTarget: any, token: any) => {
  const transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL_ACCOUNT,
      pass: process.env.ADMIN_EMAIL_PASSWORD
    }
  });
  const info = await transporter.sendMail({
    from: `Gwallet.team`,
    to: emailTarget,
    subject: `Gwallet Reset Password Email Verification`,
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
                <title>Document</title>
                <style>
                    body{
                        font-family: 'Open Sans';
                        padding: 100px;
                        border: 1px solid #C6C6C6;
                        border-radius: 20px;
                        box-sizing: border-box;
                    }
                    .container {
                        width: 600px;
                        height: 500px;
                        background-color: #6379F4;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 20px;
                        box-sizing: border-box;
                    }
                    .title {
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 50px;
                    }
                    .parag {
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 20px;
                        text-align: start;
                        padding: 20px 50px 0 50px;
                        line-height: 30px;
                        margin: 0;
                        position: absolute;
                        top: 50%;
                        -ms-transform: translateY(-50%);
                        transform: translateY(-50%);
                    }
                    .confirm {
                        text-align: center;
                        text-align: start;
                        padding: 20px 50px 0 50px;
                        line-height: 30px;
                        height: 200px;
                        margin: 0;
                        position: absolute;
                        top: 50%;
                        -ms-transform: translateY(-50%);
                        transform: translateY(-50%);
                    }
                    .form-button {
                        text-align: center;
                        margin: 0 auto;
                        width: 25rem;
                        height: 4rem;
                        border: none;
                        border-radius: 1rem;
                        font-size: 18px;
                        color: #88888F;
                        font-weight: 700;
                    }
  
                    .form-button:hover {
                        background-color:#FFFFFF;
                        color: #000;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="title">
                        Gwallet - Reset Password
                    </h1>
                    <hr />
                    <div class="parag">
                        Please do NOT share this to other people! To continue the reset password process, please click the button "Continue" below to verify your email!
                    </div>
                    <div class="confirm">
                        <a href="http://localhost:3000/reset-password/${token}" target="_blank"><button class="form-button">Continue</button></a>
                    </div>
                </div>
            </body>
            </html>
            `
  });
  console.log(info);
};

module.exports = {
  generateToken,
  sendEmailVerification,
  sendEmailResetPasswordVerification
};

export default module;
