-- Barber Shop Management System Database Schema
-- This is a sample database structure for the Barber Shop Management System
-- Replace all sample data with your own data before using in production

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `barber_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
    `id` int(11) NOT NULL,
    `description` text NOT NULL,
    `date` text NOT NULL,
    `staffid` text NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `activity_log`
--

INSERT INTO
    `activity_log` (
        `id`,
        `description`,
        `date`,
        `staffid`
    )
VALUES (
        1,
        'New Sales Booking Record Was Created By',
        '2024-01-01 at 09:00',
        'Admin User'
    ),
    (
        2,
        'New Customer Record Was Created By',
        '2024-01-01 at 09:15',
        'Admin User'
    ),
    (
        3,
        'New Service Record Was Created By',
        '2024-01-01 at 09:30',
        'Admin User'
    );

-- --------------------------------------------------------

--
-- Table structure for table `system_users`
--

CREATE TABLE `system_users` (
    `id` int(11) NOT NULL,
    `user_login` varchar(60) NOT NULL,
    `user_pass` varchar(255) NOT NULL,
    `user_nicename` varchar(50) DEFAULT NULL,
    `user_phone_number` varchar(20) DEFAULT NULL,
    `user_email` varchar(100) DEFAULT NULL,
    `user_url` varchar(100) DEFAULT NULL,
    `user_registered` datetime DEFAULT NULL,
    `user_activation_key` varchar(255) DEFAULT NULL,
    `user_status` int(11) DEFAULT NULL,
    `user_role` varchar(20) DEFAULT NULL,
    `display_name` varchar(250) DEFAULT NULL,
    `avatar` varchar(255) DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `user_section` int(11) DEFAULT NULL,
    `login` text DEFAULT NULL,
    `logout` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `system_users`
--

INSERT INTO
    `system_users` (
        `id`,
        `user_login`,
        `user_pass`,
        `user_nicename`,
        `user_phone_number`,
        `user_email`,
        `user_url`,
        `user_registered`,
        `user_activation_key`,
        `user_status`,
        `user_role`,
        `display_name`,
        `avatar`,
        `updated_at`,
        `user_section`,
        `login`,
        `logout`
    )
VALUES (
        1,
        'admin',
        '$2a$10$example.hash.for.admin.password',
        'admin',
        '1234567890',
        'admin@barbershop.com',
        '',
        '2024-01-01 00:00:00',
        '',
        0,
        'Admin',
        'System Administrator',
        'default-avatar.png',
        '2024-01-01 00:00:00',
        1,
        '2024-01-01 at 00:00',
        '2024-01-01 at 00:00'
    ),
    (
        2,
        'demo',
        '$2a$10$example.hash.for.demo.password',
        'demo',
        '0987654321',
        'demo@barbershop.com',
        '',
        '2024-01-01 00:00:00',
        '',
        0,
        'User',
        'Demo User',
        'default-avatar.png',
        '2024-01-01 00:00:00',
        1,
        '2024-01-01 at 00:00',
        '2024-01-01 at 00:00'
    );

-- --------------------------------------------------------

--
-- Table structure for table `customer_reg`
--

CREATE TABLE `customer_reg` (
    `id` int(11) NOT NULL,
    `customer_name` varchar(255) NOT NULL,
    `customer_phone` varchar(20) DEFAULT NULL,
    `customer_email` varchar(100) DEFAULT NULL,
    `customer_address` text DEFAULT NULL,
    `registration_date` datetime DEFAULT NULL,
    `status` varchar(20) DEFAULT 'active'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `customer_reg`
--

INSERT INTO
    `customer_reg` (
        `id`,
        `customer_name`,
        `customer_phone`,
        `customer_email`,
        `customer_address`,
        `registration_date`,
        `status`
    )
VALUES (
        1,
        'John Doe',
        '1234567890',
        'john@example.com',
        '123 Main St, City',
        '2024-01-01 10:00:00',
        'active'
    ),
    (
        2,
        'Jane Smith',
        '0987654321',
        'jane@example.com',
        '456 Oak Ave, City',
        '2024-01-01 11:00:00',
        'active'
    );

-- --------------------------------------------------------

--
-- Table structure for table `shop_services`
--

CREATE TABLE `shop_services` (
    `id` int(11) NOT NULL,
    `service_name` varchar(255) NOT NULL,
    `service_description` text DEFAULT NULL,
    `service_price` decimal(10, 2) NOT NULL,
    `service_duration` int(11) DEFAULT NULL,
    `status` varchar(20) DEFAULT 'active',
    `created_at` datetime DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `shop_services`
--

INSERT INTO
    `shop_services` (
        `id`,
        `service_name`,
        `service_description`,
        `service_price`,
        `service_duration`,
        `status`,
        `created_at`
    )
VALUES (
        1,
        'Haircut',
        'Basic haircut service',
        25.00,
        30,
        'active',
        '2024-01-01 00:00:00'
    ),
    (
        2,
        'Beard Trim',
        'Professional beard trimming',
        15.00,
        20,
        'active',
        '2024-01-01 00:00:00'
    ),
    (
        3,
        'Haircut + Beard',
        'Combined haircut and beard service',
        35.00,
        45,
        'active',
        '2024-01-01 00:00:00'
    );

-- --------------------------------------------------------

--
-- Table structure for table `sales_bookings`
--

CREATE TABLE `sales_bookings` (
    `id` int(11) NOT NULL,
    `customer_id` int(11) NOT NULL,
    `service_id` int(11) NOT NULL,
    `booking_date` datetime NOT NULL,
    `total_amount` decimal(10, 2) NOT NULL,
    `status` varchar(20) DEFAULT 'pending',
    `created_at` datetime DEFAULT NULL,
    `staff_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `sales_bookings`
