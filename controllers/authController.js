const Crypto = require("crypto");
const conn = require('../database')
const transporter = require('../helpers/pengirimemail')

module.exports = {
    register: (req,res) => {
        var { username, password, email, phone } = req.body;
        var sql = `SELECT username from user WHERE username='${username}'`;
        conn.query(sql, (err,results) => {
            if(err) {
                res.send({ status: 'error', message: 'System Error'});
                res.end();
            }

            if(results.length > 0) {
                res.send({ status: 'error', message: 'Username has been taken!'})
            }
            else {
                var hashPassword = Crypto.createHmac("sha256", "kucingbertasbih")
                                        .update(password).digest("hex");
                var dataUser = { 
                    username, 
                    password: hashPassword,
                    email,
                    phone,
                    role: 'User',
                    status: 'Unverified',
                    lastlogin: new Date()
                }
                sql = `INSERT into user SET ? `;
                conn.query(sql,dataUser,(err1, results1) => {
                    if(err1) {
                        res.send({ status: 'error', message: 'System Error'});
                        res.end();
                    }

                    var linkVerifikasi = ``;
                    var mailOptions = {
                        from: 'Penguasa Hokage Club <baronhartono@gmail.com>',
                        to: email,
                        subject: 'Verifikasi Email untuk Hokage Club',
                        html: `Tolong click link ini untuk verifikasi : ${linkVerifikasi}`
                    }

                    transporter.sendMail(mailOptions, (err,res1) => {
                        if(err) { 
                            console.log(err) 
                            res.send('Error')
                        }
                        else {
                            console.log('Success!')
                            res.send('Success')
                        }
                    })
                })
            }
        })
    },
    signin: (req,res) => {

    }
}