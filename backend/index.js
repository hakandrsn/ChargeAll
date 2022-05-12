var express = require("express")
var app = express();
var mongoose = require("mongoose")
var cors = require("cors")

app.use(cors());
const basicAuth = require('express-basic-auth')
app.use(basicAuth({
    users: { 'M.a.r.s.i.s': 'P.o.w.e.r.s.a.r.j' }
}))
app.use(express.json());
mongoose.connect("mongodb+srv://receptanilcengiz:Rtc123456@cluster0.pxlal.mongodb.net/localapp?retryWrites=true&w=majority",(e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log("Connected Mongo")
    }
});


const isloggledin = true;
app.listen(process.env.PORT || 3000);

adminRouter=require("./Router/adminRouter.js");
userRouter=require("./Router/userRouter.js");
deviceRouter=require("./Router/deviceRouter.js");

app.use((req, res, next) => {
    if (!isloggledin) {
        res.send("Login First!")
        next();
    }
    else{next()}
});

app.use("/login",adminRouter);
app.use("/users",userRouter);
app.use("/devices",deviceRouter);

app.get("/", (req, res) => {
    res.send("Anasayfa")
})
