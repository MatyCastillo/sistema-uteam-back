-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla sistema_interno.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `img_path` varchar(255) NOT NULL,
  `img_nombre` varchar(255) NOT NULL,
  `prov_id` int(111) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla sistema_interno.images: ~0 rows (aproximadamente)

-- Volcando estructura para tabla sistema_interno.proveedores
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `prov_asoc` varchar(255) NOT NULL,
  `prov_dni` int(255) NOT NULL,
  `prov_nombre` varchar(255) NOT NULL,
  `prov_titularVehiculo` varchar(255) NOT NULL,
  `chofer` varchar(255) NOT NULL,
  `chofer_dni` varchar(255) NOT NULL,
  `chofer_patente` varchar(255) NOT NULL,
  `chofer_habilitacion` int(111) NOT NULL,
  `chofer_vtoHab` date NOT NULL,
  `chofer_seguro` varchar(255) NOT NULL,
  `chofer_nPoliza` int(111) NOT NULL,
  `chofer_vtoPoliza` date NOT NULL,
  `chofer_nVtv` int(111) NOT NULL,
  `chofer_vtoVtv` date NOT NULL,
  `chofer_vehiculo` varchar(255) NOT NULL,
  `chofer_vehiculoCapacidad` int(111) NOT NULL,
  `chofer_cupon` date NOT NULL,
  `chofer_registro` date NOT NULL,
  `chofer_prorroga` date NOT NULL,
  `chofer_cuitSocio` varchar(255) NOT NULL,
  `chofer_nombreTitular` varchar(255) NOT NULL,
  `chofer_cuitTitular` varchar(255) NOT NULL,
  `chofer_anioMod` int(11) NOT NULL,
  `socio_frenteDniImg` varchar(255) NOT NULL,
  `socio_dorsoDniImg` varchar(255) NOT NULL,
  `socio_seguroImg` varchar(255) NOT NULL,
  `socio_polizaImg` varchar(255) NOT NULL,
  `socio_comprobanteImg` varchar(255) NOT NULL,
  `socio_fotoExtra1` varchar(255) NOT NULL,
  `socio_fotoExtra2` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla sistema_interno.proveedores: ~1 rows (aproximadamente)
INSERT INTO `proveedores` (`id`, `prov_asoc`, `prov_dni`, `prov_nombre`, `prov_titularVehiculo`, `chofer`, `chofer_dni`, `chofer_patente`, `chofer_habilitacion`, `chofer_vtoHab`, `chofer_seguro`, `chofer_nPoliza`, `chofer_vtoPoliza`, `chofer_nVtv`, `chofer_vtoVtv`, `chofer_vehiculo`, `chofer_vehiculoCapacidad`, `chofer_cupon`, `chofer_registro`, `chofer_prorroga`, `chofer_cuitSocio`, `chofer_nombreTitular`, `chofer_cuitTitular`, `chofer_anioMod`, `socio_frenteDniImg`, `socio_dorsoDniImg`, `socio_seguroImg`, `socio_polizaImg`, `socio_comprobanteImg`, `socio_fotoExtra1`, `socio_fotoExtra2`) VALUES
	(31, '247b', 12108029, 'GROLO, Hugo Ignacio', 'GROLO, Hugo Ignacio', 'GROLO, Marcos Ariel', '36531848', 'GKA 955', 247, '2023-02-08', 'PROVIDENCIA', 952649, '2020-02-05', 221900274, '2022-08-02', 'M BENZ', 48, '2020-02-05', '2020-02-05', '2026-02-05', '20263458169', 'DURSO, Fernando J', '20263458169', 2006, '', '', '', '', '', '', '');

-- Volcando estructura para tabla sistema_interno.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla sistema_interno.usuarios: ~8 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `userType`) VALUES
	(5, 'Matias', 'matias@email.com', '1234', 'administrador'),
	(6, 'Gastón', 'matias@email.com', '1234', 'operador'),
	(7, 'admin', 'admin@email.com', 'TesetGps1234', 'administrador'),
	(8, 'asanchez', 'admin@email.com', 'alvaro1234', 'administrador'),
	(9, 'alicia', 'admin@email.com', 'alicia1234', 'operador'),
	(11, 'beti', 'admin@email.com', 'beti1234', 'operador'),
	(12, 'drusconi', 'admin@email.com', 'rusconi1234', 'operador'),
	(13, 'Obecci', 'admin@email.com', 'rusconi1234', 'operador');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
