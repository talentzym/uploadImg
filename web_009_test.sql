/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100413
 Source Host           : localhost:3306
 Source Schema         : web_009_test

 Target Server Type    : MySQL
 Target Server Version : 100413
 File Encoding         : 65001

 Date: 27/07/2020 15:08:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for photos
-- ----------------------------
DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `imagePath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imageName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uploadTime` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of photos
-- ----------------------------
INSERT INTO `photos` VALUES (16, 1, '/upload/1595829993158_3.png', '3.png', '2020-07-27');
INSERT INTO `photos` VALUES (17, 1, '/upload/1595829993185_cat.jpeg', 'cat.jpeg', '2020-07-27');
INSERT INTO `photos` VALUES (18, 1, '/upload/1595829993211_dog.jpg', 'dog.jpg', '2020-07-27');
INSERT INTO `photos` VALUES (19, 2, '/upload/1595830021128__1.jpg', '_1.jpg', '2020-07-27');
INSERT INTO `photos` VALUES (20, 2, '/upload/1595830021154_1.jpg', '1.jpg', '2020-07-27');
INSERT INTO `photos` VALUES (21, 2, '/upload/1595830021170_2.jpg', '2.jpg', '2020-07-27');
INSERT INTO `photos` VALUES (22, 2, '/upload/1595830021186_test.png', 'test.png', '2020-07-27');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'xiaoming', '123456');
INSERT INTO `users` VALUES (2, 'lili', 'qwer1234');

SET FOREIGN_KEY_CHECKS = 1;
