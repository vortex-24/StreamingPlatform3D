const request = require("request");
const express = require("express");
const Middleware = require("../Api/Middleware");

const router = express.Router();

const { authenticationToken } = require("../Api/AgoraServer");

router.post("/api/authentication/token", authenticationToken);



module.exports = router;