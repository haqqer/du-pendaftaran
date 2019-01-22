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
        from: 'ahmadhaqqi690@gmail.com',
        to: to,
        subject: 'PENDAFTARAN DU',
        html: html
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