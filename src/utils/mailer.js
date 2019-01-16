const sgMail = require('@sendgrid/mail');

const Mailer = (to, html) => {
    console.log('trigger')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to,
      from: 'ilhamserbaguna@gmail.com',
      subject: 'Pendaftaran DU',
      text: html,
      html: '<strong>'+html+'</strong>'
    };
    sgMail.send(msg)
}

module.exports = Mailer