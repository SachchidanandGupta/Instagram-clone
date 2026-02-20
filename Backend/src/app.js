const express = require("express");

const app = express();

app.use(express.json());   // this middleware can read the data of req.body only if it is in raw 

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const authRouter = require("./routes/auth.routes");

app.use("/api/auth",authRouter);

const postRouter = require("./routes/post.routes");

app.use("/api/posts",postRouter);

module.exports = app;

