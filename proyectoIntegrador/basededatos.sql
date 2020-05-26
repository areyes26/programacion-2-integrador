-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: usuarios
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `resena_id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `user_id` int DEFAULT NULL,
  `title` varchar(16) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_id` int NOT NULL,
  `rating` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`resena_id`),
  KEY `fk_uder` (`user_id`),
  CONSTRAINT `fk_uder` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (69,'intento de crear',NULL,'Hola','2020-05-19 00:30:16','2020-05-19 00:30:16',83097,NULL),(70,'Edito 3',NULL,'Flash','2020-05-19 00:36:00','2020-05-19 00:36:00',60735,NULL),(73,'Flasheamela',NULL,'Flash','2020-05-19 00:57:29','2020-05-19 00:57:29',60735,NULL),(75,'CREANDO UNA RESENA',NULL,'Hola','2020-05-19 02:18:38','2020-05-19 02:18:38',2734,NULL),(78,'',NULL,'','2020-05-20 21:32:39','2020-05-20 21:32:39',2734,NULL),(80,'',NULL,'','2020-05-20 22:00:58','2020-05-20 22:00:58',66017,NULL),(81,'',NULL,'','2020-05-20 22:01:58','2020-05-20 22:01:58',66017,NULL),(82,'fasjdsiu',NULL,'afk','2020-05-21 00:46:03','2020-05-21 00:46:03',60735,NULL),(83,'sadm,fksadj',NULL,'fdsajdfs','2020-05-21 00:46:21','2020-05-21 00:46:21',60735,NULL),(84,'fdslkafsdkosd',NULL,'njsihfs','2020-05-21 00:46:33','2020-05-21 00:46:33',60735,NULL),(85,'Rating?',NULL,'Hola','2020-05-21 01:55:13','2020-05-21 01:55:13',46952,8),(86,'Rating?',NULL,'Hola','2020-05-21 01:55:33','2020-05-21 01:55:33',46952,7),(87,'Rating??',NULL,'Francisco Casas','2020-05-21 01:55:57','2020-05-21 01:55:57',46952,10);
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `birthday` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fullname` varchar(20) DEFAULT NULL,
  `genero_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ffranciscocasas','aFNMqFVRDJ4h9U3','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(2,'ffranciscocasas','$2a$10$eZgPqzhrN2VOZ6a8nfcQqeDqNEUijeJSurby2mabjLgb5qJLYcF4e','fcasas@udesa.edu.ar','0000-00-00 00:00:00','Francisco Casas',NULL),(3,'43465916','$2a$10$xQ7IM/rkkMVqk7JlMaa2UuefpNY63Wzp61SvU92DvRQNFloIwE.Z6','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(4,'43465916','$2a$10$4eNlKytXNWbt/33xVP/e1uQmAxJVxsXkF1pYg9Z94CIL5gF2d6f3y','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(5,'redirecciona?','$2b$10$2P0RMWOOyYbTwFRKU3V1FeR9MKwr5z2jqQT0pIZ5p4/U96aSq.4Va','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(6,'registro2?','$2b$10$fnwSXD5qhUCdkYaYNSFFbO76eKyhGigkVfXmhE9Mv7YjulElwnWTi','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(7,'43465916','$2b$10$O0aHQQVDr0F5fAwA293ozO7eZATmGXF4pNaQcGBQ1ihSsaY944Kh6','ffranciscocasas@gmail.com','0000-00-00 00:00:00','Francisco Casas',NULL),(8,'El','$2b$10$Z3JVXXxmW5sYDGCvr9z5/ejBs3.8D3v0ZCCoxilF4OF.AHsFATLUK','ffranciscocasas@gmail.com','2000-05-22 00:00:00','Funca',NULL),(9,'','$2b$10$v0jw0Ba0wMvWkZyieVefheDBM188iS44UgpgOCygymekm5YwH0fCm','','2000-05-22 00:00:00','',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-26 19:25:40
