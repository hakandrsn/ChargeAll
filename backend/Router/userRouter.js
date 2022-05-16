const express = require("express");
const app = express();
const User = require("../Model/UserModel.js");
const router = express.Router();
app.use(express.json());
router.get("/", async (req, res) => {
    await User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/:id", async (req, res) => {
    await User.findOne({ _id: req.params.id })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.get("/bysite/:site", async (req, res) => {
    console.log(req.params.site)
    await User.find({ "site": req.params.site })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})


router.post("/", async (req, res) => {
    try {
        const addUser = new User(req.body);
        const result = await addUser.save();
        return res.json(result);
    } catch (e) {
        return console.log(e)
    }
})

router.post("/addoperation", async (req, res) => {
    console.log(req.body);
    await User.findByIdAndUpdate(req.body.id, {
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

router.put("/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
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

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
})
module.exports = router;