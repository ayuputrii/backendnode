const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

// Parse Application Json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

app.get("/", (request, response) => {
    response.send("Application ZWallet With Restfull Api");
});

// Get Routes
const profile = require('./src/Routes/Profile');
profile(app);

const topup = require('./src/Routes/Topup');
topup(app);

const transfer = require('./src/Routes/Transfer');
transfer(app);

// listen To Port
app.listen(process.env.PORT, () => {
    console.log(`Running Success to PORT ${process.env.PORT}`);
});