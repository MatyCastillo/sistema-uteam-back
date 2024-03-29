const express = require("express");
const notificationsController = require("../controllers/notificationsController");
const router = express.Router();

router.route("/").get(notificationsController.getNotifications)

module.exports = router;