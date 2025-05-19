-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Bulan Mei 2025 pada 03.50
-- Versi server: 8.3.0
-- Versi PHP: 8.2.28

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
-- Struktur dari tabel `asramas`
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
-- Dumping data untuk tabel `asramas`
--

INSERT INTO `asramas` (`id_asrama`, `nama_asrama`, `gedung`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'utsman', '2', '2025-05-14 17:01:39', '2025-05-14 17:01:39', NULL),
(2, 'abu bakar', '1', '2025-05-14 17:01:52', '2025-05-14 17:01:52', NULL),
(3, 'umar', '3', '2025-05-14 17:02:07', '2025-05-14 17:02:07', NULL),
(4, 'ali', '4', '2025-05-17 09:06:34', '2025-05-17 09:06:34', NULL),
(5, 'abu huraira', '5', '2025-05-17 09:07:42', '2025-05-17 09:07:42', NULL),
(6, 'tesss', '9', '2025-05-18 07:30:48', '2025-05-18 07:30:48', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
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
-- Struktur dari tabel `kategori__pakets`
--

CREATE TABLE `kategori__pakets` (
  `id_kategori` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kategori__pakets`
--

INSERT INTO `kategori__pakets` (`id_kategori`, `nama_kategori`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'elektronik', '2025-05-15 09:47:46', '2025-05-15 09:47:46', NULL),
(2, 'makanan', '2025-05-15 09:48:04', '2025-05-15 09:48:04', NULL),
(3, 'minuman', '2025-05-15 09:48:10', '2025-05-15 09:48:10', NULL),
(4, 'peralatan', '2025-05-15 09:48:16', '2025-05-15 09:48:16', NULL),
(5, 'pakaian', '2025-05-15 09:48:20', '2025-05-15 09:48:20', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
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
-- Struktur dari tabel `pakets`
--

CREATE TABLE `pakets` (
  `id_paket` bigint UNSIGNED NOT NULL,
  `nama_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_diterima` date NOT NULL,
  `kategori` bigint UNSIGNED NOT NULL,
  `penerima_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asrama` bigint UNSIGNED NOT NULL,
  `pengirim_paket` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isi_paket_yang_disita` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('diambil','Belum Diambil') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pakets`
--

INSERT INTO `pakets` (`id_paket`, `nama_paket`, `tanggal_diterima`, `kategori`, `penerima_paket`, `asrama`, `pengirim_paket`, `isi_paket_yang_disita`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'kiriman', '2025-05-18', 4, 'tr120', 2, 'ibu', NULL, 'Belum Diambil', '2025-05-18 00:57:26', '2025-05-18 00:57:26', NULL),
(2, 'hemat', '2025-05-19', 1, 'tr124', 2, 'ayah', 'nope', 'Belum Diambil', '2025-05-18 02:11:12', '2025-05-18 02:11:12', NULL),
(3, 'kiko', '2025-05-19', 3, 'tr111', 1, 'ibu', 'df', 'diambil', '2025-05-19 03:28:04', '2025-05-19 03:28:04', NULL),
(4, 'kenzeler', '2025-05-19', 1, 'tr120', 2, 'ibu', NULL, 'Belum Diambil', '2025-05-19 03:42:02', '2025-05-19 03:42:02', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
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
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id_role` bigint UNSIGNED NOT NULL,
  `nama_role` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id_role`, `nama_role`, `menu`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'administrator', '[\"settings\", \"laporan\", \"paket\", \"dashboard\", \"user & management\", \"santri\"]', NULL, '2025-05-18 16:54:37', NULL),
(2, 'staff', '[\"dashboard\", \"paket\", \"user & management\", \"santri\"]', NULL, '2025-05-19 03:10:50', NULL),
(3, 'user', '[\"dashboard\"]', NULL, '2025-05-18 17:08:47', NULL),
(24, 'Admin', '[\"user & management\", \"paket\", \"laporan\", \"settings\"]', '2025-05-18 15:00:45', '2025-05-18 17:08:51', '2025-05-18 17:08:51'),
(25, 'sfsfddfaaa', '[\"settings\", \"laporan\", \"paket\", \"dashboard\"]', '2025-05-18 15:01:03', '2025-05-18 17:08:52', '2025-05-18 17:08:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `santris`
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
-- Dumping data untuk tabel `santris`
--

INSERT INTO `santris` (`NIS`, `nama_santri`, `alamat`, `id_asrama`, `total_paket_diterima`, `created_at`, `updated_at`, `deleted_at`) VALUES
('tr111', 'budi doremi', 'jl maju', 1, 1, '2025-05-18 02:47:23', '2025-05-19 03:28:04', NULL),
('tr120', 'budi 1', 'jl maju terusss', 2, 2, '2025-05-15 11:39:30', '2025-05-19 03:42:02', NULL),
('tr123', 'siapa', 'safsakfk', 3, 0, '2025-05-16 01:06:32', '2025-05-16 01:14:17', '2025-05-16 01:14:17'),
('tr124', 'budi 2', 'jl maju terus', 2, 1, '2025-05-15 11:38:20', '2025-05-18 02:53:23', NULL),
('tr125', 'sfsdfsd', 'sdddfs', 3, 0, '2025-05-16 01:16:21', '2025-05-16 01:25:36', '2025-05-16 01:25:36'),
('tr126', 'anak baiks', 'jl maju terusss', 2, 0, '2025-05-15 11:43:08', '2025-05-16 01:05:13', '2025-05-16 01:05:13'),
('tr128', 'budi 345', 'alamat sm', 1, 0, '2025-05-16 01:41:59', '2025-05-19 03:12:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
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
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama_user`, `username`, `password`, `id_role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'shin ryujin', 'ryujine', '$2y$10$CtLuuoZZb44vuevRJp8LdOkrS2MihXKcJiXhxvAZ.8ti9Lv1ohvri', 1, NULL, NULL, NULL),
(2, 'jang wonyoung', 'user2', '$2y$10$4hkQwf4KuAZBvsSaCSP9VOnueYhxG.EWJcu4Ur7.HgoL2wok2FC0y', 2, '2025-05-18 00:46:05', '2025-05-18 00:46:05', NULL),
(3, 'jihyo twice', 'user3', '$2y$10$F8Fjc.RmTY5CWGCViXP/C.w.UMEacWsfyPJI3lvgTNJdzsqitzCp2', 2, '2025-05-18 06:05:50', '2025-05-18 06:05:50', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `asramas`
--
ALTER TABLE `asramas`
  ADD PRIMARY KEY (`id_asrama`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `kategori__pakets`
--
ALTER TABLE `kategori__pakets`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pakets`
--
ALTER TABLE `pakets`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `pakets_kategori_foreign` (`kategori`),
  ADD KEY `pakets_penerima_paket_foreign` (`penerima_paket`),
  ADD KEY `pakets_asrama_foreign` (`asrama`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Indeks untuk tabel `santris`
--
ALTER TABLE `santris`
  ADD PRIMARY KEY (`NIS`),
  ADD KEY `santris_id_asrama_foreign` (`id_asrama`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_id_role_foreign` (`id_role`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `asramas`
--
ALTER TABLE `asramas`
  MODIFY `id_asrama` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kategori__pakets`
--
ALTER TABLE `kategori__pakets`
  MODIFY `id_kategori` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pakets`
--
ALTER TABLE `pakets`
  MODIFY `id_paket` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pakets`
--
ALTER TABLE `pakets`
  ADD CONSTRAINT `pakets_asrama_foreign` FOREIGN KEY (`asrama`) REFERENCES `asramas` (`id_asrama`),
  ADD CONSTRAINT `pakets_kategori_foreign` FOREIGN KEY (`kategori`) REFERENCES `kategori__pakets` (`id_kategori`),
  ADD CONSTRAINT `pakets_penerima_paket_foreign` FOREIGN KEY (`penerima_paket`) REFERENCES `santris` (`NIS`);

--
-- Ketidakleluasaan untuk tabel `santris`
--
ALTER TABLE `santris`
  ADD CONSTRAINT `santris_id_asrama_foreign` FOREIGN KEY (`id_asrama`) REFERENCES `asramas` (`id_asrama`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_role_foreign` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
