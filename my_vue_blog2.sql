/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : my_vue_blog

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2019-03-16 17:15:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '文章分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ----------------------------
-- Table structure for draft_post_redis
-- ----------------------------
DROP TABLE IF EXISTS `draft_post_redis`;
CREATE TABLE `draft_post_redis` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `redisKey` varchar(100) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `categoryId` int(11) DEFAULT NULL,
  `poster` varchar(200) DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for laboratory
-- ----------------------------
DROP TABLE IF EXISTS `laboratory`;
CREATE TABLE `laboratory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '项目名称',
  `description` varchar(1000) DEFAULT NULL COMMENT '项目说明',
  `link` varchar(500) DEFAULT NULL COMMENT '项目地址',
  `poster` varchar(500) DEFAULT NULL COMMENT '项目海报',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `github` varchar(500) DEFAULT NULL COMMENT '项目Github地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='实验室表，记录个人项目';

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL COMMENT '文章标题',
  `content` text COMMENT '文章内容',
  `categoryId` int(11) DEFAULT NULL COMMENT '文章分类表主键',
  `status` enum('DRAFT','PUBLISHED','OFFLINE') DEFAULT NULL COMMENT '文章状态(DRAFT: 草稿， PUBLISHED: 发布，OFFLINE: 下线)',
  `poster` varchar(200) DEFAULT NULL COMMENT '海报图片',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `viewTotal` int(11) DEFAULT NULL COMMENT '文章查看次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ----------------------------
-- Table structure for post_tag
-- ----------------------------
DROP TABLE IF EXISTS `post_tag`;
CREATE TABLE `post_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL COMMENT '文章表主键',
  `tagId` int(11) NOT NULL COMMENT '标签表主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8 COMMENT='文章-标签对应表';

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '标签名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COMMENT='标签表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL COMMENT '用户名',
  `hashedPassword` varchar(1024) DEFAULT NULL COMMENT '加密后的密码',
  `salt` varchar(128) DEFAULT NULL COMMENT '加密的盐',
  `avatar` varchar(500) DEFAULT NULL COMMENT '用户头像',
  `role` enum('ADMIN','GUEST') NOT NULL COMMENT '用户角色（ADMIN:管理员，GUEST:游客）',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COMMENT='用户表';