--

INSERT INTO
    `sales_bookings` (
        `id`,
        `customer_id`,
        `service_id`,
        `booking_date`,
        `total_amount`,
        `status`,
        `created_at`,
        `staff_id`
    )
VALUES (
        1,
        1,
        1,
        '2024-01-01 14:00:00',
        25.00,
        'completed',
        '2024-01-01 13:00:00',
        1
    ),
    (
        2,
        2,
        2,
        '2024-01-01 15:00:00',
        15.00,
        'completed',
        '2024-01-01 14:00:00',
        1
    );

-- --------------------------------------------------------

--
-- Table structure for table `shop_expenses`
--

CREATE TABLE `shop_expenses` (
    `id` int(11) NOT NULL,
    `expense_name` varchar(255) NOT NULL,
    `expense_amount` decimal(10, 2) NOT NULL,
    `expense_category` varchar(100) DEFAULT NULL,
    `expense_date` date NOT NULL,
    `description` text DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `staff_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

--
-- Sample data for table `shop_expenses`
--

INSERT INTO
    `shop_expenses` (
        `id`,
        `expense_name`,
        `expense_amount`,
        `expense_category`,
        `expense_date`,
        `description`,
        `created_at`,
        `staff_id`
    )
VALUES (
        1,
        'Rent Payment',
        1200.00,
        'Rent',
        '2024-01-01',
        'Monthly rent payment',
        '2024-01-01 00:00:00',
        1
    ),
    (
        2,
        'Utilities',
        150.00,
        'Utilities',
        '2024-01-01',
        'Electricity and water bill',
        '2024-01-01 00:00:00',
        1
    );

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_users`
--
ALTER TABLE `system_users` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_reg`
--
ALTER TABLE `customer_reg` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_services`
--
ALTER TABLE `shop_services` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_bookings`
--
ALTER TABLE `sales_bookings` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_expenses`
--
ALTER TABLE `shop_expenses` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `system_users`
--
ALTER TABLE `system_users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT for table `customer_reg`
--
ALTER TABLE `customer_reg` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT for table `shop_services`
--
ALTER TABLE `shop_services` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `sales_bookings`
--
ALTER TABLE `sales_bookings` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT for table `shop_expenses`
--
ALTER TABLE `shop_expenses` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;