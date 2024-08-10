const express = require('express');
const router = express.Router();
const controller = require("../Controllers/user-controllers")
const verifyUser = require("../middleware/verifyUser")

router.route("/getUser/:userId").get(verifyUser,controller.getUserById)


module.exports = router;
