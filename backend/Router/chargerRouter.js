var express = require("express");
var app = express();
const req = require("express/lib/request");
var Device=require("../Model/Device.js");
var User=require("../Model/User.js");
const router = express.Router();
app.use(express.json());


router.get("/info", (req, res) => {
    //console.log('deviceid: ' + req.query.deviceid)
    //console.log('userid: ' + req.query.deviceid)
    //console.log('state: ' + req.query.state)
    user=null
    device=null

    Device.findOne({"deviceid":req.query.deviceid}, {'operations': false})
        .then((devices) => {
            //console.log(devices)
            device=devices
            if(devices==null)
            {
                res.send("<PC><MESSAGE>"+device.deviceid+" CIHAZ YOK</MESSAGE></PC>")
            }
            else
            {
                if(device.mobilecharging!="")
                {
                    Device.findByIdAndUpdate(device.id, {"state":req.query.state, "charginguser":"","date":new Date().toISOString()})
                    .then((product) => { })
                    .catch((err) => { res.json(err);});

                    User.findOne({"cardid":req.query.cardid}, {'operations': false})
                    .then((users) => {
                        user=users
                        if(users==null)
                        {
                            res.send("<PC>MOBILECHARGE"+device.mobilecharging+"<MESSAGE>"+device.deviceid+" "+device.site+"-KULLANICI YOK!-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                        }
                        else
                        {
                            res.send("<PC>MOBILECHARGE"+device.mobilecharging+"<MESSAGE>"+device.deviceid+" "+device.site+"-"+user.userid+" "+parseInt(user.balance) +"TL-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                        }
                    })
                    .catch((err) => { });
                }
                else
                {
                    Device.findByIdAndUpdate(device.id, {"state":req.query.state, "charginguser":"","date":new Date().toISOString()})
                    .then((product) => { })
                    .catch((err) => { res.json(err);});

                    User.findOne({"cardid":req.query.cardid}, {'operations': false})
                    .then((users) => {
                        user=users
                        if(users==null)
                        {
                            res.send("<PC><MESSAGE>"+device.deviceid+" "+device.site+"-KULLANICI YOK-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                        }
                        else
                        {
                            res.send("<PC><MESSAGE>"+device.deviceid+" "+device.site+"-"+user.userid+" "+parseInt(user.balance) +"TL-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                        }
                    })
                    .catch((err) => { });
                }
                
                
            }


        })
        .catch((err) => { });
    
});

router.get("/mobilecheck", (req, res) => {
    //console.log('deviceid: ' + req.query.deviceid)
    user=null
    device=null

    Device.findOne({"deviceid":req.query.deviceid}, {'operations': false})
        .then((devices) => {
            //console.log(devices)
            device=devices
            if(devices==null)
            {
                res.send("<PC><MESSAGE>"+device.deviceid+" CIHAZ YOK</MESSAGE></PC>")
            }
            else
            {
                if(device.mobilecharging!="")
                {
                    Device.findByIdAndUpdate(device.id, {"state":req.query.state, "charginguser":"","mobilecharging":"","date":new Date().toISOString()})
                    .then((product) => { })
                    .catch((err) => { res.json(err);});
                    res.send("<PC><MC>"+device.mobilecharging+"</MC></PC>")
                }    
                else
                {
                    res.send("<PC></PC>")
                }            
            }
        })
        .catch((err) => { });
});


router.get("/start", (req, res) => {
    //console.log('deviceid: ' + req.query.deviceid)
    //console.log('userid: ' + req.query.cardid)
    user=null
    device=null

    Device.findOne({"deviceid":req.query.deviceid}, {'operations': false})
        .then((devices) => {
            //console.log(devices)
            device=devices
            if(devices==null)
            {
                res.send("<PC>NOCHARGE<MESSAGE>"+device.deviceid+" "+device.site+"-YETKISIZ-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
            }
            else
            {
                User.findOne({"cardid":req.query.cardid,"site":device.site}, {'operations': false})
                .then((users) => {
                    //console.log(users)
                    user=users
                    if(user==null)
                    {
                        Device.findByIdAndUpdate(device.id, {"state":"0", "charginguser":"","date":new Date().toISOString()})
                                .then((product) => { })
                                .catch((err) => { res.json(err);});
                        res.send("<PC>NOCHARGE<MESSAGE>"+device.deviceid+" "+device.site+"-KULLANICI YOK-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                    }
                    else if(user.balance<device.price)
                    {
                        Device.findByIdAndUpdate(device.id, {"state":"0", "charginguser":"","date":new Date().toISOString()})
                                .then((product) => { })
                                .catch((err) => { res.json(err);});
                        res.send("<PC>NOCHARGE<MESSAGE>"+device.deviceid+" "+device.site+"-BAKIYE YETERSIZ-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
                    }
                    else
                    {
                        User.findByIdAndUpdate(user.id, {"chargingdevice":device.deviceid, "date":new Date().toISOString()})
                        .then((users) => { })
                        .catch((err) => {
                            res.json(err);
                        });
                        Device.findByIdAndUpdate(device.id, {"state":"1","charginguser":user.userid,"mobilecharging":"","date":new Date().toISOString() })
                                .then((product) => { })
                                .catch((err) => { res.json(err);});
                        res.send("<PC>STARTCHARGE"+parseInt(user.balance/device.price) +"<MESSAGE>"+device.deviceid+" "+device.site+"-"+user.cardid+" "+parseInt(user.balance) +"TL-DK UCRET:"+device.price+" TL</MESSAGE><USER>"+user.cardid+"</USER></PC>")
                    }
                })
                .catch((err) => { res.json(err); });
            }
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/stop", (req, res) => {
    //console.log('deviceid: ' + req.query.deviceid)
    //console.log('userid: ' + req.query.userid)
    //console.log('duration: ' + req.query.duration)
    user=null
    device=null
    User.findOne({"cardid":req.query.cardid}, {'operations': false})
    .then((users) => {
        console.log(users)
        user=users
        if(users==null)
        {
            res.send("<PC>NOUSER<MESSAGE>"+device.deviceid+" "+device.site+"-KULLANICI YOK-DK UCRET:"+device.price+" TL</MESSAGE></PC>")
        }

        user=users
        Device.findOne({"deviceid":req.query.deviceid,"site":user.site}, {'operations': false})
        .then((devices) => {
            console.log(devices)
            device=devices

            User.findByIdAndUpdate(user.id,  {
                $push: {"operations": {
                    "operation":"charge",
                    "deviceid":device.deviceid,
                    "energy":Number(req.query.duration)*0.183,
                    "amount":Number(req.query.duration)*device.price,
                    "duration":Number(req.query.duration),
                    "date":new Date().toISOString()
                }
             }
            })
                .then((users) => {
                   
                })
                .catch((err) => {
                    res.json(err);
                });

            Device.findByIdAndUpdate(device.id,  {
                $push: {"operations": {
                    "operation":"charge",
                    "deviceid":device.deviceid,
                    "energy":Number(req.query.duration)*0.183,
                    "amount":Number(req.query.duration)*device.price,
                    "duration":Number(req.query.duration),
                    "date":new Date().toISOString()
                }
                }
            })
                .then((users) => {})
                .catch((err) => {
                    res.json(err);
                });
            User.findByIdAndUpdate(user.id, {"chargingdevice":"","balance":(user.balance-Number(req.query.duration)*device.price),"date":new Date().toISOString() })
                .then((users) => { })
                .catch((err) => {
                    res.json(err);
                });
            Device.findByIdAndUpdate(device.id, {"state":"0", "charginguser":"","mobilecharging":"","date":new Date().toISOString()})
                    .then((product) => { })
                    .catch((err) => { res.json(err);});

            res.send("<PC>STOPCHARGE<MESSAGE>"+device.deviceid+" STOP-"+user.cardid+" K:"+parseInt((user.balance-Number(req.query.duration)*device.price)) +"TL-DK UCRETI:"+device.price+" TL</MESSAGE></PC>")
        })
        .catch((err) => {
            //res.json(err);
        });

    })
    .catch((err) => { });
});

module.exports = router;