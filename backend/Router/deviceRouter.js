var express = require("express");
var app = express();
const req = require("express/lib/request");
var Device=require("../Model/Device.js");
const router = express.Router();
app.use(express.json());
router.get("/", (req, res) => {
    console.log(req.params)
    Device.find()
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/list", (req, res) => {
    console.log(req.params)
    Device.find({}, {'operations': false})
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/:id", (req, res) => {
    Device.findOne({_id:req.params.id})
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.get("/bysite/:site", (req, res) => {
    console.log(req.params)
    Device.find({"site":req.params.site})
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})


router.post("/", (req, res) => {
    const product = new Device({
        deviceid: req.body.deviceid,
        location: req.body.location,
        site: req.body.site,
        type:req.body.type,
        allowedsites:req.body.allowedsites,
        operations: req.operations,
    });
    product.save();
    res.json(product);
})

router.put("/:id", (req, res) => {
    Device.findByIdAndUpdate(req.params.id, {
        deviceid: req.body.deviceid,
        location: req.body.location,
        site: req.body.site,
        type:req.body.type,
        allowedsites:req.body.allowedsites,
        operations: req.operations,
        mobilecharging:req.mobilecharging,
    })
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.delete("/:id", (req, res) => {
    Device.findByIdAndDelete(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router;