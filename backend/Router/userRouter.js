var express = require("express");
var app = express();
const req = require("express/lib/request");
var User = require("../Model/User.js");
const router = express.Router();
app.use(express.json());
router.get("/", (req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/:id", (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.get("/bysite/:site", (req, res) => {
    console.log(req.params.site)
    User.find({ "site": req.params.site })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.post("/", (req, res) => {
    const product = new User({
        userid: req.body.userid,
        cardid: req.body.cardid,
        username: req.body.username,
        password: req.body.password,
        balance: req.balance,
        devices: req.body.devices,
        operations: req.operations,
        site: req.body.site,
    });
    product.save();
    res.json(product);
})

router.post("/addoperation", (req, res) => {
    console.log(req.body);
    User.findByIdAndUpdate(req.body.id, {
        $push: {
            "fills": {
                "amount": req.body.amount,
                "lastbalance": req.body.lastbalance,
                "admin": req.body.admin,
                "date": req.body.date
            }
        }
    })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.put("/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        userid: req.body.userid,
        cardid: req.body.cardid,
        username: req.body.username,
        password: req.body.password,
        balance: req.body.balance,
        devices: req.body.devices,
    }, { $push: { "operations": req.body.operations } })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})
module.exports = router;