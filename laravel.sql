-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 18, 2024 at 09:22 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `agendas`
--

CREATE TABLE `agendas` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id_creator` int NOT NULL,
  `agenda_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `participants` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agendas`
--

INSERT INTO `agendas` (`id`, `user_id_creator`, `agenda_name`, `start_time`, `end_time`, `participants`, `created_at`, `updated_at`) VALUES
(1, 1, 'coba di update2', '2024-05-20 09:00:00', '2024-05-20 11:00:00', '[2]', '2024-05-18 06:59:02', '2024-05-18 08:45:02'),
(2, 1, 'Team Meeting 5', '2024-05-20 09:00:00', '2024-05-20 11:00:00', '[1,2,3]', '2024-05-18 07:10:48', '2024-05-18 07:10:48');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` bigint UNSIGNED NOT NULL,
  `created_by` bigint UNSIGNED NOT NULL,
  `for` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_opt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deadline` date NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bulan_tahuns`
--

CREATE TABLE `bulan_tahuns` (
  `id` bigint UNSIGNED NOT NULL,
  `Bulan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahun` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_05_02_011736_create_user_types_table', 1),
(6, '2024_05_02_011751_create_services_table', 1),
(7, '2024_05_02_011755_create_usersprofile_table', 1),
(8, '2024_05_02_012120_create_staff_details', 1),
(9, '2024_05_02_012157_create_user_details', 1),
(11, '2024_05_18_113359_create_agendas_table', 2),
(13, '2024_05_19_051307_create_perizinans_table', 3),
(16, '2024_05_19_233509_create_bulan_tahuns_table', 4),
(21, '2024_05_19_233523_create_presensis_table', 5),
(25, '2024_05_20_112020_create_assignments_table', 6),
(27, '2024_05_21_103232_create_pemesanans_table', 7),
(28, '2024_05_26_121143_create_pemesanan_items_table', 8),
(31, '2024_05_26_162406_create_payments_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint UNSIGNED NOT NULL,
  `pemesanan_id` bigint UNSIGNED NOT NULL,
  `atas_nama` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_bank` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `norek` bigint NOT NULL,
  `bukti` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qris_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qris_request_date` date DEFAULT NULL,
  `qris_invoiceid` int DEFAULT NULL,
  `qris_nmid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `pemesanan_id`, `atas_nama`, `nama_bank`, `norek`, `bukti`, `qris_content`, `qris_request_date`, `qris_invoiceid`, `qris_nmid`, `created_at`, `updated_at`) VALUES
(4, 19, '248946.00', 'BRI', 8972538723623, '/storage/images/payment/1721224255bukti.png', NULL, NULL, NULL, NULL, '2024-07-17 13:50:55', '2024-07-17 13:50:55');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanans`
--

CREATE TABLE `pemesanans` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `handle_by` json DEFAULT NULL,
  `pemesanan_id` bigint UNSIGNED NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `no_conf` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pemesanans`
--

INSERT INTO `pemesanans` (`id`, `user_id`, `handle_by`, `pemesanan_id`, `status`, `desc`, `no_conf`, `created_at`, `updated_at`) VALUES
(1, 1, '[2, 1, 3]', 19, 'proses', 'testing', NULL, NULL, NULL),
(10, 1, NULL, 22, 'pending', NULL, NULL, '2024-07-17 15:37:48', '2024-07-17 15:37:48');

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan_items`
--

CREATE TABLE `pemesanan_items` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `service_id` json NOT NULL,
  `quantity` json NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `subtotal` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pemesanan_items`
--

INSERT INTO `pemesanan_items` (`id`, `user_id`, `service_id`, `quantity`, `desc`, `subtotal`, `created_at`, `updated_at`) VALUES
(19, 1, '[4, 2, 1]', '[2, 1, 1]', 'anu', '248946.00', '2024-07-17 13:34:14', '2024-07-18 06:26:30'),
(22, 1, '[1, 2, 4]', '[2, 1, 1]', 'anu1', '248946.00', '2024-07-17 15:37:48', '2024-07-18 06:26:30');

-- --------------------------------------------------------

--
-- Table structure for table `perizinans`
--

CREATE TABLE `perizinans` (
  `id` bigint UNSIGNED NOT NULL,
  `id_pemohon` int NOT NULL,
  `nama_pemohon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_opt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_day` datetime NOT NULL,
  `end_day` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `perizinans`
--

INSERT INTO `perizinans` (`id`, `id_pemohon`, `nama_pemohon`, `tipe`, `desc`, `doc_opt`, `status`, `start_day`, `end_day`, `created_at`, `updated_at`) VALUES
(1, 1, 'bismillah', 'ubah ubahhhhhhhhhhhhhhh', 'izin kak, istri mo lahiran 222222', 'contohaja', 'pending', '2024-05-20 09:00:00', '2024-05-20 09:00:00', '2024-05-19 00:20:01', '2024-05-19 17:23:29'),
(2, 2, 'coba patch', 'izin di update', 'izin kak, istri mo lahiran', 'contohaja', 'pending', '2024-05-20 09:00:00', '2024-05-20 09:00:00', '2024-05-19 04:18:23', '2024-05-19 04:37:58'),
(4, 2, 'coba patch', 'ubah ubah', 'izin kak, istri mo lahiran 222222', 'contohaja', 'approveeeeeeeeee', '2024-05-20 09:00:00', '2024-05-20 09:00:00', '2024-05-19 05:03:47', '2024-05-19 05:53:54'),
(5, 3, 'ujin user biasa ygy', 'racing', 'tahmid anjenk', '/storage/images/1721067929izin.jpg', 'pending', '2024-05-20 09:00:00', '2024-06-20 09:00:00', '2024-07-15 18:25:30', '2024-07-15 18:25:30'),
(6, 3, 'ujin user biasa ygy', 'racing', 'tahmid anjenk', '/storage/images/1721080338izin.jpg', 'pending', '2024-05-20 09:00:00', '2024-06-20 09:00:00', '2024-07-15 21:52:18', '2024-07-15 21:52:18');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `presensis`
--

CREATE TABLE `presensis` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `masuk` time NOT NULL,
  `keluar` time DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `presensis`
--

INSERT INTO `presensis` (`id`, `user_id`, `masuk`, `keluar`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, '21:55:50', '21:59:06', 'terlambat', '2024-07-07 07:55:50', '2024-07-07 07:59:06'),
(4, 2, '22:01:20', '22:04:21', 'terlambat', '2024-07-07 08:01:20', '2024-07-07 08:04:21');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Video Editorrr', 'Layanan editing video profesional untuk berbagai keperluan.', '123123.00', NULL, '2024-06-23 07:31:33'),
(2, 'Social Media Managemendt', 'Manajemen media sosial untuk membantu Anda mengoptimalkan kehadiran online Anda.', '2000.00', NULL, '2024-06-23 07:18:55'),
(3, 'Websited server', 'Pembuatan dan pengembangan website yang responsif dan SEO-friendly.', '8010.00', NULL, '2024-06-23 07:50:45'),
(4, 'Video Company Profile', 'Pembuatan video profil perusahaanf untuk r\nmeningkatkan brand awareness.', '700.00', NULL, '2024-06-17 05:09:09'),
(11, 'Custom Websiter', 'Full Stack Web Traveler', '500000.00', '2024-06-13 23:43:17', '2024-06-14 00:11:52'),
(19, 'ppp', 'pppppp', '1.00', '2024-06-20 22:46:49', '2024-06-20 22:46:49'),
(20, 'devs', 'sfsf', '1231.00', '2024-06-23 07:51:12', '2024-06-23 07:51:12');

-- --------------------------------------------------------

--
-- Table structure for table `staff_details`
--

CREATE TABLE `staff_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `hobby` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sosmed_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `university` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff_details`
--

INSERT INTO `staff_details` (`id`, `user_id`, `gender`, `dob`, `hobby`, `sosmed_link`, `address`, `phone_number`, `identity_number`, `university`, `profile_photo`, `cover_photo`, `created_at`, `updated_at`) VALUES
(2, 2, 'wadon', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/idStaff/1721080013staff_identity.jpg', 'umm coy', NULL, NULL, '2024-05-12 10:16:06', '2024-07-15 21:46:53'),
(5, 1, 'opowae', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/idStaff/1721080270staff_identity.jpg', 'umm coy', '/storage/profileStaff/1721080270staff_profile.jpg', '/storage/coverStaff/1721080270staff_cover.jpg', '2024-05-29 15:30:09', '2024-07-15 21:51:10'),
(8, 6, 'opowae', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/idStaff/1721080144staff_identity.jpg', 'umm coy', '/storage/profileStaff/1721080144staff_profile.jpg', '/storage/coverStaff/1721080144staff_cover.jpg', '2024-07-15 21:47:50', '2024-07-15 21:49:04'),
(9, 3, 'opowae', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/idStaff/1721080259staff_identity.jpg', 'umm coy', '/storage/profileStaff/1721080259staff_profile.jpg', '/storage/coverStaff/1721080259staff_cover.jpg', '2024-07-15 21:49:34', '2024-07-15 21:50:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usersprofile`
--

CREATE TABLE `usersprofile` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type_id` bigint UNSIGNED NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usersprofile`
--

INSERT INTO `usersprofile` (`id`, `name`, `email`, `password`, `user_type_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'dev12f', 'sat@gmail.com', '$2y$10$H0DReBgVmg5QOSP4ykuubuwheCIqg0ftaCzEhqJx/BIIlTurT6ugq', 2, 'active', '2024-05-08 07:26:58', '2024-05-30 08:18:20'),
(2, 'coba patchxs', 'bang@gmail.com', '$2y$10$59disNz4gg47.AF8gctEYuUitIvm4KPSsJ2l7UF9ApdDXjgUOO3W6', 3, 'active', '2024-05-08 07:27:15', '2024-06-13 16:19:39'),
(3, 'ujin user biasa ygy', 'ujinuser@gmail.com', '$2y$10$5hHumMoKGAfUZ2WggY5TluqvLQAA6KWmw0q6PUsalPF3g41pmJxie', 8, 'banned', '2024-05-12 17:03:06', '2024-06-18 03:30:43'),
(4, 'user percobaab', 'usher4@gmail.com', '$2y$10$x12ZcR41NaAj41Yt9aWIleFr5Kg4HYSu1GXgZu5BeDFlv0QQQ4rrK', 6, 'banned', '2024-05-20 22:18:08', '2024-06-18 03:38:57'),
(6, 'anak mag', 'mag@gmail.com', '$2y$10$QoFnzDdI7/hToj4cPLsULeBm9ECxis/MOQ.kl.9AajWS4RKqnsyuy', 7, 'pending', '2024-05-28 19:52:48', '2024-06-17 05:07:09'),
(7, 'wwwww', 'wes@gmail.com', '$2y$10$x3Ld4IoSyk7hxdQJSQuPU.YWI1MJ1swRAJghKzuZpNbTio3ChBUfS', 5, 'pending', '2024-06-12 04:50:11', '2024-06-18 03:38:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `hobby` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sosmed_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `gender`, `dob`, `hobby`, `sosmed_link`, `address`, `phone_number`, `profile_photo`, `cover_photo`, `created_at`, `updated_at`) VALUES
(1, 3, 'cobaupdate', '1994-07-01', 'apajasfsdf', 'https://www.instagram.com/_cacingalaska1/', 'pet', '08554923293221', NULL, NULL, '2024-05-12 19:47:06', '2024-05-12 19:47:36'),
(2, 1, 'opowae', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/profileUser/1721080305user_profile.jpg', '/storage/coverUser/1721080305user_cover.jpg', '2024-07-15 21:43:30', '2024-07-15 21:51:45'),
(3, 2, 'opowae', '1994-07-01', 'mancing', 'https://google.com', 'ndarjo', 'kosonglapan2', '/storage/profileUser/1721080314user_profile.jpg', '/storage/coverUser/1721080314user_cover.jpg', '2024-07-15 21:45:54', '2024-07-15 21:51:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` bigint UNSIGNED NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `type`, `created_at`, `updated_at`) VALUES
(1, 'ceo', NULL, NULL),
(2, 'dev', NULL, NULL),
(3, 'hr', NULL, NULL),
(4, 'pm', NULL, NULL),
(5, 'staff', NULL, NULL),
(6, 'editor', NULL, NULL),
(7, 'magang', NULL, NULL),
(8, 'user', NULL, NULL),
(10, 'support2', '2024-05-17 17:12:00', '2024-05-17 17:12:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignments_created_by_foreign` (`created_by`);

--
-- Indexes for table `bulan_tahuns`
--
ALTER TABLE `bulan_tahuns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_pemesanan_id_foreign` (`pemesanan_id`);

--
-- Indexes for table `pemesanans`
--
ALTER TABLE `pemesanans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemesanans_user_id_foreign` (`user_id`),
  ADD KEY `pemesanans_service_id_foreign` (`pemesanan_id`);

--
-- Indexes for table `pemesanan_items`
--
ALTER TABLE `pemesanan_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemesanans_items_user_id_foreign` (`user_id`);

--
-- Indexes for table `perizinans`
--
ALTER TABLE `perizinans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `presensis`
--
ALTER TABLE `presensis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `presensis_user_id_foreign` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_details`
--
ALTER TABLE `staff_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `usersprofile`
--
ALTER TABLE `usersprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usersprofile_email_unique` (`email`),
  ADD KEY `usersprofile_user_type_id_foreign` (`user_type_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bulan_tahuns`
--
ALTER TABLE `bulan_tahuns`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pemesanans`
--
ALTER TABLE `pemesanans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pemesanan_items`
--
ALTER TABLE `pemesanan_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `perizinans`
--
ALTER TABLE `perizinans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presensis`
--
ALTER TABLE `presensis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `staff_details`
--
ALTER TABLE `staff_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usersprofile`
--
ALTER TABLE `usersprofile`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `usersprofile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_pemesanan_id_foreign` FOREIGN KEY (`pemesanan_id`) REFERENCES `pemesanan_items` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `pemesanans`
--
ALTER TABLE `pemesanans`
  ADD CONSTRAINT `pemesanans_pemesanan_id_foreign` FOREIGN KEY (`pemesanan_id`) REFERENCES `pemesanan_items` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pemesanans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usersprofile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pemesanan_items`
--
ALTER TABLE `pemesanan_items`
  ADD CONSTRAINT `pemesanans_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usersprofile` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `presensis`
--
ALTER TABLE `presensis`
  ADD CONSTRAINT `presensis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usersprofile` (`id`);

--
-- Constraints for table `usersprofile`
--
ALTER TABLE `usersprofile`
  ADD CONSTRAINT `usersprofile_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
