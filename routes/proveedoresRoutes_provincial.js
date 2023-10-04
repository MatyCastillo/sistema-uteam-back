const express = require("express");
const proveedoresController = require("../controllers/proveedoresController_provincial");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");
const upload = require("../libs/storage");
const router = express.Router();
// const sharp = require("sharp");
const fs = require("fs");
const uuid = require("uuid");
// const { fit } = require("sharp");

router.route("/checkHealth").get(proveedoresController.health);

router
  .route("/")
  .get(proveedoresController.getAllProvs)
  .post(proveedoresController.createNewProv)
  .delete(proveedoresController.deleteProv)
  .put(proveedoresController.markAsDeleted);

router.route("/deleted").get(proveedoresController.getDeleteProvs);

router
  .route("/image")
  // .post(upload.single("img"), proveedoresController.updateImg)
  // .put(upload.single("img"), proveedoresController.updateImgById);
  .post(
    upload.single("img"),
    // async function (req, res) {
    //   const processedImage = await sharp(req.file.buffer)
    //     .resize(200, 200, { fit: "contain" })
    //     .toFormat("jpeg")
    //     .toBuffer();

    //   // const resizedImage = processedImage.resize(800, 100, { fit: "contain" });

    //   //  const resizedImageBuffer = await processedImage.toBuffer();

    //   fs.writeFileSync(`images/${uuid.v4()}.jpeg`, processedImage);

    //   res.send("hola desde el post de imagen");
    // },
    proveedoresController.updateImg
  )
  .get(proveedoresController.getImageById);

router.route("/prov-:id").get(proveedoresController.getIdProv);

router.route("/:id").put(proveedoresController.updateProv);

router.route("/image/:prov_id").get(proveedoresController.getImageById);

router.route("/pdf/:user").get(proveedoresController.getPdf);

router.route("/years").get(proveedoresController.getYears);

router.route("/year-:year").get(proveedoresController.getByYear);

// router.route("/imageUps/:prov_id").get(proveedoresController.getImagesStatus);

module.exports = router;
