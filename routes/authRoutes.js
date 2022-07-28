const express = require('express');
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route('/login')
  .post(authController.login);

router
  .route('/signUp')
  .post(authController.signUp);

module.exports = router;
