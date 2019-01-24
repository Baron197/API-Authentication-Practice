const Crypto = require("crypto");
const conn = require('../database')
const transporter = require('../helpers/pengirimemail')

module.exports = {
    register: (req,res) => {
        var { username, password, email, phone } = req.body;
        var sql = `SELECT username from user WHERE username='${username}'`;
        conn.query(sql, (err,results) => {
            if(err) {
                throw err;
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
                        throw err1;
                    }

                    var linkVerifikasi = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`;
                    var mailOptions = {
                        from: 'Penguasa Hokage Club <baronhartono@gmail.com>',
                        to: email,
                        subject: 'Verifikasi Email untuk Hokage Club',
                        html: `Tolong click link ini untuk verifikasi : <a href="${linkVerifikasi}">Join Hokage Club!</a>`
                    }

                    transporter.sendMail(mailOptions, (err2,res2) => {
                        if(err2) { 
                            console.log(err2) 
                            throw err2;
                        }
                        else {
                            console.log('Success!')
                            res.send({ username, email, role: 'User', status: 'Unverified', token: '' })
                        }
                    })
                })
            }
        })
    },
    signin: (req,res) => {

    }
}