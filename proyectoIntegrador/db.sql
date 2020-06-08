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
  `title` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `movie_id` int NOT NULL,
  `rating` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`resena_id`),
  KEY `fk_uder` (`user_id`),
  CONSTRAINT `fk_uder` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (164,'Muy buena serie pero desp se hace aburrrida',43,'Es buena','2020-06-08 00:17:04',NULL,60735,8),(165,'La mejor serie lejos',43,'Me encanto!','2020-06-08 00:17:38',NULL,60625,10),(166,'Es buena pero desp me canse :(',43,'Es buena','2020-06-08 00:18:11',NULL,44217,6),(167,'Sino vieron Pokemon no tienen infancia jajaja',43,'Mi infancia','2020-06-08 00:18:43',NULL,60572,8),(168,'Me gusta mucho pero es una copia barata de Los Simpsons',43,'Es buena','2020-06-08 00:19:17',NULL,1433,7),(169,'Mirate esta serie y suicidate que es el camino mas corto',43,'En Cuarentena?','2020-06-08 00:20:18',NULL,66788,5),(170,'La mejor serie lejos, lastima que mi tia siempre me retaba cuando la veia',43,'Infancia!!!','2020-06-08 00:21:55',NULL,456,10),(171,'Zombies, zombies, zombies... Ahhh y tambien te pueden matar las personas',43,'Zombies','2020-06-08 00:22:41',NULL,1402,7),(172,'Me encanta esta serie',46,'Me fascinaaa','2020-06-08 00:23:55',NULL,1668,9),(173,'Mi serie preferidaaa',44,'Serion','2020-06-08 00:25:23',NULL,44217,8),(174,'Dicen que es buena pero hicieron un capitulo entero de una mosca y otro habando 100% mexicano...',44,'Eeeee','2020-06-08 00:26:10',NULL,1396,5),(175,'Impresionante la historia de Pablo Escobar, casi irreal!',44,'Mi patron','2020-06-08 00:26:56',NULL,63351,7),(176,'Estallas de la risa siempre jeje',45,'Serie preferida!','2020-06-08 00:28:21',NULL,1668,9),(177,'Me encantan los superheroes',45,'Es buena!','2020-06-08 00:29:33',NULL,60735,7),(178,'Mejor serie argentina lejos!',45,'Argentino 100%','2020-06-08 00:30:16',NULL,67166,8),(179,'Es vieja pero es muy buena',45,'Vieja no','2020-06-08 00:30:41',NULL,332,9),(180,'Casi me hago medica cuando la vi',48,'Serion!','2020-06-08 00:33:20',NULL,1416,10),(181,'Es media falsa pero me gusto',48,'Buenisima','2020-06-08 00:34:24',NULL,100757,7),(182,'Es cortita y es para pasar el tiempo',48,'Mata tiempo','2020-06-08 00:34:57',NULL,66788,7),(183,'Es una de las series que mas me gusta... obvio no supera a Grey\'s',48,'Me encanta','2020-06-08 00:35:48',NULL,1668,8),(184,'Me la vi entera en menos de una semana jajajja',47,'Muy buena!','2020-06-08 00:38:53',NULL,1668,9),(185,'Me gusto mucho, lastima que todavia no sale la segunda temporada',47,'Es buena','2020-06-08 00:39:40',NULL,100757,7),(186,'Obvio que es la copia barata de pasapalabras!',47,'Copion','2020-06-08 00:40:52',NULL,6629,8),(187,'Quien gana Iron Man o arrow?? Iron man gana, lastima que esta muerto',43,'Iron man gana','2020-06-08 00:42:52',NULL,1412,7),(188,'Muy buena serie, solo un dia duro jajaj',43,'un dia duro!','2020-06-08 00:44:17',NULL,100757,9),(189,'Era buena hasta que la serie perdio el foco',43,'Era buena','2020-06-08 00:44:50',NULL,48866,5),(190,'Dicen todos que es una muy buena serie, para mi se ven como capitulos sueltos no como una serie cronologica',43,'Mmmmm','2020-06-08 00:45:48',NULL,1668,5);
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
  `serie_favorita` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Error','No puedo eliminar','error@gmail.com','2000-05-22 00:00:00','hola',10765,'Friends'),(28,'administrador','$2a$10$NLpwhmRD7SIupMnfGgsbGuxRrwWSzpeHjPq7aTHdeHj1apcU4ISs6','admin@gmail.com','2000-05-22 00:00:00','Admin',10765,'Friends'),(43,'francisco.casas','$2a$10$r1YC3AeQk5nSYOo3XXAAsuEgglWiF8keZN1ND.LgIidZ4h9G8K1ua','ffranciscocasas@gmail.com','2001-05-09 00:00:00','Francisco Casas',10759,'Peaky Blinders'),(44,'nick','$2a$10$EeaZHkfjj/p8twaVPMPbYuV0p5WCVhyDfe/.fTkhv6v/ySzfS3uD.','nicolascappone@gmail.com','2000-05-22 00:00:00','Nicolas Cappone',80,'Vikings'),(45,'ari king','$2a$10$GEUrLxvjzfC1TuQZoi2n2OtLA.kQBKiMttvs0HHmhviUAWc8ARGXK','arielreyes@gmail.com','2000-05-27 00:00:00','Ariel Reyes',35,'Friends'),(46,'jus','$2a$10$92U1s26oLElwRsOcuEq4MutCAWeo3G7SGqQOqgIRxt2bK4JBmKaC6','jpadulla@gmail.com','2001-06-08 00:00:00','Justina Padulla',18,'Friends'),(47,'tomy','$2a$10$miCNXqbPkg6mnKqAWjf7z.y6IzjQN54pT5FBr2h4YgCBlAL.1L0/q','tgiampa@gmail.com','1998-08-11 00:00:00','Tomas Giampaoletti',9648,'Rick and Morty'),(48,'mou','$2a$10$goqllRjyHb9JiSxAwE0sp.hSY/2RgZDsGlDh/pp75bmhhkmejOOWi','mraimodi@gmail.com','2000-10-10 00:00:00','Mora Raimondi',18,'Grey\'s Anatomy');
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

-- Dump completed on 2020-06-07 23:08:57
