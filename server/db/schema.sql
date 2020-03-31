
DROP DATABASE IF EXISTS Squawk;

CREATE DATABASE Squawk;

USE Squawk;


DROP TABLE IF EXISTS Restaurants;

CREATE TABLE `Restaurants` (
    `id` INTEGER AUTO_INCREMENT,
    `name` VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO Restaurants (name) VALUES ('test1');
INSERT INTO Restaurants (name) VALUES ('test2');

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
    `user_id` INTEGER AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `profile_pic` VARCHAR(300) DEFAULT NULL,
    `reviews` INTEGER DEFAULT 0,
    `friends` INT DEFAULT 0,
    `photos` INT DEFAULT 0,
    `location` VARCHAR(30),
    primary key(`user_id`)
);

INSERT INTO users (name) VALUES ('name1');
INSERT INTO users (name) VALUES ('name2');  

DROP TABLE IF EXISTS photos;

CREATE TABLE `photos` (
    `photo_id` INTEGER AUTO_INCREMENT,
    `id_review` INTEGER,
    `photo_url` VARCHAR(300),
    primary key (`photo_id`)
);

INSERT INTO photos (id_review, photo_url) VALUES (10, 'fsfsdfsfdssf');
INSERT INTO photos (id_review, photo_url) VALUES (1, 'f!!!!!!!!!!!sfdssf');


DROP TABLE IF EXISTS reviews;

CREATE TABLE `reviews` (
    `review_id` INTEGER AUTO_INCREMENT,
    `id_User` INTEGER NULL DEFAULT NULL,
    `id_Restaurants` INTEGER NULL DEFAULT NULL,
    `date` VARCHAR(20) DEFAULT NULL,
    `rating` INTEGER NOT NULL,
    `body` TEXT,
    `useful_count` INTEGER NULL DEFAULT 0,
    `cool_count` INTEGER NULL DEFAULT 0,
    `funny_count` INTEGER NULL DEFAULT 0,
    `check-ins` INTEGER NULL DEFAULT 0,
    PRIMARY KEY(`review_id`)
);

-- DROP TABLE IF EXISTS reviewPhotos;

-- CREATE TABLE `reviewPhotos`