const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

let mailSender = (mailData) => {
    console.log("mailer running ..");
    let templateDir = path.join(__dirname, '..', 'public', 'templates');
    let template = new EmailTemplate(templateDir);
    const document = {
        email: mailData.email,
        name: mailData.nama,
        class: mailData.kelas
    }
    template.render(document, (err, result) => {
        if(!err) {
            const body = {
                from: '"PANITIA DU 2019" '+process.env.MAIL_USER,
                to: mailData.email,
                subject: 'PENDAFTARAN DU',
                html: result.html
            };
            transporter.sendMail(body, (err, info) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("SUKSES!");
                    console.log(info);
                }
            })
        }

    })
    
   

}

module.exports = mailSender