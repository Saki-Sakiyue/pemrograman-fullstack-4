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
  INSERT INTO `bookmarks` VALUES
  (1,2,1,'2026-04-11 08:48:01'),
  (2,2,3,'2026-04-11 08:48:01'),
  (3,3,2,'2026-04-11 08:48:01'),
  (4,4,5,'2026-04-11 08:48:01'),
  (5,5,1,'2026-04-11 08:48:01');
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
  INSERT INTO `categories` VALUES
  (1,'Admin Dashboard','admin-dashboard'),
  (2,'Landing Page','landing-page'),
  (3,'E-Commerce','e-commerce'),
  (4,'Portfolio','portfolio'),
  (5,'UI Kit','ui-kit'),
  (6,'Blog Template','blog-template');
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
  INSERT INTO `reports` VALUES
  (1,2,2,'Demo link is no longer accessible.','pending','2026-04-11 08:48:05',NULL),
  (2,4,3,'ZIP template file corrupted after download.','resolved','2026-04-11 08:48:05',NULL),
  (3,6,5,'Preview images are broken.','pending','2026-04-11 08:48:05',NULL);
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
  INSERT INTO `stacks` VALUES
  (1,'React','https://cdn.simpleicons.org/react/61DAFB'),
  (2,'Next.js','https://cdn.simpleicons.org/nextdotjs/000000'),
  (3,'Tailwind CSS','https://cdn.simpleicons.org/tailwindcss/06B6D4'),
  (4,'Express.js','https://cdn.simpleicons.org/express/000000'),
  (5,'Figma','https://cdn.simpleicons.org/figma/F24E1E'),
  (6,'Vue.js','https://cdn.simpleicons.org/vue.js/4FC08D'),
  (7,'Laravel','https://cdn.simpleicons.org/laravel/FF2D20'),
  (8,'Bootstrap','https://cdn.simpleicons.org/bootstrap/7952B3');
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
  INSERT INTO `tags` VALUES
  (1,'Responsive','responsive'),
  (2,'Dark Mode','dark-mode'),
  (3,'Minimalist','minimalist'),
  (4,'Modern','modern'),
  (5,'Clean UI','clean-ui'),
  (6,'Mobile First','mobile-first'),
  (7,'SEO Friendly','seo-friendly'),
  (8,'Animated','animated');
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
  INSERT INTO `template_images` VALUES
  (1,1,'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000',1),
  (2,1,'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',0),

  (3,2,'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000',1),
  (4,2,'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000',0),

  (5,3,'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000',1),
  (6,3,'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000',0),

  (7,4,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',1),
  (8,4,'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000',0),

  (9,5,'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1000',1),
  (10,5,'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000',0),

  (11,6,'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000',1),
  (12,6,'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000',0);
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
  INSERT INTO `template_stacks` VALUES
  (1,1,8),
  (2,2,2),
  (3,2,3),
  (4,3,1),
  (5,3,3),
  (6,4,6),
  (7,4,3),
  (8,5,5),
  (9,6,2),
  (10,6,3);
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
  INSERT INTO `template_tags` VALUES
  (1,1,1),
  (2,1,4),
  (3,1,5),

  (4,2,1),
  (5,2,2),
  (6,2,8),

  (7,3,3),
  (8,3,4),

  (9,4,1),
  (10,4,6),

  (11,5,4),
  (12,5,5),

  (13,6,3),
  (14,6,7);
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
  INSERT INTO `templates` VALUES
  (1,2,1,'Sneat Admin Dashboard','Modern admin dashboard template built with Bootstrap 5.','link','https://github.com/themeselection/sneat-bootstrap-html-admin-template-free','https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/',150,450,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),

  (2,3,2,'Tailwind SaaS Landing','Landing page template for SaaS startup with dark mode support.','zip','uploads/templates/tailwind-saas.zip','https://tailwindui.com/',85,200,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),

  (3,4,4,'Developer Portfolio','Clean developer portfolio template using React and Tailwind CSS.','link','https://github.com/cruip/open-react-template','https://open.cruip.com/',120,300,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),

  (4,5,3,'Modern E-Commerce UI','Responsive e-commerce frontend UI kit with modern design.','zip','uploads/templates/ecommerce-ui.zip','https://commercejs.com/demo/',95,260,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),

  (5,3,5,'Figma Mobile UI Kit','Professional mobile app UI kit for Figma.','link','https://www.figma.com/community','https://www.figma.com/community',210,520,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL),

  (6,2,6,'Minimal Blog Template','Minimalist blog template optimized for SEO and readability.','link','https://github.com/tailwindtoolbox/Minimal-Blog','https://tailwindtoolbox.github.io/Minimal-Blog/',70,140,1,'2026-04-11 08:47:50','2026-04-11 08:47:50',NULL);
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
  INSERT INTO `upvotes` VALUES
  (1,2,1,'2026-04-11 08:48:04'),
  (2,3,1,'2026-04-11 08:48:04'),
  (3,4,2,'2026-04-11 08:48:04'),
  (4,5,5,'2026-04-11 08:48:04'),
  (5,2,3,'2026-04-11 08:48:04'),
  (6,3,4,'2026-04-11 08:48:04');
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
  INSERT INTO `users` VALUES
  (1,'abdul_dev','abdul@templas.com','$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G','admin','https://api.dicebear.com/9.x/notionists/svg?seed=Abdul','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),
  (2,'raffi_coder','raffi@gmail.com','$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G','user','https://api.dicebear.com/9.x/notionists/svg?seed=Raffi','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),
  (3,'nathania_ui','nathania@gmail.com','$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G','user','https://api.dicebear.com/9.x/notionists/svg?seed=Nathania','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),
  (4,'bani_frontend','bani@gmail.com','$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G','user','https://api.dicebear.com/9.x/notionists/svg?seed=Bani','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL),
  (5,'saki_design','saki@gmail.com','$2a$12$j29oD5PkJZVfw0MKHNs/UuOCOCYnQyz3aiXj/fpijz9hjcjw8rU8G','user','https://api.dicebear.com/9.x/notionists/svg?seed=Saki','2026-04-11 08:47:35','2026-04-11 08:47:35',NULL);
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
