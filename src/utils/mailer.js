const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

let mailSender = (to, html) => {
    console.log("mailer")
    const document = {
        from: '"PANITIA DU 2019" '+process.env.MAIL_USER,
        to: to,
        subject: 'PENDAFTARAN DU',
        html: '<h2>'+html+'<h2>'
    };
    transporter.sendMail(document, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })

}

module.exports = mailSender