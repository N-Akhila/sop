const nodemailer = require('nodemailer');

async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service (e.g., 'gmail')
    auth: {
      user: 'akhila242424@gmail.com',
      pass: 'bubnqpponreprdmw',
    },
  });

  const mailOptions = {
    from: 'nemalikantiakhila24@gmail.com',
    to: email,
    subject: 'Form Submission',
    text: 'Thank you for your submission.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = sendEmail;
