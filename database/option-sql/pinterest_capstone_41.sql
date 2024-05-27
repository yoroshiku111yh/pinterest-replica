-- -------------------------------------------------------------
-- TablePlus 5.9.6(546)
--
-- https://tableplus.com/
--
-- Database: pinterest_capstone_41
-- Generation Time: 2024-05-28 01:49:06.4270
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(70) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Anime', NULL),
(2, 'Cartoon', NULL),
(3, 'Fantasy', NULL),
(4, 'Pets & Animal', NULL),
(5, 'Sci-fi', NULL),
(6, 'Natural', NULL),
(7, 'Movie', NULL),
(8, 'Landscape', NULL),
(9, 'Wallpaper', NULL),
(10, 'Mobile', NULL),
(11, 'Photography', NULL),
(12, 'Holidays', NULL),
(13, 'Technology', NULL),
(14, 'Sports', NULL),
(15, 'Outdoors', NULL),
(16, 'Gadgets', NULL),
(17, 'Events', NULL),
(18, 'Education', NULL),
(19, 'Career', NULL),
(20, 'Art', NULL),
(21, 'Decor', NULL),
(22, 'Design', NULL),
(23, 'Travel', NULL),
(24, 'Cooking', NULL),
(25, 'Manga', NULL),
(26, 'Comic', NULL);

INSERT INTO `comment` (`id`, `user_id`, `image_id`, `content`, `createdAt`) VALUES
(14, 15, 49, 'day la ai vay ? ', '2024-05-27 18:33:59'),
(15, 15, 49, 'day la 1 nhan vat trong jinjutsu no kaisen', '2024-05-27 18:35:07'),
(16, 15, 49, 'nhan vat ten la Satouru', '2024-05-27 18:35:39'),
(17, 15, 49, 'Rat la manh ', '2024-05-27 18:35:46'),
(18, 15, 49, 'this list comments to show \"you can scroll to load more comment\"', '2024-05-27 18:36:12'),
(19, 15, 49, 'isn\'t it cool ? ', '2024-05-27 18:36:29'),
(20, 15, 49, 'I try very hard for this ', '2024-05-27 18:36:36');

INSERT INTO `following` (`user_id`, `following_id`, `createdAt`) VALUES
(16, 15, '2024-05-27 15:10:49');

