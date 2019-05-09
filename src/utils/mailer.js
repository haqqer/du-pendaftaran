const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

const templateDir = path.join(__dirname, '..', 'public', 'templates');

const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
        options: {
            extension: 'ejs'
        }
    }
})

let mailSender = (mailData) => {

    email.send({
        template: path.join(__dirname, '..', 'public', 'templates'),
        message: {
            from: '"PANITIA DU 2019 "'+process.env.MAIL_USER,
            to: mailData.email
        },
        locals: {
            email: mailData.email,
            name: mailData.name,
            class: mailData.clas
        }
    })
    .then(() => {
        console.log('Email Sent!');
    })
    .catch((err) => {
        console.log(err);
    })    
}