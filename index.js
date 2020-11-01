const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/user");
const cors = require("cors");
const userCodes = require("./routers/usercode");
const path = require("path");
//const session = require("express-session");
//const mongostore = require("connect-mongo")(session);

require("./database/connection");

const app = express();

const port = process.env.PORT || 3001;
var urlencodedparser = bodyparser.urlencoded({ extended: true });
const publicDirectoryPath = path.join(__dirname);
console.log(publicDirectoryPath);
app.use("/", express.static(publicDirectoryPath));

app.use(urlencodedparser);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(adminRouter);
app.use(userRouter);
app.use(userCodes);

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

app.listen(port, () => {
    console.log("Server running on port" + port);
});
