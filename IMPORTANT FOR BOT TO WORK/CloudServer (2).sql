-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 24, 2020 at 05:52 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HnRpdVVSDL`
--

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `level` int(11) NOT NULL,
  `ram_balance` int(11) NOT NULL,
  `disk_balance` int(11) NOT NULL,
  `servers_balance` int(11) NOT NULL,
  `plan` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`level`, `ram_balance`, `disk_balance`, `servers_balance`, `plan`) VALUES
(1, 3000, 5000, 3, 'Free');

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `id` int(11) NOT NULL,
  `discord_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pterodactyl_serverID` int(11) NOT NULL,
  `pterodactyl_userID` int(11) NOT NULL,
  `server_identifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `server_ram` int(11) NOT NULL,
  `server_disk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `servers`
--

INSERT INTO `servers` (`id`, `discord_id`, `pterodactyl_serverID`, `pterodactyl_userID`, `server_identifier`, `server_ram`, `server_disk`) VALUES
(5, '606532470086828045', 21, 8, 'da31176c', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `discord_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `pterodactyl_userID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pterodactyl_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pterodactyl_username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extra_disk` int(11) NOT NULL,
  `extra_ram` int(11) NOT NULL,
  `extra_servers` int(11) NOT NULL,
  `current_ram` int(11) NOT NULL,
  `current_disk` int(11) NOT NULL,
  `current_servers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`discord_id`, `email`, `level`, `pterodactyl_userID`, `pterodactyl_password`, `pterodactyl_username`, `extra_disk`, `extra_ram`, `extra_servers`, `current_ram`, `current_disk`, `current_servers`) VALUES
('606532470086828045', 'heavenpe07@gmail.com', 1, '8', 'kinghellohii', 'labortrap', 0, 0, 0, 2048, 2048, 2),
('616969909083177040', 'quiratd@gmail.com', 1, '21', 'famella21', 'striprhythm', 0, 0, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`level`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`discord_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
