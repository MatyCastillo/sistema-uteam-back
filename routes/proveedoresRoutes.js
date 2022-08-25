const express = require("express");
const proveedoresController = require("../controllers/proveedoresController");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");
const upload = require("../libs/storage");
const router = express.Router();

router.route("/checkHealth").get(proveedoresController.health);

router
  .route("/")
  .get(proveedoresController.getAllProvs)
  .post(proveedoresController.createNewProv)
  .delete(proveedoresController.deleteProv);

router
  .route("/image")
  .post(upload.single("img"), proveedoresController.updateImg);
//.get(proveedoresController.getImageById);

router.route("/prov-:id").get(proveedoresController.getIdProv);

router.route("/:id").put(proveedoresController.updateProv);

router.route("/image/:prov_id").get(proveedoresController.getImageById);

module.exports = router;
