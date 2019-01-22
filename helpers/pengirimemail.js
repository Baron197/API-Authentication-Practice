const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'baronhartono@gmail.com',
        pass: 'nflxpdrtpvxejcip'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;
