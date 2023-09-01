process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./sendMail'); // Import the sendEmail function
const cors = require('cors');
const favicon = require('serve-favicon');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Handle form submission
app.post('/submit', (req, res) => {
  const {email} = req.body;
  // Send an email
  const emailSent = sendEmail(email);
  if (emailSent) {
    res.status(200).json({ message: 'Email sent successfully!' });
  } else {
    res.status(500).json({ error: 'Error sending email.' });
  }
});
app.use(favicon(__dirname + '/public/favicon.ico'));
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
