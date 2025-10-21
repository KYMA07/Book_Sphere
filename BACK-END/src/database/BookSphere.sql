CREATE DATABASE  IF NOT EXISTS `book_sphere` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `book_sphere`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: book_sphere
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `book_id` int NOT NULL,
  `staff_id` int DEFAULT NULL,
  `type` enum('borrow','return') NOT NULL,
  `scheduled_date` datetime NOT NULL,
  `status` enum('pending','approved','denied','ready_for_pickup','picked_up','awaiting_return','approved_return','returned') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  KEY `student_id` (`student_id`),
  KEY `book_id` (`book_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (10,12,2,11,'borrow','2025-10-17 00:00:00','returned','2025-10-16 03:37:26'),(11,12,2,11,'borrow','2025-10-16 00:00:00','returned','2025-10-16 04:10:59'),(12,12,3,11,'borrow','2025-10-16 00:00:00','returned','2025-10-16 04:22:10'),(13,21,4,11,'borrow','2025-10-17 00:00:00','returned','2025-10-16 04:59:26'),(14,21,678,11,'borrow','2025-10-17 00:00:00','picked_up','2025-10-16 05:11:14'),(15,21,697,11,'borrow','2025-10-17 00:00:00','picked_up','2025-10-16 05:24:48'),(16,21,689,11,'borrow','2025-10-15 00:00:00','returned','2025-10-16 05:35:37'),(17,23,1,7,'borrow','2025-10-17 06:44:00','returned','2025-10-16 06:44:05'),(18,21,23,NULL,'borrow','2025-10-17 06:54:00','pending','2025-10-16 06:54:40');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `author` varchar(150) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `publication_year` year DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `status` enum('available','borrowed','lost','reserved','ready_for_pickup','awaiting_return') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Code Whisperer: Revised','Silberschatz','Computer Science',2019,'978-0132149181','available','2025-10-08 10:55:53'),(2,'Clean Code','Robert C. Martin','Programming',2008,'978-0132350884','available','2025-10-08 10:55:53'),(3,'Intro to Psychology','David Myers','Psychology',2020,'978-1319050627','available','2025-10-08 10:55:53'),(4,'Architectural Design','Francis D.K. Ching','Architecture',2015,'978-1118745083','available','2025-10-08 10:55:53'),(6,'Example','Example author','Computer Science',2023,'978-0132149183','available','2025-10-13 05:09:30'),(7,'Database Systems','Silberschatz','Computer Science',2019,'978-0132149181','available','2025-10-15 14:54:10'),(19,'Introduction to Algorithms','Thomas H. Cormen','Computer Science',2009,'978-0262033848','available','2025-10-15 16:42:07'),(20,'The Pragmatic Programmer','Andrew Hunt','Programming',1999,'978-0201616224','available','2025-10-15 16:42:07'),(21,'Design Patterns','Erich Gamma','Software Engineering',1994,'978-0201633610','borrowed','2025-10-15 16:42:07'),(22,'Thinking, Fast and Slow','Daniel Kahneman','Psychology',2011,'978-0374533557','available','2025-10-15 16:42:07'),(23,'The Architecture of Happiness','Alain de Botton','Architecture',2006,'978-0307276478','available','2025-10-15 16:42:07'),(24,'Modern Operating Systems','Andrew S. Tanenbaum','Computer Science',2014,'978-0133591620','available','2025-10-15 16:42:07'),(25,'To Kill a Mockingbird','Harper Lee','Literature',1960,'978-0061120084','available','2025-10-15 16:42:07'),(26,'1984','George Orwell','Literature',1949,'978-0451524935','available','2025-10-15 16:42:07'),(27,'The Art of Computer Programming','Donald Knuth','Computer Science',2011,'978-0321751041','available','2025-10-15 16:42:07'),(28,'The Elements of Style','William Strunk Jr.','Writing',2000,'978-0205309023','available','2025-10-15 16:42:07'),(29,'Deep Work','Cal Newport','Productivity',2016,'978-1455586691','available','2025-10-15 16:42:07'),(30,'The Design of Everyday Things','Don Norman','Design',2013,'978-0465050659','available','2025-10-15 16:42:07'),(31,'Cracking the Coding Interview','Gayle Laakmann McDowell','Programming',2015,'978-0984782857','available','2025-10-15 16:42:07'),(32,'The Psychology of Money','Morgan Housel','Finance',2020,'978-0857197689','available','2025-10-15 16:42:07'),(33,'The Mythical Man-Month','Frederick P. Brooks Jr.','Software Engineering',1995,'978-0201835953','available','2025-10-15 16:42:07'),(34,'Clean Architecture','Robert C. Martin','Programming',2017,'978-0134494166','available','2025-10-15 16:42:07'),(35,'The Power of Habit','Charles Duhigg','Psychology',2012,'978-0812981605','available','2025-10-15 16:42:07'),(36,'The Lean Startup','Eric Ries','Business',2011,'978-0307887894','available','2025-10-15 16:42:07'),(37,'Refactoring','Martin Fowler','Programming',2018,'978-0134757599','available','2025-10-15 16:42:07'),(38,'The Creative Act','Rick Rubin','Creativity',2023,'978-0593653425','available','2025-10-15 16:42:07'),(39,'Digital Fortress','Dan Brown','Thriller',1998,'978-0312944926','available','2025-10-15 16:42:07'),(40,'The Selfish Gene','Richard Dawkins','Biology',1976,'978-0199291151','available','2025-10-15 16:42:07'),(41,'Sapiens: A Brief History of Humankind','Yuval Noah Harari','History',2011,'978-0062316097','available','2025-10-15 16:42:07'),(42,'The Art Spirit','Robert Henri','Art',1923,'978-0465002634','available','2025-10-15 16:42:07'),(43,'Algorithms to Live By','Brian Christian','Computer Science',2016,'978-1627790369','available','2025-10-15 16:42:07'),(44,'The War of Art','Steven Pressfield','Creativity',2002,'978-1936891023','available','2025-10-15 16:42:07'),(45,'Hooked: How to Build Habit-Forming Products','Nir Eyal','Design',2014,'978-1591847786','available','2025-10-15 16:42:07'),(46,'The Man Who Mistook His Wife for a Hat','Oliver Sacks','Psychology',1985,'978-0684853949','available','2025-10-15 16:42:07'),(47,'The Visual Display of Quantitative Information','Edward Tufte','Design',1983,'978-0961392147','available','2025-10-15 16:42:07'),(48,'The Soul of a New Machine','Tracy Kidder','Technology',1981,'978-0316491977','available','2025-10-15 16:42:07'),(674,'The Innovator\'s Dilemma','Clayton Christensen','Business',1997,'978-0062060242','available','2025-10-15 16:50:27'),(675,'The Fountainhead','Ayn Rand','Literature',1943,'978-0452286757','available','2025-10-15 16:50:27'),(676,'The Hero with a Thousand Faces','Joseph Campbell','Mythology',1949,'978-1577315933','available','2025-10-15 16:50:27'),(677,'The Structure of Scientific Revolutions','Thomas Kuhn','Science',1962,'978-0226458120','available','2025-10-15 16:50:27'),(678,'The Tao of Physics','Fritjof Capra','Physics',1975,'978-1590308356','borrowed','2025-10-15 16:50:27'),(679,'Godel, Escher, Bach','Douglas Hofstadter','Mathematics',1979,'978-0465026562','available','2025-10-15 16:50:27'),(680,'The Road to Serfdom','F.A. Hayek','Economics',1944,'978-0226320557','available','2025-10-15 16:50:27'),(681,'Capital in the Twenty-First Century','Thomas Piketty','Economics',2013,'978-0674430006','available','2025-10-15 16:50:27'),(682,'The Art of Public Speaking','Dale Carnegie','Communication',1915,'978-1439189193','available','2025-10-15 16:50:27'),(683,'The Craft of Research','Wayne C. Booth','Writing',1995,'978-0226239739','available','2025-10-15 16:50:27'),(684,'Dekada \'70','Lualhati Bautista','Literature',1983,'978-9715423618','available','2025-10-15 16:50:27'),(685,'Bata, Bata... Pa\'no Ka Ginawa?','Lualhati Bautista','Literature',1988,'978-9715423619','available','2025-10-15 16:50:27'),(686,'The Elements of Statistical Learning','Trevor Hastie','Data Science',2009,'978-0387848570','available','2025-10-15 16:50:27'),(687,'Python Crash Course','Eric Matthes','Programming',2015,'978-1593276034','available','2025-10-15 16:50:27'),(688,'Fluent Python','Luciano Ramalho','Programming',2015,'978-1491946008','available','2025-10-15 16:50:27'),(689,'You Don’t Know JS','Kyle Simpson','Programming',2015,'978-1491904244','available','2025-10-15 16:50:27'),(690,'Eloquent JavaScript','Marijn Haverbeke','Programming',2018,'978-1593279509','available','2025-10-15 16:50:27'),(691,'JavaScript: The Good Parts','Douglas Crockford','Programming',2008,'978-0596517748','available','2025-10-15 16:50:27'),(692,'Effective Java','Joshua Bloch','Programming',2018,'978-0134685991','available','2025-10-15 16:50:27'),(693,'Java: The Complete Reference','Herbert Schildt','Programming',2018,'978-1260440232','available','2025-10-15 16:50:27'),(694,'Head First Design Patterns','Eric Freeman','Software Engineering',2004,'978-0596007126','available','2025-10-15 16:50:27'),(695,'Introduction to Machine Learning','Ethem Alpaydin','AI',2014,'978-0262028189','available','2025-10-15 16:50:27'),(696,'Artificial Intelligence: A Modern Approach','Stuart Russell','AI',2020,'978-0134610993','available','2025-10-15 16:50:27'),(697,'Deep Learning','Ian Goodfellow','AI',2016,'978-0262035613','borrowed','2025-10-15 16:50:27'),(698,'Pattern Recognition and Machine Learning','Christopher Bishop','AI',2006,'978-0387310732','available','2025-10-15 16:50:27'),(699,'Computer Networking: A Top-Down Approach','James Kurose','Networking',2017,'978-0133594140','available','2025-10-15 16:50:27'),(700,'Network Warrior','Gary A. Donahue','Networking',2011,'978-1449387860','available','2025-10-15 16:50:27'),(701,'Cisco CCNA Routing and Switching','Todd Lammle','Networking',2016,'978-1119288287','available','2025-10-15 16:50:27'),(702,'Linux Command Line and Shell Scripting','Richard Blum','Operating Systems',2021,'978-1119700925','available','2025-10-15 16:50:27'),(703,'CompTIA Security+ Guide','Mark Ciampa','Cybersecurity',2020,'978-0357118941','available','2025-10-15 16:50:27'),(704,'Cybersecurity and Cyberwar','P.W. Singer','Cybersecurity',2014,'978-0199918096','available','2025-10-15 16:50:27'),(705,'The C Programming Language','Brian W. Kernighan','Programming',1988,'978-0131103627','available','2025-10-15 16:50:27'),(706,'Learn C the Hard Way','Zed A. Shaw','Programming',2015,'978-0321884923','available','2025-10-15 16:50:27'),(707,'Introduction to the Theory of Computation','Michael Sipser','Computer Science',2012,'978-1133187790','available','2025-10-15 16:50:27'),(708,'Discrete Mathematics and Its Applications','Kenneth Rosen','Mathematics',2011,'978-0073383095','available','2025-10-15 16:50:27'),(709,'Linear Algebra Done Right','Sheldon Axler','Mathematics',2015,'978-3319110790','available','2025-10-15 16:50:27'),(710,'Calculus','James Stewart','Mathematics',2015,'978-1285740621','available','2025-10-15 16:50:27'),(711,'Physics for Scientists and Engineers','Raymond A. Serway','Physics',2013,'978-1133947271','available','2025-10-15 16:50:27'),(712,'Organic Chemistry','Paula Yurkanis Bruice','Chemistry',2016,'978-0134042282','available','2025-10-15 16:50:27'),(713,'Human Anatomy & Physiology','Elaine N. Marieb','Biology',2015,'978-0321927040','available','2025-10-15 16:50:27'),(714,'Microbiology','Gerard J. Tortora','Biology',2016,'978-0321929150','available','2025-10-15 16:50:27'),(715,'Essentials of Sociology','James M. Henslin','Sociology',2014,'978-0133826609','available','2025-10-15 16:50:27'),(716,'Introduction to Political Science','Robert J. Jackson','Political Science',2013,'978-0134403281','available','2025-10-15 16:50:27'),(717,'World History','William J. Duiker','History',2016,'978-1305583473','available','2025-10-15 16:50:27'),(718,'Introduction to Philosophy','John Perry','Philosophy',2015,'978-0190200237','available','2025-10-15 16:50:27'),(719,'Ethics: Theory and Contemporary Issues','Barbara MacKinnon','Philosophy',2014,'978-1285197241','available','2025-10-15 16:50:27'),(720,'Art History','Marilyn Stokstad','Art',2014,'978-0205873470','available','2025-10-15 16:50:27');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_records`
--

DROP TABLE IF EXISTS `borrow_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_records` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `book_id` int NOT NULL,
  `staff_id` int DEFAULT NULL,
  `borrow_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `due_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `status` enum('borrowed','returned','overdue','lost') DEFAULT 'borrowed',
  `source` enum('manual','appointment') DEFAULT 'manual',
  `confirmed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `penalty` decimal(10,2) DEFAULT '0.00',
  `appointment_id` int DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `student_id` (`student_id`),
  KEY `book_id` (`book_id`),
  KEY `staff_id` (`staff_id`),
  KEY `fk_borrow_appointment` (`appointment_id`),
  CONSTRAINT `borrow_records_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `borrow_records_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `borrow_records_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `borrow_records_ibfk_4` FOREIGN KEY (`staff_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_borrow_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_records`
--

LOCK TABLES `borrow_records` WRITE;
/*!40000 ALTER TABLE `borrow_records` DISABLE KEYS */;
INSERT INTO `borrow_records` VALUES (3,6,2,11,'2025-10-13 01:53:55','2025-10-20 01:53:55','2025-10-13 02:05:25','returned','manual','2025-10-13 16:29:20',0.00,NULL),(4,7,1,11,'2025-10-13 04:49:20','2025-10-20 04:49:20','2025-10-13 04:49:31','returned','manual','2025-10-13 16:29:20',0.00,NULL),(6,6,1,11,'2025-10-16 03:33:39','2025-10-23 03:33:39','2025-10-16 03:33:46','returned','manual','2025-10-16 03:33:39',0.00,NULL),(7,12,2,NULL,'2025-10-16 03:37:54','2025-10-23 03:37:54','2025-10-16 03:38:28','returned','appointment','2025-10-16 03:37:54',0.00,10),(8,12,2,NULL,'2025-10-16 04:18:55','2025-10-23 04:18:55','2025-10-16 04:59:50','returned','appointment','2025-10-16 04:18:55',0.00,11),(9,12,3,NULL,'2025-10-16 04:22:41','2025-10-23 04:22:41','2025-10-16 04:59:51','returned','appointment','2025-10-16 04:22:41',0.00,12),(10,21,4,NULL,'2025-10-16 05:03:26','2025-10-23 05:03:26','2025-10-16 05:03:58','returned','appointment','2025-10-16 05:03:26',0.00,13),(11,21,678,NULL,'2025-10-16 05:11:33','2025-10-23 05:11:33',NULL,'borrowed','appointment','2025-10-16 05:11:33',0.00,14),(12,9,21,7,'2025-10-16 06:45:17','2025-10-23 06:45:17',NULL,'borrowed','manual','2025-10-16 06:45:17',0.00,NULL);
/*!40000 ALTER TABLE `borrow_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_number` varchar(50) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `course` varchar(100) DEFAULT NULL,
  `year_level` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `student_number` (`student_number`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'2025-001','Aaron Dela Cruz','BSIT','11','aaron001@mail.com','2025-10-08 10:55:53',NULL),(2,'2025-002','Bea Santos','BSCS','11','bea002@mail.com','2025-10-08 10:55:53',NULL),(3,'2025-003','Carlo Ramirez','BSIT','11','carlo003@mail.com','2025-10-08 10:55:53',NULL),(4,'2025-004','Diana Lopez','BSIT','12','diana004@mail.com','2025-10-08 10:55:53',NULL),(5,'2025-005','Ethan Garcia','BSCS','11','ethan005@mail.com','2025-10-08 10:55:53',NULL),(6,'2025-006','Faith Mendoza','BSIT','12','faith006@mail.com','2025-10-08 10:55:53',NULL),(7,'2025-007','Gabriel Rivera','BSIT','11','gabriel007@mail.com','2025-10-08 10:55:53',NULL),(8,'2025-008','Hannah Castillo','BSCS','12','hannah008@mail.com','2025-10-08 10:55:53',NULL),(9,'2025-009','Ivan Reyes','BSIT','11','ivan009@mail.com','2025-10-08 10:55:53',NULL),(10,'2025-010','Jasmine Cruz','BSCS','11','jasmine010@mail.com','2025-10-08 10:55:53',NULL),(11,'2025-011','Kevin Flores','BSIT','11','kevin011@mail.com','2025-10-08 10:55:53',NULL),(12,'2025-012','Lara Gutierrez','BSIT','12','lara012@mail.com','2025-10-08 10:55:53',NULL),(13,'2025-013','Marco Herrera','BSCS','11','marco013@mail.com','2025-10-08 10:55:53',NULL),(14,'2025-014','Nina Alvarez','BSIT','12','nina014@mail.com','2025-10-08 10:55:53',NULL),(15,'2025-015','Oscar Villanueva','BSIT','11','oscar015@mail.com','2025-10-08 10:55:53',NULL),(16,'2025-016','Patricia Ramos','BSCS','11','patricia016@mail.com','2025-10-08 10:55:53',NULL),(17,'2025-017','Quinn Bautista','BSIT','12','quinn017@mail.com','2025-10-08 10:55:53',NULL),(18,'2025-018','Rafael Santos','BSIT','11','rafael018@mail.com','2025-10-08 10:55:53',NULL),(19,'2025-019','Sophia Jimenez','BSCS','12','sophia019@mail.com','2025-10-08 10:55:53',NULL),(20,'2025-020','Tyler Navarro','BSIT','11','tyler020@mail.com','2025-10-08 10:55:53',NULL),(21,'2025-021','Uma Villarin','BSIT','12','uma021@mail.com','2025-10-08 10:55:53',NULL),(22,'2025-022','Victor Lim','BSCS','11','victor022@mail.com','2025-10-08 10:55:53',NULL),(23,'2025-023','Wendy Perez','BSIT','12','wendy023@mail.com','2025-10-08 10:55:53',NULL),(24,'2025-024','Xander Ramos','BSIT','11','xander024@mail.com','2025-10-08 10:55:53',NULL),(25,'2025-025','Yara Cruz','BSCS','11','yara025@mail.com','2025-10-08 10:55:53',NULL),(26,'2025-026','Zachary Mendoza','BSIT','12','zach026@mail.com','2025-10-08 10:55:53',NULL),(27,'2025-027','Allan Castillo','BSIT','11','allan027@mail.com','2025-10-08 10:55:53',NULL),(28,'2025-028','Bella Santiago','BSCS','12','bella028@mail.com','2025-10-08 10:55:53',NULL),(29,'2025-029','Calvin Robles','BSIT','11','calvin029@mail.com','2025-10-08 10:55:53',NULL),(30,'2025-030','Denise Villanueva','BSIT','12','denise030@mail.com','2025-10-08 10:55:53',NULL),(31,'2025-031','Eli Cruz','BSCS','11','eli031@mail.com','2025-10-08 10:55:53',NULL),(32,'2025-032','Fiona Gonzales','BSIT','12','fiona032@mail.com','2025-10-08 10:55:53',NULL),(33,'2025-033','Gabe Santos','BSIT','11','gabe033@mail.com','2025-10-08 10:55:53',NULL),(34,'2025-034','Hazel Torres','BSCS','11','hazel034@mail.com','2025-10-08 10:55:53',NULL),(35,'2025-035','Ian Gutierrez','BSIT','12','ian035@mail.com','2025-10-08 10:55:53',NULL),(36,'2025-036','Jade Bautista','BSIT','11','jade036@mail.com','2025-10-08 10:55:53',NULL),(37,'2025-037','Kurt Navarro','BSCS','12','kurt037@mail.com','2025-10-08 10:55:53',NULL),(38,'2025-038','Lina Rivera','BSIT','11','lina038@mail.com','2025-10-08 10:55:53',NULL),(39,'2025-039','Miko Santos','BSIT','12','miko039@mail.com','2025-10-08 10:55:53',NULL),(40,'2025-040','Nora Jimenez','BSCS','11','nora040@mail.com','2025-10-08 10:55:53',NULL),(41,'2025-041','Owen Lopez','BSIT','11','owen041@mail.com','2025-10-08 10:55:53',NULL),(42,'2025-042','Pia Cruz','BSIT','12','pia042@mail.com','2025-10-08 10:55:53',NULL),(43,'2025-043','Rico Castillo','BSCS','11','rico043@mail.com','2025-10-08 10:55:53',NULL),(44,'2025-044','Sofia Mendoza','BSIT','12','sofia044@mail.com','2025-10-08 10:55:53',NULL),(45,'2025-045','Troy Villanueva','BSIT','11','troy045@mail.com','2025-10-08 10:55:53',NULL),(46,'2025-046','Una Perez','BSCS','12','una046@mail.com','2025-10-08 10:55:53',NULL),(47,'2025-047','Vince Ramos','BSIT','11','vince047@mail.com','2025-10-08 10:55:53',NULL),(48,'2025-048','Wena Cruz','BSIT','12','wena048@mail.com','2025-10-08 10:55:53',NULL),(49,'2025-049','Xena Garcia','BSCS','11','xena049@mail.com','2025-10-08 10:55:53',NULL),(50,'2025-050','Yves Lim','BSIT','12','yves050@mail.com','2025-10-08 10:55:53',NULL),(51,'2025-051','Zara Navarro','BSIT','11','zara051@mail.com','2025-10-08 10:55:53',NULL),(52,'2025-052','Alex Ramos','BSCS','12','alex052@mail.com','2025-10-08 10:55:53',NULL),(53,'2025-053','Brianna Santos','BSIT','11','brianna053@mail.com','2025-10-08 10:55:53',NULL),(54,'2025-054','Clyde Mendoza','BSIT','12','clyde054@mail.com','2025-10-08 10:55:53',NULL),(55,'2025-055','Daisy Villarin','BSCS','11','daisy055@mail.com','2025-10-08 10:55:53',NULL),(56,'2025-056','Edward Robles','BSIT','12','edward056@mail.com','2025-10-08 10:55:53',NULL),(57,'2025-057','Faith Lopez','BSIT','11','faith057@mail.com','2025-10-08 10:55:53',NULL),(58,'2025-058','Gino Cruz','BSCS','12','gino058@mail.com','2025-10-08 10:55:53',NULL),(59,'2025-059','Hera Bautista','BSIT','11','hera059@mail.com','2025-10-08 10:55:53',NULL),(60,'2025-060','Ivan Torres','BSIT','12','ivan060@mail.com','2025-10-08 10:55:53',NULL),(61,'2025-061','Jessa Mendoza','BSCS','11','jessa061@mail.com','2025-10-08 10:55:53',NULL),(62,'2025-062','Kyle Gutierrez','BSIT','11','kyle062@mail.com','2025-10-08 10:55:53',NULL),(63,'2025-063','Lara Villanueva','BSCS','12','lara063@mail.com','2025-10-08 10:55:53',NULL),(64,'2025-064','Mitch Santos','BSIT','11','mitch064@mail.com','2025-10-08 10:55:53',NULL),(65,'2025-065','Nate Lopez','BSIT','12','nate065@mail.com','2025-10-08 10:55:53',NULL),(66,'2025-066','Olive Perez','BSCS','11','olive066@mail.com','2025-10-08 10:55:53',NULL),(67,'2025-067','Paul Rivera','BSIT','12','paul067@mail.com','2025-10-08 10:55:53',NULL),(68,'2025-068','Queen Cruz','BSIT','11','queen068@mail.com','2025-10-08 10:55:53',NULL),(69,'2025-069','Ralph Castillo','BSCS','12','ralph069@mail.com','2025-10-08 10:55:53',NULL),(70,'2025-070','Sandy Villarin','BSIT','11','sandy070@mail.com','2025-10-08 10:55:53',NULL),(71,'2025-071','Tim Mendoza','BSIT','12','tim071@mail.com','2025-10-08 10:55:53',NULL),(72,'2025-072','Ulyssa Ramos','BSCS','11','ulyssa072@mail.com','2025-10-08 10:55:53',NULL),(73,'2025-073','Vince Navarro','BSIT','12','vince073@mail.com','2025-10-08 10:55:53',NULL),(74,'2025-074','Wendy Cruz','BSIT','11','wendy074@mail.com','2025-10-08 10:55:53',NULL),(75,'2025-075','Xyra Lopez','BSCS','12','xyra075@mail.com','2025-10-08 10:55:53',NULL),(76,'2025-076','Yohan Santos','BSIT','11','yohan076@mail.com','2025-10-08 10:55:53',NULL),(77,'2025-077','Zelda Rivera','BSIT','12','zelda077@mail.com','2025-10-08 10:55:53',NULL),(78,'2025-078','Alvin Cruz','BSCS','11','alvin078@mail.com','2025-10-08 10:55:53',NULL),(79,'2025-079','Bella Villanueva','BSIT','12','bella079@mail.com','2025-10-08 10:55:53',NULL),(80,'2025-080','Cyril Mendoza','BSIT','11','cyril080@mail.com','2025-10-08 10:55:53',NULL),(81,'2025-081','Diane Gutierrez','BSCS','12','diane081@mail.com','2025-10-08 10:55:53',NULL),(82,'2025-082','Earl Santos','BSIT','11','earl082@mail.com','2025-10-08 10:55:53',NULL),(83,'2025-083','Faye Lopez','BSIT','12','faye083@mail.com','2025-10-08 10:55:53',NULL),(84,'2025-084','Glen Ramos','BSCS','11','glen084@mail.com','2025-10-08 10:55:53',NULL),(85,'2025-085','Hana Cruz','BSIT','12','hana085@mail.com','2025-10-08 10:55:53',NULL),(86,'2025-086','Ira Castillo','BSIT','11','ira086@mail.com','2025-10-08 10:55:53',NULL),(87,'2025-087','Jake Villarin','BSCS','12','jake087@mail.com','2025-10-08 10:55:53',NULL),(88,'2025-088','Kyla Rivera','BSIT','11','kyla088@mail.com','2025-10-08 10:55:53',NULL),(89,'2025-089','Leo Jimenez','BSIT','12','leo089@mail.com','2025-10-08 10:55:53',NULL),(90,'2025-090','Mona Santos','BSCS','11','mona090@mail.com','2025-10-08 10:55:53',NULL),(91,'2025-091','Noah Cruz','BSIT','12','noah091@mail.com','2025-10-08 10:55:53',NULL),(92,'2025-092','Opal Villanueva','BSIT','11','opal092@mail.com','2025-10-08 10:55:53',NULL),(93,'2025-093','Pio Mendoza','BSCS','12','pio093@mail.com','2025-10-08 10:55:53',NULL),(94,'2025-094','Quincy Ramos','BSIT','11','quincy094@mail.com','2025-10-08 10:55:53',NULL),(95,'2025-095','Rina Lopez','BSIT','12','rina095@mail.com','2025-10-08 10:55:53',NULL),(96,'2025-096','Sean Gutierrez','BSCS','11','sean096@mail.com','2025-10-08 10:55:53',NULL),(97,'2025-097','Tina Cruz','BSIT','12','tina097@mail.com','2025-10-08 10:55:53',NULL),(98,'2025-098','Uriel Santos','BSIT','11','uriel098@mail.com','2025-10-08 10:55:53',NULL),(99,'2025-099','Vina Mendoza','BSCS','12','vina099@mail.com','2025-10-08 10:55:53',NULL),(100,'2025-100','Wade Jimenez','BSIT','11','wade100@mail.com','2025-10-08 10:55:53',NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `role` enum('Staff','Student') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'admin1','$2b$10$T8eQVc2BHTGfJlZIuKaEi.phe/.te7VXpQPYxH2VvYbIMEqa/DXQG','admin@example.com','Staff','2025-10-08 11:13:01'),(8,'lib2','$2b$10$0WGn2bgvcKj70/DS17S4KuQPUyw9NF0iQqm9ue4BxvJjcbWzmwe6m','lib2@example.com','Staff','2025-10-08 11:28:54'),(9,'student','$2b$10$PzMMaoX6YWUy9MmB.xJau.uicI0ZamMnMBNxaJ7FoUuDPcfabH4dW','student@example.com','Student','2025-10-08 11:30:51'),(11,'lib3','$2b$10$JJYzZ8dWOlIwCa8MF6cPOO9dmUiVu5xP7akmI7D62hKppf6ao/5J2','lib3@example.com','Staff','2025-10-12 00:15:56'),(12,'students','$2b$10$fa15eXF13B7grEgDHniL5OcHxifLHyjRdAFXW3/z536QPD0AsgQF.','students@example.com','Student','2025-10-12 00:18:13'),(21,'Ivan Reyes','$2b$10$htD.erXrjjmem1cGbmDDKeQ0funMDZeWtkx3gKbzIXRurAHhIBf2.','ivan009@mail.com','Student','2025-10-16 04:58:43'),(24,'Jasmine Cruz','$2b$10$Fyyg3c8yaR65nHi9YES3L.F2GPCH3/ZPRQBY.qbz6byG3YfXA/odm','jasmine010@mail.com','Student','2025-10-16 06:47:40'),(25,'Aaron Dela Cruz','$2b$10$0MYxXzJ8BKzXMqB0IoVffeBvOoQJJ3.GuP5cHU0tIiccw284U6Ohe','aaron001@mail.com','Student','2025-10-17 12:47:50');
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

-- Dump completed on 2025-10-21 22:07:03
