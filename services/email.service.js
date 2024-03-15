const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
console.log(config.email.smtp)
const transport = nodemailer.createTransport(config.email.smtp)

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((err) => logger.warn(err));
}

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
}

const sendResetPasswordEmail = async (to, codeOtp) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const text = `Dear user,
  To reset your password, this is your otp code: ${codeOtp}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
}

const sendVerificationEmail = async (to, codeOtp) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  // const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
  To verify your email, this is your otp code: ${codeOtp}
  If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendCreateColis = async(to, colis) =>{
  const subject = "Création de colis réussie";
  const text = `la création de votre colis "${colis.nom}" a été effectué avec succes`;
  await sendEmail(to, subject, text);
}

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendCreateColis
};