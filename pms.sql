-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2024 at 08:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `acc_head`
--

CREATE TABLE `acc_head` (
  `id` varchar(512) DEFAULT NULL,
  `account_head` varchar(512) DEFAULT NULL,
  `account_type` varchar(512) DEFAULT NULL,
  `show_in_account_report` varchar(512) DEFAULT NULL,
  `show_in_account_statement` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `acc_head`
--

INSERT INTO `acc_head` (`id`, `account_head`, `account_type`, `show_in_account_report`, `show_in_account_statement`) VALUES
('1', 'down payment', 'batch account', 'TRUE', 'TRUE '),
('2', 'land cost installment 1', 'batch account', 'TRUE', 'TRUE '),
('3', 'land cost installment 2', 'batch account', 'TRUE', 'TRUE');

-- --------------------------------------------------------

--
-- Table structure for table `batch`
--

CREATE TABLE `batch` (
  `id` int(11) DEFAULT NULL,
  `batch_id` varchar(512) DEFAULT NULL,
  `account_head` varchar(512) DEFAULT NULL,
  `amount` varchar(512) DEFAULT NULL,
  `due_date` varchar(512) DEFAULT NULL,
  `surcharge` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `batch`
--

INSERT INTO `batch` (`id`, `batch_id`, `account_head`, `amount`, `due_date`, `surcharge`) VALUES
(1, '1', 'down payment', '500,000', 'null', 0),
(2, '1', 'land cost installment 1', '55,000', '1-15-2024', 0.05),
(3, '1', 'land cost installment 2', '55,000', '4-15-2024', 0.05),
(4, '1', 'land cost installment 3', '55,000', '7-15-2024', 0.05),
(5, '1', 'land cost installment 4', '55,000', '10-15-2024', 0.05);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) DEFAULT NULL,
  `reg_no` varchar(512) DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `contact` varchar(512) DEFAULT NULL,
  `allotted` varchar(512) DEFAULT NULL,
  `pref_size` varchar(512) DEFAULT NULL,
  `property_id` varchar(512) DEFAULT NULL,
  `batch_id` varchar(512) DEFAULT NULL,
  `member_reg_no` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`reg_no`, `name`, `address`, `contact`, `allotted`, `pref_size`, `property_id`, `batch_id`, `member_reg_no`) VALUES
('RV-001', 'Alex', 'XYZ Town', '03344132940', 'no', '3 Marla', 'null', '1 ', '- '),
('RV-002', 'Bob', 'ABC Town', '3344992999', 'yes', '5 Marla', '2', '2 ', 'RV-002 '),
('RV-003', 'Cris', 'Square 12', '3344132944', 'no', '7 Marla', 'null', '3', '-');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) DEFAULT NULL,
  `reg_no` varchar(512) DEFAULT NULL,
  `acc_head` varchar(512) DEFAULT NULL,
  `amount_due` varchar(512) DEFAULT NULL,
  `amount_paid` varchar(512) DEFAULT NULL,
  `date_due` varchar(512) DEFAULT NULL,
  `date_paid` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `reg_no`, `acc_head`, `amount_due`, `amount_paid`, `date_due`, `date_paid`) VALUES
(1, 'RV-002', 'down payment', '500,000', '500,000', 'null', 'null'),
(2, 'RV-002', 'land cost installment 1', '75,000', '75,000', '1-15-2024', '1-15-2024'),
(3, 'RV-002', 'land cost installment 2', '75,000', '75,000', '4-15-2024', '4-25-2024 '),
(4, 'RV-002', 'land cost installment 3', '75,000', '75,000', '7-15-2024', '8-15-2024'),
(5, 'RV-002', 'land cost installment 4', '75,000', '75,000', '10-15-2024', '8-15-2024'),
(6, 'RV-002', 'land cost installment 5', '75,000', '75,000', '1-15-2025', '2-15-2025');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` varchar(512) DEFAULT NULL,
  `plotno` varchar(512) DEFAULT NULL,
  `size` varchar(512) DEFAULT NULL,
  `category` varchar(512) DEFAULT NULL,
  `sector` varchar(512) DEFAULT NULL,
  `block` varchar(512) DEFAULT NULL,
  `street` varchar(512) DEFAULT NULL,
  `lane` varchar(512) DEFAULT NULL,
  `member_reg_no` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `plotno`, `size`, `category`, `sector`, `block`, `street`, `lane`, `member_reg_no`) VALUES
('1', '1', '3 Marla', 'General', 'Rose', 'A', '1', '1-a', '- '),
('2', '2', '5 Marla', 'Corner', 'Rose', 'B', '12', '3-a', 'RV-002 '),
('3', '3', '7 Marla', 'General', 'Rose', 'Z', '14', '5-b', '-');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

select * from member; --
select * from property;
select * from acc_head;
select * from batch;
select * from payment; 
-- //////////////////////////

select * from member as m, property as pr where m.property_id=pr.id;
SELECT * FROM member INNER JOIN property on member.property_id = property.id;
SELECT * FROM member INNER JOIN batch on member.property_id = batch.id;



select * from acc_head;
select * from batch;
select * from payment;

Here are the different types of the JOINs in SQL:

(INNER) JOIN: Returns records that have matching values in both tables
LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table
RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table
FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table