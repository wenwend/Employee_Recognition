var nodemailer = require('nodemailer');

recipientEmail = process.argv[2];

var message_body = '';
message_body += 'Hello,\n';
message_body += '\n';
message_body += 'For your hard work and accomplishments, you\'ve been sent the attached award!\n';
message_body += '\n';
message_body += '\n';
message_body += 'Sincerely,\n';
message_body += 'Your Lynx Team';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lynx.no.reploy@gmail.com',
    pass: 'admini_strator_2018'
  }
});

var mailOptions = {
    to: recipientEmail,
    subject: 'Congratulations! You\'ve been sent an award!',
    text: message_body,
    attachments: [
    {   // filename and content type is derived from path
        path: './award.pdf'
    }]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
