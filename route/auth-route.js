const express = require('express');
const router = express.Router();
const controller = require("../Controllers/auth-controllers")


router.route("/sign-up").post(controller.signUpUser)
router.route("/sign-in").post(controller.signInUser)
router.route("/sign-out").delete(controller.signOut)

module.exports = router