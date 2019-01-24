const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Crypto = require("crypto");
const bearerToken = require('express-bearer-token');

var app = express();
var port = process.env.PORT || 1997;

app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

app.get('/', (req,res) => {
    res.send('<h1>Selamat datang di API!</h1>')
})

app.get('/testencrypt', (req,res) => {
    var hashPassword = Crypto.createHmac("sha256", "kucingbertasbih")
                            .update(req.query.password).digest("hex");
    console.log(hashPassword);
    res.send(`Panjang= ${hashPassword.length} Password anda ${req.query.password} di encrypt menjadi ${hashPassword}`)
})

const {
    authRouter,
    adminRouter
} = require('./routers')

app.use('/auth', authRouter)
app.use('/admin', adminRouter)

app.listen(port, () => console.log('API aktif di port ' + port))