var express = require("express");
var app = express();
const req = require("express/lib/request");
var Admin=require("../Model/Admin.js");
const router = express.Router();

app.use(express.json());
router.post("/", (req, res) => {
    console.log(req.body.username)
    Admin.find({"username":req.body.username, "password":req.body.password })
    .then((admins) => {
        res.json(admins);
    })
    .catch((err) => {
        res.json(err);
    });
    
})

router.put("/:id", (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        adminid:req.body.adminid,
        username:req.body.username,
        password:req.body.password,
        adsoyad: req.body.adsoyad,
        site: req.body.site,
        mail: req.body.mail,
        tel: req.body.tel,
        devices:req.body.devices,
    })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router;