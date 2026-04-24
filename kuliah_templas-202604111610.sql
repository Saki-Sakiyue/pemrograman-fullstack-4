  -- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
  --
  -- Host: localhost    Database: kuliah_templas
  -- ------------------------------------------------------
  -- Server version	8.0.30

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
  -- Table structure for table `bookmarks`
  --

  DROP TABLE IF EXISTS `bookmarks`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `bookmarks` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `template_id` int NOT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_bookmark` (`user_id`,`template_id`),
    KEY `template_id` (`template_id`),
    CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `bookmarks`
  --

  LOCK TABLES `bookmarks` WRITE;
  /*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
  INSERT INTO `bookmarks` VALUES (1,3,1,'2026-04-11 08:48:01'),(2,2,2,'2026-04-11 08:48:01');
  /*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `categories`
  --

  DROP TABLE IF EXISTS `categories`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `categories` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `slug` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug` (`slug`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `categories`
  --

  LOCK TABLES `categories` WRITE;
  /*!40000 ALTER TABLE `categories` DISABLE KEYS */;
  INSERT INTO `categories` VALUES (1,'Admin Dashboard','admin-dashboard'),(2,'Landing Page','landing-page'),(3,'E-Commerce','e-commerce');
  /*!40000 ALTER TABLE `categories` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `reports`
  --

  DROP TABLE IF EXISTS `reports`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `reports` (
    `id` int NOT NULL AUTO_INCREMENT,
    `template_id` int NOT NULL,
    `user_id` int NOT NULL,
    `reason` text NOT NULL,
    `status` enum('pending','resolved','rejected') DEFAULT 'pending',
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `template_id` (`template_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
    CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `reports`
  --

  LOCK TABLES `reports` WRITE;
  /*!40000 ALTER TABLE `reports` DISABLE KEYS */;
  INSERT INTO `reports` VALUES (1,2,2,'Link demo-nya udah mati bro, tolong di-update.','pending','2026-04-11 08:48:05',NULL);
  /*!40000 ALTER TABLE `reports` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `stacks`
  --

  DROP TABLE IF EXISTS `stacks`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `stacks` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `icon_url` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `stacks`
  --

  LOCK TABLES `stacks` WRITE;
  /*!40000 ALTER TABLE `stacks` DISABLE KEYS */;
  INSERT INTO `stacks` VALUES (1,'React','icon-react.png'),(2,'Next.js','icon-nextjs.png'),(3,'Tailwind CSS','icon-tailwind.png'),(4,'Express.js','icon-express.png');
  /*!40000 ALTER TABLE `stacks` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `tags`
  --

  DROP TABLE IF EXISTS `tags`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `tags` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `slug` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug` (`slug`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `tags`
  --

  LOCK TABLES `tags` WRITE;
  /*!40000 ALTER TABLE `tags` DISABLE KEYS */;
  INSERT INTO `tags` VALUES (1,'Responsive','responsive'),(2,'Dark Mode','dark-mode'),(3,'Minimalist','minimalist');
  /*!40000 ALTER TABLE `tags` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `template_images`
  --

  DROP TABLE IF EXISTS `template_images`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `template_images` (
    `id` int NOT NULL AUTO_INCREMENT,
    `template_id` int NOT NULL,
    `image_url` varchar(255) NOT NULL,
    `is_primary` tinyint(1) DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `template_id` (`template_id`),
    CONSTRAINT `template_images_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `template_images`
  --

  LOCK TABLES `template_images` WRITE;
  /*!40000 ALTER TABLE `template_images` DISABLE KEYS */;
  INSERT INTO `template_images` VALUES (1,1,'uploads/images/sneat-1.jpg',1),(2,1,'uploads/images/sneat-2.jpg',0),(3,2,'uploads/images/saas-1.jpg',1);
  /*!40000 ALTER TABLE `template_images` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `template_stacks`
  --

  DROP TABLE IF EXISTS `template_stacks`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `template_stacks` (
    `id` int NOT NULL AUTO_INCREMENT,
    `template_id` int NOT NULL,
    `stack_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_template_stack` (`template_id`,`stack_id`),
    KEY `stack_id` (`stack_id`),
    CONSTRAINT `template_stacks_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
    CONSTRAINT `template_stacks_ibfk_2` FOREIGN KEY (`stack_id`) REFERENCES `stacks` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `template_stacks`
  --

  LOCK TABLES `template_stacks` WRITE;
  /*!40000 ALTER TABLE `template_stacks` DISABLE KEYS */;
  INSERT INTO `template_stacks` VALUES (1,1,1),(2,2,2),(3,2,3);
  /*!40000 ALTER TABLE `template_stacks` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `template_tags`
  --

  DROP TABLE IF EXISTS `template_tags`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `template_tags` (
    `id` int NOT NULL AUTO_INCREMENT,
    `template_id` int NOT NULL,
    `tag_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_template_tag` (`template_id`,`tag_id`),
    KEY `tag_id` (`tag_id`),
    CONSTRAINT `template_tags_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
    CONSTRAINT `template_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `template_tags`
  --

  LOCK TABLES `template_tags` WRITE;
  /*!40000 ALTER TABLE `template_tags` DISABLE KEYS */;
  INSERT INTO `template_tags` VALUES (1,1,1),(2,1,3),(3,2,1),(4,2,2);
  /*!40000 ALTER TABLE `template_tags` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `templates`
  --

  DROP TABLE IF EXISTS `templates`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `templates` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `category_id` int NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text,
    `upload_type` varchar(50) DEFAULT NULL,
    `source_url` varchar(255) DEFAULT NULL,
    `demo_url` varchar(255) DEFAULT NULL,
    `download_count` int DEFAULT '0',
    `popularity_score` int DEFAULT '0',
    `is_active` tinyint(1) DEFAULT '1',
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `idx_category` (`category_id`),
    CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `templates_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `templates`
  --

  LOCK TABLES `templates` WRITE;
  /*!40000 ALTER TABLE `templates` DISABLE KEYS */;
  INSERT INTO `templates` VALUES (1,2,1,'Sneat - Free Bootstrap Admin','Template admin dashboard clean dan modern dengan Bootstrap 5.','link','https://github.com/themeselection/sneat','https://demos.themeselection.com/sneat',150,450,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),(2,3,2,'Tailwind SaaS Landing','Landing page khusus untuk startup SaaS dengan dark mode bawaan.','zip','uploads/templates/tailwind-saas.zip','https://tailwind-saas-demo.com',85,200,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL);
  /*!40000 ALTER TABLE `templates` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `upvotes`
  --

  DROP TABLE IF EXISTS `upvotes`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `upvotes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `template_id` int NOT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_upvote` (`user_id`,`template_id`),
    KEY `template_id` (`template_id`),
    CONSTRAINT `upvotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `upvotes_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `upvotes`
  --

  LOCK TABLES `upvotes` WRITE;
  /*!40000 ALTER TABLE `upvotes` DISABLE KEYS */;
  INSERT INTO `upvotes` VALUES (1,2,1,'2026-04-11 08:48:04'),(2,3,1,'2026-04-11 08:48:04');
  /*!40000 ALTER TABLE `upvotes` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `users`
  --

  DROP TABLE IF EXISTS `users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password_hash` varchar(255) NOT NULL,
    `role` enum('admin','user') DEFAULT 'user',
    `avatar_url` varchar(255) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `users`
  --

  LOCK TABLES `users` WRITE;
  /*!40000 ALTER TABLE `users` DISABLE KEYS */;
  INSERT INTO `users` VALUES (1,'abdul_dev','abdul@templas.com','hashed_pw_123','admin','https://ui-avatars.com/api/?name=Abdul','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),(2,'raffi_coder','raffi@gmail.com','hashed_pw_456','user','https://ui-avatars.com/api/?name=Raffi','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),(3,'nathania_ui','nathania@gmail.com','hashed_pw_789','user','https://ui-avatars.com/api/?name=Nathania','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL);
  /*!40000 ALTER TABLE `users` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Dumping routines for database 'kuliah_templas'
  --
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

  -- Dump completed on 2026-04-11 16:10:37
