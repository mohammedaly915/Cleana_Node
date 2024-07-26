const express = require("express");
const cors=require("cors")
const app = express();
require("dotenv").config(); 
const mongoose = require("mongoose");
const authRouter=require("./routes/auth.router")
const userRouter=require("./routes/user.router")
const binRouter=require("./routes/bin.router")
const binUserRouter=require("./routes/binUser.router")
const status=require("./utiles/status")
const path=require('path')


const url=process.env.DB_URL
mongoose.connect(url).then(()=>{
    console.log("connecting to database");
})
.catch((err) => {
  console.error("Failed to connect to database", err);
});

app.use('/collecta/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors())
app.use(express.json());
;

app.use("/api/auth",authRouter)
app.use("/api/users", userRouter);
app.use("/api/bins", binRouter);
app.use("/api/:binId/:username", binUserRouter );

app.all("*", (req, res, next) => {
    return res
      .status(404)
      .json({
        status: status.FAIL,
        message: "this Router is not available",
      });
  }); 

app.use((error, req, res, next) => {
    return res
      .status(error.statusCode || 500)
      .json({
        status: error.statusText || status.ERROR,
        message: error.message,
      });
  });

 
app.listen(process.env.port||4200,"localhost",()=>{
    console.log("http://localhost:4200/api/auth");
    console.log("http://localhost:4200/api/users");
})