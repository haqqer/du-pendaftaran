const sgMail = require('@sendgrid/mail');

let Mailer = (to, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to,
      from: 'smtp.sendgrid.net',
      subject: 'PENDAFTARAN DU',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>'+text+'</strong>',
    };
    sgMail.send(msg);
    // try {
    //     const result =   
    //     if(result) {
    //       console.log('EMAIL SENT!')
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    
}
module.exports = Mailer