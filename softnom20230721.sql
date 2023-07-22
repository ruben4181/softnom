-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: softnom
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bonificacion_servicios`
--

DROP TABLE IF EXISTS `bonificacion_servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bonificacion_servicios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `dias` int DEFAULT NULL,
  `valor_total` int DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `activo` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `bonificacion_servicios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonificacion_servicios`
--

LOCK TABLES `bonificacion_servicios` WRITE;
/*!40000 ALTER TABLE `bonificacion_servicios` DISABLE KEYS */;
INSERT INTO `bonificacion_servicios` VALUES (1,'1061543081','2023-01-30',15,10000,3,0,'2023-06-20 01:10:40','2023-06-20 10:47:19'),(2,'1061543081','2023-06-20',3,1234,3,0,'2023-06-20 10:46:03','2023-07-18 23:46:43');
/*!40000 ALTER TABLE `bonificacion_servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deducciones`
--

DROP TABLE IF EXISTS `deducciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deducciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `valor_total` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `deducciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deducciones`
--

LOCK TABLES `deducciones` WRITE;
/*!40000 ALTER TABLE `deducciones` DISABLE KEYS */;
INSERT INTO `deducciones` VALUES (9,'N1','E.P.S','D1',120000,'2023-07-08','1061543081',3,'2023-07-09 02:49:11',NULL,0),(10,'D2','A.F.P','DE',121000,'2023-07-08','1061543081',3,'2023-07-09 02:49:35',NULL,0),(11,'DE','OTROS','DE',10000,'2023-07-08','1061543081',3,'2023-07-09 02:53:25',NULL,0),(12,'D3','OTROS','DAS',90000,'2023-07-08','1061543081',3,'2023-07-09 02:53:44',NULL,0);
/*!40000 ALTER TABLE `deducciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liquidaciones`
--

DROP TABLE IF EXISTS `liquidaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liquidaciones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dependencia` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `activo` int DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `valor` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liquidaciones`
--

LOCK TABLES `liquidaciones` WRITE;
/*!40000 ALTER TABLE `liquidaciones` DISABLE KEYS */;
INSERT INTO `liquidaciones` VALUES (1,'1061543081','JURIDICA',0,3,'2023-06-20 05:17:01','2023-07-18 23:47:06',30000),(2,'1061543081','OPERACIONES',0,3,'2023-06-20 21:05:48','2023-07-18 23:47:07',10000);
/*!40000 ALTER TABLE `liquidaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `novedades`
--

DROP TABLE IF EXISTS `novedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `novedades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `activo` int DEFAULT NULL,
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `dias` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `novedades_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `novedades`
--

LOCK TABLES `novedades` WRITE;
/*!40000 ALTER TABLE `novedades` DISABLE KEYS */;
INSERT INTO `novedades` VALUES (1,'Novedad prueba','INCAPACIDAD','Descripcion novedad','2021-01-01',3,0,'1061543081','2023-06-19 22:09:21','2023-07-09 02:12:20',15),(2,'Novedad prueba 2','ACTUALIZACION','Descripcion novedad 2','2021-01-01',3,0,'1061543081','2023-06-19 22:10:00','2023-06-20 08:49:51',1),(3,'Permiso doctor','VACACIONES','Ninguna descripcion','2023-06-20',3,0,'1061543081','2023-06-20 08:09:51','2023-06-20 08:49:57',1),(4,'AGAIN','VACACIONES','CIAO','2023-06-20',3,0,'1061543081','2023-06-20 08:24:57','2023-06-20 08:49:59',1);
/*!40000 ALTER TABLE `novedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `primas`
--

DROP TABLE IF EXISTS `primas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `primas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `valor_total` int DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `activo` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `primas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `primas`
--

LOCK TABLES `primas` WRITE;
/*!40000 ALTER TABLE `primas` DISABLE KEYS */;
INSERT INTO `primas` VALUES (4,'1061543081','VACACIONES','2023-01-01',350000,3,0,'2023-06-20 03:14:46','2023-06-20 03:31:24'),(5,'1061543081','NAVIDAD','2023-06-20',15000,3,0,'2023-06-20 19:32:13','2023-06-20 19:32:32');
/*!40000 ALTER TABLE `primas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recargos`
--

DROP TABLE IF EXISTS `recargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recargos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `horas` int NOT NULL,
  `valor_hora` int NOT NULL,
  `valor_total` int NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activo` int DEFAULT '1',
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recargos_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `recargos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recargos`
--

LOCK TABLES `recargos` WRITE;
/*!40000 ALTER TABLE `recargos` DISABLE KEYS */;
INSERT INTO `recargos` VALUES (1,10,100000,1000000,'Recargo prueba 1-updategui',3,'2023-06-16 21:01:46','2023-07-18 23:51:18',0,'1061543081','2023-01-15'),(2,2,12500,25000,'Recargo prueba 1',3,'2023-06-16 22:33:18','2023-06-20 07:19:41',0,'1061543081','2023-01-30'),(3,15,30000,450000,'2023-06-22',3,'2023-06-20 06:21:04',NULL,0,'1061543081','2023-06-20'),(4,15,30000,450000,'2023-06-22',3,'2023-06-20 06:21:48',NULL,0,'1061543081','2023-06-20'),(5,15,50000,750000,'2023-06-22',3,'2023-06-20 06:22:55','2023-06-20 07:20:11',0,'1061543081','2023-06-20'),(6,26,15000,390000,'Detalle recargo prueba 2',4,'2023-06-20 23:28:46','2023-06-20 23:29:07',0,'12345678','2023-06-20'),(7,10,5000,50000,'Descripcion',4,'2023-07-18 23:44:52','2023-07-18 23:46:30',0,'12345678','2023-07-18');
/*!40000 ALTER TABLE `recargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ADMIN','Administrador del Sistema','2023-06-14 04:01:39',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subsidios`
--

DROP TABLE IF EXISTS `subsidios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subsidios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `activo` int DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cedula` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `subsidios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subsidios`
--

LOCK TABLES `subsidios` WRITE;
/*!40000 ALTER TABLE `subsidios` DISABLE KEYS */;
INSERT INTO `subsidios` VALUES (3,'PRUEBA 1','SUB. TRANSPORTE',150000,0,3,'2023-07-09 02:38:32','2023-07-18 23:50:51','1061543081'),(4,'PRUEBA 1','AUX. ALIMENTACION',100000,0,3,'2023-07-09 02:39:02','2023-07-18 23:46:55','1061543081');
/*!40000 ALTER TABLE `subsidios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` int NOT NULL DEFAULT '1',
  `cedula` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sueldo_basico` int NOT NULL,
  `condicion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_unique` (`email`),
  UNIQUE KEY `usuarios_cedula_unique` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'Rubén Vargas Yandy','ruben4181@gmail.com','+573117348662','1234',1,'1061543081','JURIDICA','ABOGADO',2000000,'COND_EST','ACTIVO','2023-06-14 03:59:44',NULL),(4,'Don Carlos Robeiro','ducardo@gmail.com','3117348662','1234',1,'12345678','STAFF','VIGILANTE',2000000,'OPTIMA','INIGUALABLE','2023-06-15 01:18:42',NULL),(5,'Ducardo Robeiro Vargas','ducardo.2@gmail.com','3117348662','Bordeaux16.',1,'123456789','JURIDICA','Tester',2500000,'indigencia','deporable','2023-06-15 01:20:11',NULL),(6,'Gloria Trevi','gloria.trevi@gmail.com','3117348662','NOPASSWORD',1,'12345','JURIDICA','ABOGADA',2500000,'CANTANTE','MUERTA','2023-06-15 02:45:37',NULL),(7,'Bon Jovi','jon.bovi@gmail.com','123','NOPASSWORD',1,'123456','ENTRETENIMIENTO','CANTANTE',4000000,'EXCELENTE','ALENTADO','2023-06-15 02:50:19',NULL),(8,'Freddie Mercurt','freddy@gmail.com','123456X','NOPASSWORD',1,'9871239812','ENTRETENIMIENTO','CANTANTE',1000000,'OK','OK','2023-06-15 02:51:42',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_roles_usuario_id_role_id_unique` (`usuario_id`,`role_id`),
  KEY `usuarios_roles_role_id_foreign` (`role_id`),
  CONSTRAINT `usuarios_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `usuarios_roles_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */;
INSERT INTO `usuarios_roles` VALUES (4,3,2,'2023-06-14 04:01:56',NULL);
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-21 22:52:36
