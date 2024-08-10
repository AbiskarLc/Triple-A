const express = require('express');
const router = express.Router();
const controller = require("../Controllers/donation-controllers")
const verifyUser = require("../middleware/verifyUser")


router.route("/create/:donorId").post(verifyUser,controller.createDonation);
router.route("/getAllDonations").get(verifyUser,controller.getAllDonations);
router.route("/getDonationById/:id").get(verifyUser,controller.getDonationById);
router.route("/updateDonation/:donationId").put(verifyUser,controller.updateDonationStatus);

module.exports = router