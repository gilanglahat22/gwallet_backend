-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 28, 2020 at 10:22 PM
-- Server version: 8.0.22
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;

CREATE TABLE `wallets` (
  `user_id` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `income` int(11) NOT NULL DEFAULT 0,
  `expense` int(11) NOT NULL DEFAULT 0,
  `amount_topup` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `frk_user_id1` (`user_id`),
  CONSTRAINT `frk_user_id1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallets`
--

-- --------------------------------------------------------

--
-- Table structure for table `topups`
--

CREATE TABLE `topups` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `topup_method` varchar(100) NOT NULL,
  `amount_topup` int(11) NOT NULL DEFAULT 0,
  `status` enum('Pending','Success') NOT NULL DEFAULT 'Pending',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `frk_user_id2` (`user_id`),
  CONSTRAINT `frk_user_id2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topups`
--



-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `PIN` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--


CREATE TABLE `transactions` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `receiver_name` varchar(100) NOT NULL,
  `receiver_phone` varchar(100) NOT NULL,
  `receiver_picture` varchar(255) DEFAULT NULL,
  `amount_transfer` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL DEFAULT "Empty",
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Pending','Success') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  KEY `frk_user_id3` (`user_id`),
  CONSTRAINT `frk_user_id3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `topup`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;