INSERT INTO `images` (`id`, `name`, `description`, `user_id`, `deleted`, `thumbnail_url`, `createdAt`, `url`, `width`, `height`) VALUES
(29, 'Cartoon wallpaper HD', '...', 15, 0, '/img/upload/thumbnail/1716821117127-JUvW-thumbnail-ca20642f81a8688d609f8247cfffa843.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117075-TYuK-ca20642f81a8688d609f8247cfffa843.jpg', 480, 800),
(30, 'adventure time banner', '...', 15, 0, '/img/upload/thumbnail/1716821117095-2xMf-thumbnail-994cd9ba994d16101668b567550c6abc.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117072-FIZt-994cd9ba994d16101668b567550c6abc.jpg', 563, 855),
(31, 'Simson family bart', '...', 15, 0, '/img/upload/thumbnail/1716821117112-TSow-thumbnail-21167985309ef9075d3226e44318aa1b.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117074-UP6j-21167985309ef9075d3226e44318aa1b.jpg', 736, 1098),
(32, 'Cat Art ', '...', 15, 0, '/img/upload/thumbnail/1716821117110-QpOq-thumbnail-182257bb5a5dfc4f6d56a58898a1328b.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117073-QUrz-182257bb5a5dfc4f6d56a58898a1328b.jpg', 736, 1313),
(33, 'Pink panther', '...', 15, 0, '/img/upload/thumbnail/1716821117099-1253-thumbnail-407679d20088c659aba7a760c69dd7c3.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117073-X4p7-407679d20088c659aba7a760c69dd7c3.jpg', 564, 564),
(34, 'Chibi character', '...', 15, 0, '/img/upload/thumbnail/1716821117087-747D-thumbnail-09a92c1cbe440f31d1818e4fe0bcf23a.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117067-9CI1-09a92c1cbe440f31d1818e4fe0bcf23a.jpg', 564, 564),
(35, '1716821117073-91rs-7966c2832ea9acbf5397352508ef9e9b', '...', 15, 0, '/img/upload/thumbnail/1716821117101-Xnrk-thumbnail-7966c2832ea9acbf5397352508ef9e9b.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117073-91rs-7966c2832ea9acbf5397352508ef9e9b.jpg', 735, 975),
(36, 'Snoopy HD', '...', 15, 0, '/img/upload/thumbnail/1716821117110-Jk9b-thumbnail-8092984120e62cf6c74e0f6de5441e18.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117074-p1H1-8092984120e62cf6c74e0f6de5441e18.jpg', 474, 842),
(37, 'Tiny bird', '...', 15, 0, '/img/upload/thumbnail/1716821117107-BUe8-thumbnail-647926a54c589fd3abb67b46344acc0a.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117074-8qUO-647926a54c589fd3abb67b46344acc0a.jpg', 556, 990),
(38, '1716821117073-MXia-16550e96af922aaff35fa6c7c1580e0f', '...', 15, 0, '/img/upload/thumbnail/1716821117089-U1s9-thumbnail-16550e96af922aaff35fa6c7c1580e0f.jpeg', '2024-05-27 14:45:17', '/img/upload/1716821117073-MXia-16550e96af922aaff35fa6c7c1580e0f.jpg', 564, 559),
(39, 'we bare bear image', '...', 15, 0, '/img/upload/thumbnail/1716821185054-ufpj-thumbnail-dfe661fa35eba7994f3ca2b47ec7f804.jpeg', '2024-05-27 14:46:25', '/img/upload/1716821185030-S0ut-dfe661fa35eba7994f3ca2b47ec7f804.jpg', 563, 751),
(40, 'I\'m fire', '...', 15, 0, '/img/upload/thumbnail/1716821185068-Di9C-thumbnail-f48719a46fa2a2b29a3b9eb306f43a32.jpeg', '2024-05-27 14:46:25', '/img/upload/1716821185030-SMEY-f48719a46fa2a2b29a3b9eb306f43a32.jpg', 563, 574),
(41, 'Bmo adventure time', '...', 15, 0, '/img/upload/thumbnail/1716821185053-RO2X-thumbnail-d8f81d80fe33e18a05f8cd055d95e0af.jpeg', '2024-05-27 14:46:25', '/img/upload/1716821185026-qYtM-d8f81d80fe33e18a05f8cd055d95e0af.jpg', 563, 855),
(42, 'powerbuff girls HD mobile wallpaper', '...', 15, 0, '/img/upload/thumbnail/1716821185063-DVBi-thumbnail-f6fd445ee55761040cebefc3eda6abd6.jpeg', '2024-05-27 14:46:25', '/img/upload/1716821185030-e75p-f6fd445ee55761040cebefc3eda6abd6.jpg', 564, 1222),
(43, 'bare bears cartoon', '...', 15, 0, '/img/upload/thumbnail/1716821185057-8M3H-thumbnail-da87ed1a4c5f8fa18eb6204abfe17999.jpeg', '2024-05-27 14:46:25', '/img/upload/1716821185027-P6o3-da87ed1a4c5f8fa18eb6204abfe17999.jpg', 564, 846),
(44, 'boy manga school', '...', 15, 0, '/img/upload/thumbnail/1716821990969-Tqaz-thumbnail-boymangaschool.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990948-cR4t-boymangaschool.jpg', 564, 564),
(45, 'Anya chibi smile', '...', 15, 0, '/img/upload/thumbnail/1716821990970-HD04-thumbnail-anyachibismile.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990945-6wMh-anyachibismile.jpg', 736, 736),
(46, 'Naruto HD', '...', 15, 0, '/img/upload/thumbnail/1716821990998-cEgv-thumbnail-narutohd.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990949-aKK1-narutohd.jpg', 564, 705),
(47, 'art naruto manga', '...', 15, 0, '/img/upload/thumbnail/1716821990970-ZRpW-thumbnail-artnarutomanga.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990947-iADp-artnarutomanga.jpg', 564, 705),
(48, 'Girl anime random', '...', 15, 0, '/img/upload/thumbnail/1716821990982-vMGY-thumbnail-charactergirlrandom.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990949-dbIv-charactergirlrandom.jpg', 564, 564),
(49, '1716821990949-wQ6R-kaisenteacher', '...', 15, 0, '/img/upload/thumbnail/1716821990994-yReg-thumbnail-kaisenteacher.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990949-wQ6R-kaisenteacher.jpg', 620, 1102),
(50, '1716821990947-RThY-anyawallpaper2', '...', 15, 0, '/img/upload/thumbnail/1716821990969-LoAg-thumbnail-anyawallpaper2.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990947-RThY-anyawallpaper2.jpg', 508, 903),
(51, '1716821990949-YwEC-drawcharactermanga', '...', 15, 0, '/img/upload/thumbnail/1716821990988-1TL4-thumbnail-drawcharactermanga.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990949-YwEC-drawcharactermanga.jpg', 564, 1006),
(52, '1716821990949-VdVy-coolboydonothing', '...', 15, 0, '/img/upload/thumbnail/1716821990980-fKn9-thumbnail-coolboydonothing.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990949-VdVy-coolboydonothing.jpg', 564, 564),
(53, 'chainsaw man girl dark', '...', 15, 0, '/img/upload/thumbnail/1716821990986-554v-thumbnail-chainsawmangirl.jpeg', '2024-05-27 14:59:51', '/img/upload/1716821990948-mdfe-chainsawmangirl.jpg', 735, 925),
(54, 'Solo leveling boss', '...', 15, 0, '/img/upload/thumbnail/1716822174799-euKp-thumbnail-sololevelingboss.jpeg', '2024-05-27 15:02:55', '/img/upload/1716822174772-DxKk-sololevelingboss.jpg', 563, 924),
(55, 'Ninja wallpaper', '...', 15, 0, '/img/upload/thumbnail/1716822174815-zmHr-thumbnail-ninjawallpaper.jpeg', '2024-05-27 15:02:55', '/img/upload/1716822174770-QKC7-ninjawallpaper.jpg', 564, 1002),
(56, 'Academy super hero', '...', 15, 0, '/img/upload/thumbnail/1716822174813-rNzv-thumbnail-superheromangacinyltextthnghim.jpeg', '2024-05-27 15:02:55', '/img/upload/1716822174772-iTtR-superheromangacinyltextthnghim.jpg', 630, 1280),
(57, 'Songoku Art', '...', 15, 0, '/img/upload/thumbnail/1716822174802-210X-thumbnail-songokuart.jpeg', '2024-05-27 15:02:55', '/img/upload/1716822174772-YgGM-songokuart.jpg', 564, 1005),
(58, '1716822779011-n7yp-commonroom', '...', 16, 0, '/img/upload/thumbnail/1716822779037-YV1u-thumbnail-commonroom.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779011-n7yp-commonroom.jpg', 551, 688),
(59, '1716822779012-oryc-decorconner', '...', 16, 0, '/img/upload/thumbnail/1716822779037-jlsG-thumbnail-decorconner.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779012-oryc-decorconner.jpg', 564, 1002),
(60, '1716822779012-OsDf-footcarpet', '...', 16, 0, '/img/upload/thumbnail/1716822779036-O0AY-thumbnail-footcarpet.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779012-OsDf-footcarpet.jpg', 564, 563),
(61, '1716822779013-8NXR-lampdecor2', '...', 16, 0, '/img/upload/thumbnail/1716822779051-V0H8-thumbnail-lampdecor2.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-8NXR-lampdecor2.jpg', 500, 500),
(62, '1716822779013-gMhZ-greenleafs', '...', 16, 0, '/img/upload/thumbnail/1716822779051-r5Qg-thumbnail-greenleafs.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-gMhZ-greenleafs.jpg', 564, 770),
(63, '1716822779013-9Nlv-picturewall', '...', 16, 0, '/img/upload/thumbnail/1716822779056-HIf2-thumbnail-picturewall.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-9Nlv-picturewall.jpg', 564, 752),
(64, '1716822779013-ytcq-lampdecor', '...', 16, 0, '/img/upload/thumbnail/1716822779047-sFhr-thumbnail-lampdecor.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-ytcq-lampdecor.jpg', 522, 522),
(65, '1716822779013-fsYt-lampchicken', '...', 16, 0, '/img/upload/thumbnail/1716822779047-UAGe-thumbnail-lampchicken.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-fsYt-lampchicken.jpg', 564, 564),
(66, '1716822779013-aplA-houseai', '...', 16, 0, '/img/upload/thumbnail/1716822779048-vlIT-thumbnail-houseai.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779013-aplA-houseai.jpg', 563, 739),
(67, '1716822779012-GOHL-decorwood', '...', 16, 0, '/img/upload/thumbnail/1716822779037-ylYJ-thumbnail-decorwood.jpeg', '2024-05-27 15:12:59', '/img/upload/1716822779012-GOHL-decorwood.jpg', 564, 705);

