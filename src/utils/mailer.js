const sgMail = require('@sendgrid/mail');

const Mailer = (to, html) => {
    console.log('trigger')
    sgMail.setApiKey('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');
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