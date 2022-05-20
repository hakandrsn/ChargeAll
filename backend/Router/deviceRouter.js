var express = require("express");
var app = express();
var Device = require("../Model/Device.js");
const router = express.Router();
app.use(express.json());
router.get("/", async(req, res) => {
  await  Device.find()
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/list",async (req, res) => {
    console.log(req.params)
   await Device.find({}, { 'operations': false })
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
});
router.get("/list/:id", async(req, res) => {
   await Device.findOne({ _id: req.params.id }, { 'operations': false })
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})
router.get("/list/bysite/:site",async (req, res) => {
    //console.log(req.params)
  await  Device.find({ "site": req.params.site }, { 'operations': false })
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.get("/:id",async (req, res) => {
  await  Device.findOne({ _id: req.params.id })
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})


router.get("/bysite/:site", async (req, res) => {
    console.log(req.params)
    await Device.find({ "site": req.params.site })
        .then((device) => {
            res.json(device);
        })
        .catch((err) => {
            res.json(err);
        });
})


router.post("/", async (req, res) => {
    const product = new Device({
        deviceid: req.body.deviceid,
        location: req.body.location,
        site: req.body.site,
        type: req.body.type,
        allowedsites: req.body.allowedsites,
        operations: req.operations,
    });
    await product.save();
    res.json(product);
})

router.post("/qrcharging", async (req, res) => {
    console.log(req.body)
    await Device.findByIdAndUpdate(req.body.id, {
        mobilecharging: req.body.mobilecharging,
    })
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.put("/:id", (req, res) => {
    Device.findByIdAndUpdate(req.params.id, {
        deviceid: req.body.deviceid,
        location: req.body.location,
        site: req.body.site,
        type: req.body.type,
        allowedsites: req.body.allowedsites,
        operations: req.body.operations,
        mobilecharging: req.body.mobilecharging,
        price: req.body.price
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