INSERT INTO `images_category` (`image_id`, `cate_id`) VALUES
(29, 2),
(29, 9),
(29, 10),
(30, 2),
(30, 9),
(30, 10),
(31, 2),
(32, 9),
(32, 10),
(32, 20),
(33, 2),
(34, 2),
(34, 20),
(35, 2),
(35, 9),
(35, 10),
(36, 2),
(36, 9),
(36, 10),
(37, 2),
(38, 2),
(38, 9),
(38, 10),
(39, 2),
(40, 2),
(40, 9),
(41, 2),
(41, 9),
(42, 2),
(42, 9),
(43, 2),
(43, 9),
(44, 1),
(44, 20),
(44, 25),
(45, 1),
(45, 20),
(45, 25),
(46, 1),
(46, 20),
(46, 25),
(47, 1),
(47, 20),
(47, 25),
(48, 1),
(48, 20),
(48, 25),
(49, 1),
(49, 20),
(49, 25),
(50, 1),
(50, 20),
(50, 25),
(51, 1),
(51, 20),
(51, 25),
(52, 1),
(52, 20),
(52, 25),
(53, 1),
(53, 20),
(53, 25),
(54, 1),
(54, 20),
(54, 25),
(55, 1),
(55, 20),
(55, 25),
(56, 1),
(56, 20),
(56, 25),
(57, 1),
(57, 20),
(57, 25),
(58, 16),
(58, 21),
(59, 16),
(59, 21),
(60, 16),
(60, 21),
(61, 16),
(61, 21),
(62, 16),
(62, 21),
(63, 16),
(63, 21),
(64, 16),
(64, 21),
(65, 16),
(65, 21),
(66, 16),
(66, 21),
(67, 16),
(67, 21);

