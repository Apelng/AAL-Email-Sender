const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
 app.use(express.static(__dirname)); // serve frontend files



app.post('/send-email', async (req, res) => {
  const { email, image, name } = req.body;

  // Setup your email service
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // or your preferred provider
//     auth: {
//       user: 'your.email@gmail.com',
//       pass: 'your-password-or-app-password'
//     }
//   });


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:'trustees@apelasset.com',
      pass: 'vure kwjm kdta ofqd',
    },
  });

  const mailOptions = {
    from: `"Jane doe" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Welcome on Board, ${name}`,
    text: '',
    attachments: [
      {
        filename: 'welcome-letter.jpg',
        content: image.split("base64,")[1],
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Email failed');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
