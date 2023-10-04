const parceDate = (date) => {
  const newDate = new Date(date);
  return format(newDate, "dd/MM/yyyy");
};

exports.toPdf = (socio, res) => {
  const header = "./static/media/encabezado.jpg";
  const footer = "./static/media/footer.jpg";
  let filename = "test";
  res.setHeader(
    "Content-disposition",
    'attachment; filename="' + filename + '"'
  );
  res.setHeader("Content-type", "application/pdf");

  const doc = new PDFDocument({ bufferPage: true });

  //Padron - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("Socio N°:", 25, 120, {
      continued: true,
      align: "left",
    })
    .text(`   ${socio.prov_asoc}`, {
      underline: false,
    });

  doc.moveDown(3);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("DATOS PERSONALES DEL CHOFER", 70, 150, {
      width: 450,
      align: "center",
      underline: true,
    });

  doc.moveDown(3);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Apellido y Nombre:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer}`);
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Tipo y N° de Documento:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_dni}`, {
      underline: false,
    });
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Lic. de Conducir:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_dni}`, {
      underline: false,
    });

  doc.image(footer, 0, 750, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica-Bold").fontSize(15).text("DATOS DEL VEHICULO", {
    width: 450,
    align: "center",
    underline: true,
  });
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Titular Vehiculo:", 40, 450, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.prov_titularVehiculo}`, {
      underline: false,
    });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Vehiculo:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_vehiculo}`, {
      underline: false,
      continued: true,
    })
    .text(`Patente:`, 225, 485, {
      underline: false,
      continued: true,
    })
    .text(`   ${socio.chofer_patente}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Cia. de Seguro:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_seguro}`, {
      underline: false,
    });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Poliza N°:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_nPoliza}`, {
      underline: false,
    })
    .text(`Vto.:`, 350, 555, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoPoliza)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Habilitacion Municipal:", 40, 590, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_habilitacion}`, {
      underline: false,
    })
    .text(`Vto.:`, 350, 590, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoHab)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Certificado Técnico:", 40, 625, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_nVtv}`, { underline: false })
    .text(`Vto.:`, 350, 625, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoVtv)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Capacidad:", 40, 660, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_vehiculoCapacidad}`, { underline: false });

  //Padron - fin
  doc.end();
  doc.pipe(res);
};