INSERT INTO `images_like` (`user_id`, `image_id`, `createdAt`) VALUES
(15, 59, '2024-05-27 18:32:53'),
(15, 61, '2024-05-27 18:32:56');

INSERT INTO `images_save` (`user_id`, `image_id`, `createdAt`) VALUES
(15, 56, '2024-05-27 18:27:57'),
(15, 57, '2024-05-27 18:28:04'),
(15, 58, '2024-05-27 18:32:54'),
(15, 59, '2024-05-27 18:32:48'),
(15, 60, '2024-05-27 18:32:49'),
(15, 61, '2024-05-27 18:32:55'),
(15, 62, '2024-05-27 18:32:52'),
(15, 63, '2024-05-27 18:32:50'),
(15, 64, '2024-05-27 18:32:57'),
(15, 65, '2024-05-27 18:33:00'),
(15, 66, '2024-05-27 18:32:59'),
(15, 67, '2024-05-27 18:33:01');

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `avatar`, `age`, `deleted`, `refresh_token`) VALUES
(15, 'user-upload1@gmail.com', '$2b$10$Qx36PqddYxLNhV6NLLZVRecmsjfIZCKeejCzKPzCnn0UMJMNl8OTO', 'user upload 1', NULL, 20, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlci11cGxvYWQxQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoidXNlciB1cGxvYWQgMSIsImtleVBhaXIiOiJlbzgiLCJhdmF0YXIiOiIiLCJpYXQiOjE3MTY4MzM0MjYsImV4cCI6MTcxNzQzODIyNn0.QIXjmfp9PUf_s0w_2QO7gDc00NeNLhe9OtoyQLYoouA'),
(16, 'user-upload2@example.com', '$2b$10$BU0TcYxywq3woqwLyjQ54eVWS7jJXejzVXq4qIK0f1ibJaZC0YzHq', 'elizabeth kiki', NULL, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoidXNlci11cGxvYWQyQGV4YW1wbGUuY29tIiwiZnVsbG5hbWUiOiJlbGl6YWJldGgga2lraSIsImtleVBhaXIiOiJ0b00iLCJhdmF0YXIiOiIiLCJpYXQiOjE3MTY4MjI3NTYsImV4cCI6MTcxNzQyNzU1Nn0.Ray1LCZ4Res_8YLgrBVVw0gZpEEE7_13sSOy-kECSqo');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;