-- -------------------------------------------------------------
-- TablePlus 5.9.6(546)
--
-- https://tableplus.com/
--
-- Database: capstone_node_41
-- Generation Time: 2024-05-27 18:10:58.0090
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `name_album` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`user_id`,`image_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `album_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(70) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `following` (
  `user_id` int NOT NULL,
  `following_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`following_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `following_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `following_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `thumbnail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images_category` (
  `image_id` int NOT NULL,
  `cate_id` int NOT NULL,
  PRIMARY KEY (`image_id`,`cate_id`),
  KEY `cate_id` (`cate_id`),
  CONSTRAINT `images_category_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`),
  CONSTRAINT `images_category_ibfk_2` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images_like` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `images_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `images_like_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images_save` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `images_save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `images_save_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `refresh_token` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Anime', NULL),
(2, 'Cartoon', NULL),
(3, 'Fantasy', NULL),
(4, 'Animal', NULL),
(5, 'Sci-fi', NULL);

INSERT INTO `comment` (`id`, `user_id`, `image_id`, `content`, `createdAt`) VALUES
(3, 11, 23, 'hohohoh', '2024-05-25 20:49:33'),
(4, 11, 23, 'dummy lorem', '2024-05-25 21:16:45'),
(5, 11, 23, 'hello world', '2024-05-25 21:16:45'),
(6, 11, 23, 'comment render when scroll to bottom', '2024-05-25 21:16:45'),
(7, 11, 23, 'test comment', '2024-05-26 09:51:21'),
(8, 11, 23, 'this is comment of image have name \"wallpaper snoppy 4k\"', '2024-05-26 10:01:40'),
(9, 11, 23, 'test n timessss', '2024-05-26 10:02:06'),
(10, 11, 23, 'new comment herer', '2024-05-26 15:57:38'),
(11, 11, 23, 'new comment', '2024-05-26 15:59:35'),
(12, 11, 25, 'what the duck ?', '2024-05-26 18:42:45'),
(13, 11, 23, 'test comment', '2024-05-27 10:34:38');

INSERT INTO `following` (`user_id`, `following_id`, `createdAt`) VALUES
(11, 13, '2024-05-25 15:24:22'),
(13, 11, '2024-05-25 15:30:33'),
(14, 11, '2024-05-26 19:29:11'),
(14, 13, '2024-05-26 18:05:45');

INSERT INTO `images` (`id`, `name`, `description`, `user_id`, `deleted`, `thumbnail_url`, `createdAt`, `url`, `width`, `height`) VALUES
(23, 'snoppy wallpaper phone 40k', 'background for pc', 11, 0, '/img/upload/thumbnail/1716365755837-Ksdu-thumbnail-8092984120e62cf6c74e0f6de5441e18.jpeg', '2024-05-22 08:15:56', '/img/upload/1716365755799-6pCH-8092984120e62cf6c74e0f6de5441e18.jpg', 474, 842),
(24, 'hello world', 'this is america', 11, 0, '/img/upload/thumbnail/1716482166177-vscm-thumbnail-maxresdefault.jpeg', '2024-05-23 16:36:06', '/img/upload/1716482166162-OjYm-maxresdefault.jpg', 1280, 720),
(25, 'duck', '', 13, 0, '/img/upload/thumbnail/1716546062403-XNQc-thumbnail-maxresdefault.jpeg', '2024-05-24 10:21:02', '/img/upload/1716546062372-2nyo-maxresdefault.jpg', 1280, 720),
(26, 'background anime 40k full HD', 'this is background anime', 13, 0, '/img/upload/thumbnail/1716639859136-PCOi-thumbnail-1322308.jpeg', '2024-05-25 12:24:19', '/img/upload/1716639859058-faEw-1322308.jpeg', 3840, 2160),
(27, 'quack quack ver 2.0', 'desdsadsadasdsad\nsadsadsadasd', 14, 1, '/img/upload/thumbnail/1716745914816-7rN8-thumbnail-maxresdefault.jpeg', '2024-05-26 17:51:55', '/img/upload/1716745914783-urjP-maxresdefault.jpg', 1280, 720),
(28, 'sky background full HD', 'this is description', 14, 1, '/img/upload/thumbnail/1716745980714-fJsR-thumbnail-1322308.jpeg', '2024-05-26 17:53:01', '/img/upload/1716745980624-9qTg-1322308.jpeg', 3840, 2160);

INSERT INTO `images_category` (`image_id`, `cate_id`) VALUES
(23, 2),
(23, 4),
(23, 5),
(24, 4),
(25, 4),
(26, 1),
(26, 5),
(28, 1);

INSERT INTO `images_like` (`user_id`, `image_id`, `createdAt`) VALUES
(11, 24, '2024-05-25 17:24:33'),
(11, 25, '2024-05-25 17:24:48'),
(13, 23, '2024-05-25 15:30:32'),
(13, 24, '2024-05-24 09:45:35'),
(13, 25, '2024-05-24 10:21:35'),
(14, 23, '2024-05-26 19:29:19'),
(14, 25, '2024-05-26 17:58:00'),
(14, 26, '2024-05-26 18:18:55');

INSERT INTO `images_save` (`user_id`, `image_id`, `createdAt`) VALUES
(11, 23, '2024-05-26 16:40:08'),
(11, 24, '2024-05-25 17:24:54'),
(11, 26, '2024-05-25 17:22:00'),
(13, 25, '2024-05-24 10:21:36'),
(13, 26, '2024-05-25 12:35:09'),
(14, 23, '2024-05-26 19:29:22'),
(14, 26, '2024-05-26 18:18:53');

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `avatar`, `age`, `deleted`, `refresh_token`) VALUES
(11, 'user@example.com', '$2b$10$Dz36cTjVq4.xX5nSZXbjzuX1ORfoMgmU5/ced8ms.Z58Fzat2dgsi', 'elizabeth de tam', '/img/upload/1716401380240-29Q6-1322308.jpeg', 20, 0, NULL),
(13, 'minhvu@gmail.com', '$2b$10$MgK.pOQk/sI4fAcgsl8PmOzIThO3NjvdqApryWKxPljThNuAbqkrK', 'This is a duck super', '/img/upload/1716544092308-wd1n-maxresdefault.jpg', 31, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibWluaHZ1QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiVGhpcyBpcyBhIGR1Y2sgc3VwZXIiLCJhdmF0YXIiOiIvaW1nL3VwbG9hZC8xNzE2NTQ0MDkyMzA4LXdkMW4tbWF4cmVzZGVmYXVsdC5qcGciLCJrZXlQYWlyIjoiVzVZIiwiaWF0IjoxNzE2NjU0MjA2LCJleHAiOjE3MTcyNTkwMDZ9.shLJ3iBY3QP0Y8KDBzoqNWIShXHt9J80-z3u3up2ZwY'),
(14, 'minhvu2@gmail.com', '$2b$10$WFJTuwrPnf.kHBWTXDv6hOEG7gkOvB5IkOF4aQRG.TJA5YqbvBupC', 'Doi ten lan thu 100', '/img/upload/1716744449294-d2BG-maxresdefault.jpg', 20, 0, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;