-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2022 a las 23:12:32
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_interno`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(111) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `img_nombre` varchar(255) NOT NULL,
  `prov_id` int(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(111) NOT NULL,
  `prov_asoc` varchar(255) NOT NULL,
  `prov_dni` int(255) NOT NULL,
  `prov_nombre` varchar(255) NOT NULL,
  `prov_titularVehiculo` varchar(255) NOT NULL,
  `chofer` varchar(255) NOT NULL,
  `chofer_dni` varchar(255) NOT NULL,
  `chofer_patente` varchar(255) NOT NULL,
  `chofer_habilitacion` int(111) NOT NULL,
  `chofer_vtoHab` varchar(255) NOT NULL,
  `chofer_estadoHab` varchar(255) NOT NULL,
  `chofer_seguro` varchar(255) NOT NULL,
  `chofer_nPoliza` int(111) NOT NULL,
  `chofer_vtoPoliza` varchar(255) NOT NULL,
  `chofer_estPoliza` varchar(255) NOT NULL,
  `chofer_nVtv` int(111) NOT NULL,
  `chofer_vtoVtv` varchar(255) NOT NULL,
  `chofer_estVtv` varchar(255) NOT NULL,
  `chofer_vehiculo` varchar(255) NOT NULL,
  `chofer_vehiculoCapacidad` int(111) NOT NULL,
  `chofer_cupon` varchar(255) NOT NULL,
  `chofer_estCupon` varchar(255) NOT NULL,
  `chofer_registro` varchar(255) NOT NULL,
  `chofer_estRegistro` varchar(255) NOT NULL,
  `chofer_prorroga` varchar(255) NOT NULL,
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
  `socio_fotoExtra2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `prov_asoc`, `prov_dni`, `prov_nombre`, `prov_titularVehiculo`, `chofer`, `chofer_dni`, `chofer_patente`, `chofer_habilitacion`, `chofer_vtoHab`, `chofer_estadoHab`, `chofer_seguro`, `chofer_nPoliza`, `chofer_vtoPoliza`, `chofer_estPoliza`, `chofer_nVtv`, `chofer_vtoVtv`, `chofer_estVtv`, `chofer_vehiculo`, `chofer_vehiculoCapacidad`, `chofer_cupon`, `chofer_estCupon`, `chofer_registro`, `chofer_estRegistro`, `chofer_prorroga`, `chofer_cuitSocio`, `chofer_nombreTitular`, `chofer_cuitTitular`, `chofer_anioMod`, `socio_frenteDniImg`, `socio_dorsoDniImg`, `socio_seguroImg`, `socio_polizaImg`, `socio_comprobanteImg`, `socio_fotoExtra1`, `socio_fotoExtra2`) VALUES
(30, 'a32', 23124124, 'maats BIS', '3123', '', '0', '', 0, '', '', '', 0, '', '', 0, '', '', '', 12, '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`) VALUES
(1, 'administrador', 'admin@admin.com', '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79'),
(3, 'Matias Mercado', 'admin1@admin.com', '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prov_id` (`prov_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`prov_id`) REFERENCES `proveedores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
