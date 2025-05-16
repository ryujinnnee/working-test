-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 01:49 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iibs`
--

-- --------------------------------------------------------

--
-- Table structure for table `asramas`
--

CREATE TABLE `asramas` (
  `id_asrama` bigint UNSIGNED NOT NULL,
  `nama_asrama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gedung` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `asramas`
--

INSERT INTO `asramas` (`id_asrama`, `nama_asrama`, `gedung`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'utsman', '2', '2025-05-14 17:01:39', '2025-05-14 17:01:39', NULL),
(2, 'abu bakar', '1', '2025-05-14 17:01:52', '2025-05-14 17:01:52', NULL),
(3, 'umar', '3', '2025-05-14 17:02:07', '2025-05-14 17:02:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori__pakets`
--

CREATE TABLE `kategori__pakets` (
  `id_kategori` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori__pakets`
--

INSERT INTO `kategori__pakets` (`id_kategori`, `nama_kategori`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'elektronik', '2025-05-15 09:47:46', '2025-05-15 09:47:46', NULL),
(2, 'makanan', '2025-05-15 09:48:04', '2025-05-15 09:48:04', NULL),
(3, 'minuman', '2025-05-15 09:48:10', '2025-05-15 09:48:10', NULL),
(4, 'peralatan', '2025-05-15 09:48:16', '2025-05-15 09:48:16', NULL),
(5, 'pakaian', '2025-05-15 09:48:20', '2025-05-15 09:48:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2024_05_02_011753_create_roles_table', 1),
(5, '2024_05_02_011755_create_users_table', 1),
(6, '2025_05_13_202528_create_kategori__pakets_table', 1),
(7, '2025_05_13_210427_create_asramas_table', 1),
(8, '2025_05_13_212140_create_santris_table', 1),
(9, '2025_05_13_212141_create_pakets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pakets`
--

CREATE TABLE `pakets` (
  `id_paket` bigint UNSIGNED NOT NULL,
  `nama_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_diterima` date NOT NULL,
  `kategori` bigint UNSIGNED NOT NULL,
  `penerima_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asrama` bigint UNSIGNED NOT NULL,
  `pengirim_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isi_paket_yang_disita` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('diambil','Belum Diambil') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_role` bigint UNSIGNED NOT NULL,
  `nama_role` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_role`, `nama_role`, `menu`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'administrator', NULL, NULL, NULL, NULL),
(2, 'staff', NULL, NULL, NULL, NULL),
(3, 'user', NULL, NULL, NULL, NULL),
(4, 'sertertxxxx', NULL, '2025-05-15 15:22:42', '2025-05-16 01:28:29', '2025-05-16 01:28:29'),
(5, 'hore', NULL, '2025-05-15 15:36:16', '2025-05-15 16:09:18', '2025-05-15 16:09:18'),
(6, 'erere', NULL, '2025-05-15 15:37:57', '2025-05-15 16:07:30', '2025-05-15 16:07:30'),
(7, 'ererer', NULL, '2025-05-16 01:28:37', '2025-05-16 01:28:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `santris`
--

CREATE TABLE `santris` (
  `NIS` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_santri` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_asrama` bigint UNSIGNED NOT NULL,
  `total_paket_diterima` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `santris`
--

INSERT INTO `santris` (`NIS`, `nama_santri`, `alamat`, `id_asrama`, `total_paket_diterima`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1234123', 'siapa', 'safsakfk', 3, 5, '2025-05-16 01:06:32', '2025-05-16 01:14:17', '2025-05-16 01:14:17'),
('abc123fer', 'anak baik', 'jl maju terus', 2, 0, '2025-05-15 11:38:20', '2025-05-15 11:38:20', NULL),
('abc123ferrrrs', 'anak baiks', 'jl maju terusss', 2, 0, '2025-05-15 11:39:30', '2025-05-15 11:39:30', NULL),
('abcd123', 'sfsdfsd', 'sdddfs', 3, 2, '2025-05-16 01:16:21', '2025-05-16 01:25:36', '2025-05-16 01:25:36'),
('akowkwo123', 'anak baiks', 'jl maju terusss', 2, 0, '2025-05-15 11:43:08', '2025-05-16 01:05:13', '2025-05-16 01:05:13'),
('dsfsdf', 'dfdfdf ayamdfd', 'dfdfds', 1, 1, '2025-05-16 01:16:45', '2025-05-16 01:23:55', '2025-05-16 01:23:55'),
('sertyu', 'aswok', 'alamat sm', 1, 1, '2025-05-16 01:41:59', '2025-05-16 01:41:59', NULL),
('treter123', 'sa sa', 'Tokyo', 2, 3, '2025-05-16 01:09:25', '2025-05-16 01:15:40', '2025-05-16 01:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` bigint UNSIGNED NOT NULL,
  `nama_user` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_role` bigint UNSIGNED NOT NULL DEFAULT '2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama_user`, `username`, `password`, `id_role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'shin ryujin', 'ryujine', '$2y$10$CtLuuoZZb44vuevRJp8LdOkrS2MihXKcJiXhxvAZ.8ti9Lv1ohvri', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asramas`
--
ALTER TABLE `asramas`
  ADD PRIMARY KEY (`id_asrama`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `kategori__pakets`
--
ALTER TABLE `kategori__pakets`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pakets`
--
ALTER TABLE `pakets`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `pakets_kategori_foreign` (`kategori`),
  ADD KEY `pakets_penerima_paket_foreign` (`penerima_paket`),
  ADD KEY `pakets_asrama_foreign` (`asrama`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `santris`
--
ALTER TABLE `santris`
  ADD PRIMARY KEY (`NIS`),
  ADD KEY `santris_id_asrama_foreign` (`id_asrama`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_id_role_foreign` (`id_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asramas`
--
ALTER TABLE `asramas`
  MODIFY `id_asrama` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori__pakets`
--
ALTER TABLE `kategori__pakets`
  MODIFY `id_kategori` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pakets`
--
ALTER TABLE `pakets`
  MODIFY `id_paket` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pakets`
--
ALTER TABLE `pakets`
  ADD CONSTRAINT `pakets_asrama_foreign` FOREIGN KEY (`asrama`) REFERENCES `asramas` (`id_asrama`),
  ADD CONSTRAINT `pakets_kategori_foreign` FOREIGN KEY (`kategori`) REFERENCES `kategori__pakets` (`id_kategori`),
  ADD CONSTRAINT `pakets_penerima_paket_foreign` FOREIGN KEY (`penerima_paket`) REFERENCES `santris` (`NIS`);

--
-- Constraints for table `santris`
--
ALTER TABLE `santris`
  ADD CONSTRAINT `santris_id_asrama_foreign` FOREIGN KEY (`id_asrama`) REFERENCES `asramas` (`id_asrama`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_role_foreign` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
