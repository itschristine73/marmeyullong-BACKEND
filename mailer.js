const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4,   // force IPv4, avoids Render's IPv6 routing issue
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function notifyAdmin(subject, text) {
  transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject,
    text,
  }).catch(err => console.error('Email failed to send:', err.message));
}

module.exports = { notifyAdmin };