const conn = require('../database')

module.exports = {
    getuserlist: (req,res) => {
        console.log(req.user.id);
        return res.status(200).json({ idUser: req.user.id })
    }
}